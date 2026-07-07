/**
 * Nomba Webhook Handler Service
 * Processes incoming webhooks from Nomba API
 */

// Webhook event types from Nomba
export type NombaWebhookEvent = 
  | 'payment.link.paid'
  | 'payment.link.expired'
  | 'virtual_account.credit'
  | 'payout.success'
  | 'payout.failed'
  | 'transaction.flagged'
  | 'settlement.completed';

// Webhook payload structure
export interface NombaWebhookPayload {
  event: NombaWebhookEvent;
  data: {
    id: string;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    sender?: {
      name?: string;
      email?: string;
      accountNumber?: string;
    };
    recipient?: {
      name?: string;
      accountNumber?: string;
      bankCode?: string;
    };
    description?: string;
    paymentChannel?: string;
    timestamp: string;
    metadata?: Record<string, any>;
  };
  signature: string;
}

// Webhook log entry
export interface WebhookLogEntry {
  id: string;
  timestamp: string;
  event: NombaWebhookEvent;
  status: 'received' | 'processed' | 'failed';
  data: NombaWebhookPayload['data'];
  message: string;
}

// In-memory webhook logs (in production, use a proper store)
let webhookLogs: WebhookLogEntry[] = [];

/**
 * Verify webhook signature
 * In production, this should validate against Nomba's public key
 */
export function verifyWebhookSignature(
  _payload: string,
  signature: string,
  _secret: string
): boolean {
  // In a real implementation, you would use crypto to verify the signature
  // For demo purposes, we're just checking if signature exists
  return !!signature;
}

/**
 * Process incoming webhook from Nomba
 */
export function processWebhook(
  payload: NombaWebhookPayload,
  handlers?: {
    onPaymentReceived?: (data: NombaWebhookPayload['data']) => void;
    onPayoutComplete?: (data: NombaWebhookPayload['data']) => void;
    onTransactionFlagged?: (data: NombaWebhookPayload['data']) => void;
    onSettlementComplete?: (data: NombaWebhookPayload['data']) => void;
  }
): WebhookLogEntry {
  const logEntry: WebhookLogEntry = {
    id: `WH-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    event: payload.event,
    status: 'received',
    data: payload.data,
    message: ''
  };

  try {
    switch (payload.event) {
      case 'payment.link.paid':
        logEntry.message = `Payment link ${payload.data.id} paid. Amount: ₦${payload.data.amount.toLocaleString()} from ${payload.data.sender?.name || 'Unknown'}`;
        logEntry.status = 'processed';
        handlers?.onPaymentReceived?.(payload.data);
        break;

      case 'virtual_account.credit':
        logEntry.message = `Virtual account credit received. ₦${payload.data.amount.toLocaleString()} from ${payload.data.sender?.name || 'Unknown'}`;
        logEntry.status = 'processed';
        handlers?.onPaymentReceived?.(payload.data);
        break;

      case 'payout.success':
        logEntry.message = `Payout successful to ${payload.data.recipient?.name}. Amount: ₦${payload.data.amount.toLocaleString()}`;
        logEntry.status = 'processed';
        handlers?.onPayoutComplete?.(payload.data);
        break;

      case 'payout.failed':
        logEntry.message = `Payout failed to ${payload.data.recipient?.name}. Reason: ${payload.data.description || 'Unknown'}`;
        logEntry.status = 'failed';
        break;

      case 'transaction.flagged':
        logEntry.message = `Transaction ${payload.data.id} flagged. Reason: ${payload.data.description || 'Security check'}`;
        logEntry.status = 'processed';
        handlers?.onTransactionFlagged?.(payload.data);
        break;

      case 'settlement.completed':
        logEntry.message = `Settlement completed. Amount: ₦${payload.data.amount.toLocaleString()}`;
        logEntry.status = 'processed';
        handlers?.onSettlementComplete?.(payload.data);
        break;

      default:
        logEntry.message = `Unknown event received: ${payload.event}`;
        logEntry.status = 'processed';
    }
  } catch (error) {
    logEntry.status = 'failed';
    logEntry.message = `Error processing webhook: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  // Add to logs (keep last 100)
  webhookLogs = [logEntry, ...webhookLogs].slice(0, 100);

  return logEntry;
}

/**
 * Get webhook logs
 */
export function getWebhookLogs(limit: number = 50): WebhookLogEntry[] {
  return webhookLogs.slice(0, limit);
}

/**
 * Clear webhook logs
 */
export function clearWebhookLogs(): void {
  webhookLogs = [];
}

/**
 * Simulate a webhook event (for development/testing)
 */
export function simulateWebhook(
  event: NombaWebhookEvent,
  data: Partial<NombaWebhookPayload['data']>
): NombaWebhookPayload {
  return {
    event,
    data: {
      id: data.id || `TX-${Math.floor(Math.random() * 10000)}`,
      reference: data.reference || `REF-${Date.now()}`,
      amount: data.amount || Math.floor(Math.random() * 500000) + 10000,
      currency: data.currency || 'NGN',
      status: data.status || 'success',
      sender: data.sender,
      recipient: data.recipient,
      description: data.description,
      paymentChannel: data.paymentChannel || 'Nomba Checkout',
      timestamp: new Date().toISOString(),
      metadata: data.metadata
    },
    signature: `sig_${Math.random().toString(36).substr(2, 32)}`
  };
}
