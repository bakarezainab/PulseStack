/**
 * Nomba API Service
 * Handles authentication and API calls to Nomba payment infrastructure
 */

// API Configuration from environment variables
const NOMBA_CONFIG = {
  accountId: import.meta.env.VITE_NOMBA_ACCOUNT_ID || 'f666ef9b-888e-4799-85ce-acb505b28023',
  subAccountId: import.meta.env.VITE_NOMBA_SUB_ACCOUNT_ID || '3f550c64-55ed-42b8-ac1d-9305ec2781d3',
  clientId: import.meta.env.VITE_NOMBA_CLIENT_ID || '706df6c4-b8bb-4130-88c4-d21b052f8631',
  privateKey: import.meta.env.VITE_NOMBA_PRIVATE_KEY || '',
  baseUrl: import.meta.env.VITE_NOMBA_API_BASE_URL || 'https://api.nomba.com'
};

// Token cache for authentication
let authToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Authentication response from Nomba API
 */
interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    expiresIn: number;
  };
  message?: string;
}

/**
 * Payment link request payload
 */
export interface CreatePaymentLinkPayload {
  amount: number;
  currency: string;
  description: string;
  customerEmail?: string;
  customerName?: string;
  reference?: string;
  callbackUrl?: string;
}

/**
 * Payment link response
 */
export interface PaymentLinkResponse {
  success: boolean;
  data?: {
    id: string;
    link: string;
    reference: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
  };
  message?: string;
}

/**
 * Transaction response
 */
export interface TransactionResponse {
  success: boolean;
  data?: {
    id: string;
    amount: number;
    currency: string;
    status: 'success' | 'pending' | 'failed' | 'flagged';
    type: string;
    sender?: string;
    recipient?: string;
    description?: string;
    paymentChannel?: string;
    createdAt: string;
  }[];
  message?: string;
}

/**
 * Account balance response
 */
export interface BalanceResponse {
  success: boolean;
  data?: {
    availableBalance: number;
    pendingBalance: number;
    currency: string;
  };
  message?: string;
}

/**
 * Virtual account response
 */
export interface VirtualAccountResponse {
  success: boolean;
  data?: {
    accountNumber: string;
    bankName: string;
    accountName: string;
  };
  message?: string;
}

/**
 * Authenticate with Nomba API and get access token
 */
export async function authenticate(): Promise<string> {
  // Check if we have a valid cached token
  if (authToken && Date.now() < tokenExpiry) {
    return authToken;
  }

  try {
    const response = await fetch(`${NOMBA_CONFIG.baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accountId': NOMBA_CONFIG.accountId
      },
      body: JSON.stringify({
        clientId: NOMBA_CONFIG.clientId,
        privateKey: NOMBA_CONFIG.privateKey
      })
    });

    const result: AuthResponse = await response.json();

    if (result.success && result.data) {
      authToken = result.data.token;
      tokenExpiry = Date.now() + (result.data.expiresIn * 1000) - 60000; // Buffer 1 minute
      return authToken;
    }

    throw new Error(result.message || 'Authentication failed');
  } catch (error) {
    console.error('Nomba authentication error:', error);
    throw error;
  }
}

/**
 * Get authenticated headers for API calls
 */
async function getHeaders(): Promise<Record<string, string>> {
  const token = await authenticate();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'accountId': NOMBA_CONFIG.accountId
  };
}

/**
 * Create a payment link
 */
export async function createPaymentLink(payload: CreatePaymentLinkPayload): Promise<PaymentLinkResponse> {
  try {
    const headers = await getHeaders();
    
    const response = await fetch(`${NOMBA_CONFIG.baseUrl}/payments/links`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...payload,
        subAccountId: NOMBA_CONFIG.subAccountId
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Create payment link error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create payment link'
    };
  }
}

/**
 * Get account balance
 */
export async function getBalance(): Promise<BalanceResponse> {
  try {
    const headers = await getHeaders();
    
    const response = await fetch(`${NOMBA_CONFIG.baseUrl}/accounts/balance`, {
      method: 'GET',
      headers
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get balance error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to get balance'
    };
  }
}

/**
 * Get transactions history
 */
export async function getTransactions(limit: number = 20, offset: number = 0): Promise<TransactionResponse> {
  try {
    const headers = await getHeaders();
    
    const response = await fetch(`${NOMBA_CONFIG.baseUrl}/transactions?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get transactions error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to get transactions'
    };
  }
}

/**
 * Create virtual account for a customer
 */
export async function createVirtualAccount(
  customerName: string,
  customerEmail?: string
): Promise<VirtualAccountResponse> {
  try {
    const headers = await getHeaders();
    
    const response = await fetch(`${NOMBA_CONFIG.baseUrl}/accounts/virtual`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        customerName,
        customerEmail,
        subAccountId: NOMBA_CONFIG.subAccountId
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Create virtual account error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create virtual account'
    };
  }
}

/**
 * Initiate bulk payout
 */
export async function initiatePayout(payouts: Array<{
  accountNumber: string;
  bankCode: string;
  amount: number;
  narration: string;
  reference: string;
}>): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const headers = await getHeaders();
    
    const response = await fetch(`${NOMBA_CONFIG.baseUrl}/payouts/bulk`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        payouts,
        subAccountId: NOMBA_CONFIG.subAccountId
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Initiate payout error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to initiate payout'
    };
  }
}

/**
 * Verify transaction status
 */
export async function verifyTransaction(transactionId: string): Promise<TransactionResponse> {
  try {
    const headers = await getHeaders();
    
    const response = await fetch(`${NOMBA_CONFIG.baseUrl}/transactions/${transactionId}/verify`, {
      method: 'GET',
      headers
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Verify transaction error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to verify transaction'
    };
  }
}

/**
 * Get banks list for payout
 */
export async function getBanks(): Promise<{ success: boolean; data?: Array<{ code: string; name: string }>; message?: string }> {
  try {
    const headers = await getHeaders();
    
    const response = await fetch(`${NOMBA_CONFIG.baseUrl}/banks`, {
      method: 'GET',
      headers
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get banks error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to get banks'
    };
  }
}

/**
 * Export configuration for display
 */
export const getNombaConfig = () => ({
  accountId: NOMBA_CONFIG.accountId,
  subAccountId: NOMBA_CONFIG.subAccountId,
  isConfigured: !!NOMBA_CONFIG.clientId && !!NOMBA_CONFIG.privateKey,
  apiBaseUrl: NOMBA_CONFIG.baseUrl
});
