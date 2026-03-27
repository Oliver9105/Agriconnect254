export const initiateStkPush = async (amount: number, phoneNumber: string): Promise<{ success: boolean; message?: string; checkoutRequestId?: string }> => {
  console.log(`Initiating STK Push for KES ${amount} to ${phoneNumber}`);
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, checkoutRequestId: 'ws_CO_27032026_123456789' });
    }, 2000);
  });
};
