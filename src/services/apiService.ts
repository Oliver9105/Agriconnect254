const BASE = '/api/v1';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function post<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

async function patch<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`PATCH ${path} failed: ${res.status}`);
  return res.json();
}

// Inventory
export const fetchInventory = (q?: string) =>
  get<any[]>(`/inventory${q ? `?q=${encodeURIComponent(q)}` : ''}`);

export const createInventoryItem = (data: any) =>
  post<any>('/inventory', data);

export const updateInventoryItem = (id: number, data: any) =>
  patch<any>(`/inventory/${id}`, data);

// Transactions
export const fetchTransactions = (params?: { type?: string; status?: string; q?: string }) => {
  const qs = new URLSearchParams();
  if (params?.type && params.type !== 'All') qs.set('type', params.type);
  if (params?.status && params.status !== 'All') qs.set('status', params.status);
  if (params?.q) qs.set('q', params.q);
  const query = qs.toString();
  return get<any[]>(`/transactions${query ? `?${query}` : ''}`);
};

// Messages
export const fetchMessages = (chatId: string) =>
  get<any[]>(`/messages/${chatId}`);

export const sendMessage = (chatId: string, text: string, sender: string) =>
  post<any>('/messages', { chatId, text, sender });

// NeuralAgri prediction
export const fetchPrediction = (batchId: string) =>
  get<any>(`/predict/${batchId}`);
