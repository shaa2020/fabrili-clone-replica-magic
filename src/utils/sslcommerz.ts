
// SSLCommerz integration utilities
export interface SSLCommerzConfig {
  store_id: string;
  store_passwd: string;
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url?: string;
  product_name: string;
  product_category: string;
  product_profile: string;
  shipping_method: string;
  num_of_item: number;
  cus_name: string;
  cus_email: string;
  cus_add1: string;
  cus_add2?: string;
  cus_city: string;
  cus_state?: string;
  cus_postcode?: string;
  cus_country: string;
  cus_phone: string;
  ship_name?: string;
  ship_add1?: string;
  ship_add2?: string;
  ship_city?: string;
  ship_state?: string;
  ship_postcode?: string;
  ship_country?: string;
  multi_card_name?: string;
  value_a?: string;
  value_b?: string;
  value_c?: string;
  value_d?: string;
}

export const generateTransactionId = (): string => {
  return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const initializeSSLCommerz = (config: SSLCommerzConfig): Promise<string> => {
  return new Promise((resolve, reject) => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php'; // Use live URL for production
    form.style.display = 'none';

    Object.entries(config).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value.toString();
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    resolve('Payment initiated');
  });
};

export const validateSSLCommerzResponse = (response: any): boolean => {
  // Validate SSLCommerz response
  return response && response.status === 'VALID';
};
