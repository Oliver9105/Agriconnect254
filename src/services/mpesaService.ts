export const initiateStkPush = async (
  amount: number,
  phoneNumber: string,
  itemId: number | string,
  farmer: string
): Promise<{ success: boolean; checkoutRequestId?: string; message?: string }> => {
  const res = await fetch('/api/v1/mpesa/purchase/initiate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, phoneNumber, itemId, farmer })
  });
  const data = await res.json();
  if (!res.ok) return { success: false, message: data.error };
  return { success: true, checkoutRequestId: data.CheckoutRequestID };
};

export const pollPaymentStatus = async (
  checkoutRequestId: string
): Promise<'Pending' | 'Completed' | 'Failed' | 'NOT_FOUND'> => {
  const res = await fetch(`/api/v1/mpesa/status/${checkoutRequestId}`);
  const data = await res.json();
  return data.status;
};
