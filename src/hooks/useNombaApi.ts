import { useState, useCallback, useEffect } from 'react';
import {
  createPaymentLink,
  getBalance,
  getTransactions,
  createVirtualAccount,
  initiatePayout,
  verifyTransaction,
  getBanks,
  getNombaConfig,
  type CreatePaymentLinkPayload,
  type PaymentLinkResponse,
  type BalanceResponse,
  type TransactionResponse,
  type VirtualAccountResponse
} from '../services/nombaApi';

interface UseNombaApiReturn {
  // State
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  config: {
    accountId: string;
    subAccountId: string;
    isConfigured: boolean;
  };

  // Payment operations
  createPaymentLink: (payload: CreatePaymentLinkPayload) => Promise<PaymentLinkResponse>;
  getBalance: () => Promise<BalanceResponse>;
  getTransactions: (limit?: number, offset?: number) => Promise<TransactionResponse>;
  createVirtualAccount: (customerName: string, customerEmail?: string) => Promise<VirtualAccountResponse>;
  initiatePayout: (payouts: Array<{
    accountNumber: string;
    bankCode: string;
    amount: number;
    narration: string;
    reference: string;
  }>) => Promise<{ success: boolean; data?: any; message?: string }>;
  verifyTransaction: (transactionId: string) => Promise<TransactionResponse>;
  getBanks: () => Promise<{ success: boolean; data?: Array<{ code: string; name: string }>; message?: string }>;

  // Utilities
  clearError: () => void;
}

export function useNombaApi(): UseNombaApiReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const config = getNombaConfig();

  // Check if API is configured
  useEffect(() => {
    if (config.isConfigured) {
      // Test authentication
      testAuth();
    }
  }, []);

  const testAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const { authenticate } = await import('../services/nombaApi');
      await authenticate();
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleApiCall = useCallback(async <T,>(
    apiCall: () => Promise<T>
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'API call failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    isAuthenticated,
    config: {
      accountId: config.accountId,
      subAccountId: config.subAccountId,
      isConfigured: config.isConfigured
    },

    createPaymentLink: (payload) => handleApiCall(() => createPaymentLink(payload)),
    getBalance: () => handleApiCall(() => getBalance()),
    getTransactions: (limit, offset) => handleApiCall(() => getTransactions(limit, offset)),
    createVirtualAccount: (name, email) => handleApiCall(() => createVirtualAccount(name, email)),
    initiatePayout: (payouts) => handleApiCall(() => initiatePayout(payouts)),
    verifyTransaction: (id) => handleApiCall(() => verifyTransaction(id)),
    getBanks: () => handleApiCall(() => getBanks()),

    clearError
  };
}
