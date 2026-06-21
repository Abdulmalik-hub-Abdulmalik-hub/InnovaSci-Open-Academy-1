// Paystack Payment Integration for InnovaSci Open Academy
// NGN (Nigerian Naira) Payments

export interface PaystackConfig {
  secretKey: string;
  publicKey: string;
  webhookSecret?: string;
}

export interface PaystackInitializeRequest {
  email: string;
  amount: number; // Amount in kobo (smallest currency unit)
  currency?: string; // Default: NGN
  reference?: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
  channels?: string[];
  split?: {
    type: string;
    bearer_subaccount?: string;
    subaccounts?: string[];
    share?: number;
  };
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
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
    paidAt: string;
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

export class PaystackPayment {
  private secretKey: string = '';
  private baseUrl = 'https://api.paystack.co';
  private initialized: boolean = false;

  constructor(config?: PaystackConfig) {
    if (config?.secretKey) {
      this.secretKey = config.secretKey;
      this.initialized = true;
    }
  }

  private ensureInitialized() {
    if (!this.initialized) {
      this.secretKey = process.env.PAYSTACK_SECRET_KEY || '';
      this.initialized = true;
    }
    if (!this.secretKey) {
      throw new Error('Paystack secret key is required');
    }
  }

  /**
   * Initialize a payment transaction
   */
  async initializePayment(data: PaystackInitializeRequest): Promise<PaystackInitializeResponse> {
    const url = `${this.baseUrl}/transaction/initialize`;
    
    const payload = {
      email: data.email,
      amount: data.amount,
      currency: data.currency || 'NGN',
      reference: data.reference || this.generateReference(),
      callback_url: data.callbackUrl,
      metadata: data.metadata,
      channels: data.channels || ['card', 'bank_transfer', 'ussd', 'mobile_money'],
      split: data.split,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  /**
   * Verify a transaction by reference
   */
  async verifyTransaction(reference: string): Promise<PaystackVerifyResponse> {
    const url = `${this.baseUrl}/transaction/verify/${reference}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }

  /**
   * List all transactions with optional filters
   */
  async listTransactions(params?: {
    perPage?: number;
    page?: number;
    from?: string;
    to?: string;
    status?: string;
  }): Promise<{ status: boolean; data: PaystackTransaction[] }> {
    const queryParams = new URLSearchParams();
    
    if (params?.perPage) queryParams.append('perPage', params.perPage.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.from) queryParams.append('from', params.from);
    if (params?.to) queryParams.append('to', params.to);
    if (params?.status) queryParams.append('status', params.status);

    const url = `${this.baseUrl}/transaction?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
      },
    });

    return response.json();
  }

  /**
   * Get a single transaction by ID
   */
  async getTransaction(id: number): Promise<{ status: boolean; data: PaystackTransaction }> {
    const url = `${this.baseUrl}/transaction/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
      },
    });

    return response.json();
  }

  /**
   * Charge an authorization code (for recurring payments)
   */
  async chargeAuthorization(data: {
    email: string;
    authorization_code: string;
    amount: number;
    currency?: string;
    reference?: string;
    metadata?: Record<string, any>;
  }): Promise<any> {
    const url = `${this.baseUrl}/transaction/charge_authorization`;

    const payload = {
      email: data.email,
      authorization_code: data.authorization_code,
      amount: data.amount,
      currency: data.currency || 'NGN',
      reference: data.reference || this.generateReference(),
      metadata: data.metadata,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  /**
   * Refund a transaction
   */
  async refundTransaction(data: {
    transaction: number | string;
    amount?: number; // Partial refund amount in kobo
  }): Promise<{ status: boolean; message: string; data: any }> {
    const url = `${this.baseUrl}/refund`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  /**
   * Create a payment page
   */
  async createPaymentPage(data: {
    name: string;
    description?: string;
    amount: number;
    currency?: string;
    slug?: string;
    metadata?: Record<string, any>;
  }): Promise<any> {
    const url = `${this.baseUrl}/page`;

    const payload = {
      name: data.name,
      description: data.description,
      amount: data.amount,
      currency: data.currency || 'NGN',
      slug: data.slug,
      metadata: data.metadata,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  /**
   * Get balance
   */
  async getBalance(): Promise<{ status: boolean; data: { currency: string; balance: number }[] }> {
    const url = `${this.baseUrl}/balance`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
      },
    });

    return response.json();
  }

  /**
   * Utility: Generate a unique reference
   */
  private generateReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    return `ISA_${timestamp}_${random}`.toUpperCase();
  }

  /**
   * Utility: Convert Naira to Kobo
   */
  static nairaToKobo(amount: number): number {
    return Math.round(amount * 100);
  }

  /**
   * Utility: Convert Kobo to Naira
   */
  static koboToNaira(amount: number): number {
    return amount / 100;
  }
}

// Export singleton instance
export const paystack = new PaystackPayment({
  secretKey: process.env.PAYSTACK_SECRET_KEY || '',
  publicKey: process.env.PAYSTACK_PUBLIC_KEY || '',
  webhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET,
});

export default PaystackPayment;
