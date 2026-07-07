# Nomba API Integration Guide

## Overview

PulseStack is fully integrated with Nomba's payment infrastructure, providing real-time payment collection, bulk payouts, virtual accounts, and webhook processing capabilities.

## API Credentials

The application is configured with your Nomba API credentials:

### Parent Account
- **Account ID**: `f666ef9b-888e-4799-85ce-acb505b28023`
- **Sub-Account ID**: `3f550c64-55ed-42b8-ac1d-9305ec2781d3`

### Test Environment (Currently Active)
- **Client ID**: `706df6c4-b8bb-4130-88c4-d21b052f8631`
- **Private Key**: `k8UobYk3APgOoxUnNL7VpuxzwTsH4LsXtydfjcHs8RH0YISBB4OMqJsaafG+U8fWETu9YZ96bNXE+DelCDuMPw==`

### Live Environment (Production Ready)
- **Client ID**: `e5e85b13-f560-4643-814e-c87435dbbc15`
- **Private Key**: `8/doS7Q3w77EANpk3vpgSrc05hhOiRWp3eBs01sXyZ1AmovtZUXlmrxie+xnEF2tR4q79t0IFufMD1d4JrkT8g==`

## Architecture

### Service Layer
- **`src/services/nombaApi.ts`** - Core API service with authentication and endpoints
- **`src/services/webhookHandler.ts`** - Webhook processing and event handling
- **`src/hooks/useNombaApi.ts`** - React hook for API integration

### Key Features Integrated

#### 1. Authentication
- Automatic token management with caching
- Token refresh before expiry
- Secure credential storage via environment variables

#### 2. Payment Links
```typescript
// Create payment links for invoice collection
const result = await nombaApi.createPaymentLink({
  amount: 250000,
  currency: 'NGN',
  description: 'Branding work - PulseStack Invoice',
  customerName: 'Emeka Okoye'
});
```

#### 3. Bulk Payouts
```typescript
// Pay multiple employees in one transaction
const result = await nombaApi.initiatePayout([
  {
    accountNumber: '1019948271',
    bankCode: '060',
    amount: 120000,
    narration: 'Monthly Salary - Creative',
    reference: 'SAL-EMP-01-1234567890'
  }
]);
```

#### 4. Balance Management
```typescript
// Get real-time account balance
const balance = await nombaApi.getBalance();
// Returns: { availableBalance, pendingBalance, currency }
```

#### 5. Transaction History
```typescript
// Fetch transaction history
const transactions = await nombaApi.getTransactions(20, 0);
```

#### 6. Virtual Accounts
```typescript
// Create virtual account for tenants
const account = await nombaApi.createVirtualAccount(
  'Amina Yusuf',
  'amina@example.com'
);
```

## Webhook Integration

### Supported Events
- `payment.link.paid` - Payment link completed
- `virtual_account.credit` - Virtual account received funds
- `payout.success` - Bulk payout succeeded
- `payout.failed` - Bulk payout failed
- `transaction.flagged` - Fraud detection triggered
- `settlement.completed` - Settlement to bank account

### Webhook Processing
```typescript
import { processWebhook } from './services/webhookHandler';

processWebhook(webhookPayload, {
  onPaymentReceived: (data) => {
    // Update UI with new payment
    addTransaction(data);
    updateBalance(data.amount);
  },
  onTransactionFlagged: (data) => {
    // Alert user of suspicious activity
    showSecurityAlert(data);
  }
});
```

## UI Integration

### API Status Indicator
The header displays real-time API connection status:
- 🟢 **Connected** - Live Nomba API
- 🟡 **Simulation** - Mock data mode

Click the status to toggle between modes.

### Settings Page
Navigate to **Settings > Nomba API Configuration** to:
- View account IDs
- Test API connection
- Switch between live and simulation modes
- Monitor API health

## Dual Mode Operation

PulseStack operates in two modes:

### 1. Live API Mode (Production)
- Real Nomba API calls
- Actual payment processing
- Live webhook events
- Real-time balance updates

### 2. Simulation Mode (Development)
- Mock data responses
- Simulated webhooks
- Testing without API calls
- Instant development feedback

## Implementation Details

### Environment Variables
```bash
VITE_NOMBA_ACCOUNT_ID=f666ef9b-888e-4799-85ce-acb505b28023
VITE_NOMBA_SUB_ACCOUNT_ID=3f550c64-55ed-42b8-ac1d-9305ec2781d3
VITE_NOMBA_CLIENT_ID=706df6c4-b8bb-4130-88c4-d21b052f8631
VITE_NOMBA_PRIVATE_KEY=k8UobYk3APgOoxUnNL7Vpux...
VITE_NOMBA_API_BASE_URL=https://api.nomba.com
```

### Error Handling
All API calls include automatic fallback to simulation:
```typescript
try {
  const result = await nombaApi.createPaymentLink(payload);
  // Process real API response
} catch (error) {
  // Gracefully fall back to simulation
  createSimulatedPaymentLink(payload);
}
```

## Security Best Practices

1. **Never commit API keys** - Use `.env` files (already in `.gitignore`)
2. **Rotate keys regularly** - Update credentials periodically
3. **Use TEST credentials** for development
4. **Enable webhook signatures** - Verify webhook authenticity
5. **Monitor API logs** - Check Developer Console for anomalies

## Testing

### Manual Testing
1. Navigate to **Settings**
2. Click **Test Connection** in API Configuration
3. Verify green status indicator
4. Create a payment link in **Smart Payments**
5. Check Developer Console for API logs

### Automated Tests
```bash
# Run integration tests
npm test

# Test specific API endpoints
npm run test:api
```

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/token` | POST | Authentication |
| `/payments/links` | POST | Create payment link |
| `/accounts/balance` | GET | Get balance |
| `/transactions` | GET | Transaction history |
| `/accounts/virtual` | POST | Create virtual account |
| `/payouts/bulk` | POST | Bulk payout |
| `/banks` | GET | Get bank list |

## Troubleshooting

### "API Connection Failed"
- Verify credentials in `.env` file
- Check network connectivity
- Ensure TEST credentials are used in development
- Review Developer Console logs

### "Authentication Error"
- Token may be expired (auto-refreshed)
- Verify `accountId` header is set correctly
- Check private key format

### "Payout Failed"
- Validate bank codes (use `getBanks()`)
- Verify account numbers
- Check sufficient balance
- Review narration format

## Production Deployment

### Before Going Live:
1. **Switch to LIVE credentials** in `.env`:
   ```bash
   VITE_NOMBA_CLIENT_ID=e5e85b13-f560-4643-814e-c87435dbbc15
   VITE_NOMBA_PRIVATE_KEY=8/doS7Q3w77EANpk3vpg...
   ```

2. **Set up webhook endpoint**:
   ```bash
   POST https://yourapp.com/api/webhooks/nomba
   ```

3. **Enable SSL/TLS** for webhook security

4. **Configure webhook signatures** in Nomba dashboard

5. **Test in staging** before production

## Support

For Nomba API issues:
- 📧 Email: support@nomba.com
- 📖 Docs: https://docs.nomba.com
- 🔑 Dashboard: https://dashboard.nomba.com

For PulseStack issues:
- 💬 Open an issue on GitHub
- 📧 Email: support@pulsestack.io
