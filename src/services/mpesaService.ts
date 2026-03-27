export const initiateStkPush = async (amount: number, phoneNumber: string): Promise<{ success: boolean; message?: string; checkoutRequestId?: string }> => {
  const safePhone = phoneNumber.replace(/[\r\n]/g, '');
  console.log(`Initiating STK Push for KES ${amount} to ${safePhone}`);
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, checkoutRequestId: 'ws_CO_27032026_123456789' });
    }, 2000);
  });
};
