// Paystack Payment Integration for InnovaSci Open Academy
// NGN (Nigerian Naira) Payments
// Using paystack-sdk

import { Paystack } from 'paystack-sdk';

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    reference: string;
    status: 'success' | 'failed' | 'abandoned';
    metadata: Record<string, any>;
    customer: {
      id: number;
      email: string;
    };
    paidAt?: string;
  };
}

export interface PaystackTransaction {
  id: number;
  domain: string;
  amount: number;
  currency: string;
  reference: string;
  status: string;
  paidAt: string;
  createdAt: string;
  channel: string;
  customer: {
    id: number;
    email: string;
  };
}

// Initialize Paystack with secret key from environment
const paystackSecret = process.env.PAYSTACK_SECRET_KEY || '';

if (!paystackSecret) {
  console.warn('Paystack secret key not configured. Set PAYSTACK_SECRET_KEY in environment.');
}

// Create Paystack instance
const paystack = new Paystack(paystackSecret);

/**
 * Initialize a payment transaction
 */
export async function initializePayment(data: {
  email: string;
  amount: number;
  currency?: string;
  reference?: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
}): Promise<{
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code?: string;
    reference: string;
  };
}> {
  const reference = data.reference || generateReference();
  
  const response = await paystack.transaction.initialize({
    email: data.email,
    amount: String(data.amount),
    currency: data.currency || 'NGN',
    reference,
    callback_url: data.callbackUrl,
    metadata: data.metadata,
  });

  return response as {
    status: boolean;
    message: string;
    data?: {
      authorization_url: string;
      access_code?: string;
      reference: string;
    };
  };
}

/**
 * Verify a transaction by reference
 */
export async function verifyTransaction(reference: string): Promise<PaystackVerifyResponse> {
  const response = await paystack.transaction.verify(reference);
  return response as unknown as PaystackVerifyResponse;
}

/**
 * List all transactions with optional filters
 */
export async function listTransactions(params?: {
  perPage?: number;
  page?: number;
  from?: Date;
  to?: Date;
  status?: string;
}): Promise<{ status: boolean; data: PaystackTransaction[] }> {
  const response = await paystack.transaction.list(params);
  return response as unknown as { status: boolean; data: PaystackTransaction[] };
}

/**
 * Get a single transaction by ID
 */
export async function getTransaction(id: number): Promise<{ status: boolean; data: PaystackTransaction }> {
  // Use fetch directly since SDK doesn't have get by ID
  const response = await fetch(`https://api.paystack.co/transaction/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${paystackSecret}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data as { status: boolean; data: PaystackTransaction };
}

/**
 * Charge an authorization code (for recurring payments)
 */
export async function chargeAuthorization(data: {
  email: string;
  authorization_code: string;
  amount: number;
  currency?: string;
  reference?: string;
  metadata?: Record<string, any>;
}): Promise<any> {
  const response = await paystack.transaction.chargeAuthorization({
    email: data.email,
    authorization_code: data.authorization_code,
    amount: String(data.amount),
    currency: data.currency || 'NGN',
    reference: data.reference || generateReference(),
    metadata: data.metadata,
  });
  return response;
}

/**
 * Refund a transaction
 */
export async function refundTransaction(data: {
  transaction: string;
  amount?: number;
}): Promise<{ status: boolean; message: string; data: any }> {
  const payload: { transaction: string; amount?: number } = {
    transaction: String(data.transaction),
  };
  if (data.amount) {
    payload.amount = data.amount;
  }
  const response = await paystack.refund.create(payload);
  return response as { status: boolean; message: string; data: any };
}

/**
 * Get balance
 */
export async function getBalance(): Promise<{ status: boolean; data: { currency: string; balance: number }[] }> {
  const response = await fetch('https://api.paystack.co/balance', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${paystackSecret}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data as { status: boolean; data: { currency: string; balance: number }[] };
}

/**
 * Utility: Generate a unique reference
 */
export function generateReference(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `ISA_${timestamp}_${random}`.toUpperCase();
}

/**
 * Utility: Convert Naira to Kobo
 */
export function nairaToKobo(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Utility: Convert Kobo to Naira
 */
export function koboToNaira(amount: number): number {
  return amount / 100;
}

// Export the paystack instance for direct SDK access
export { paystack };
export default paystack;
