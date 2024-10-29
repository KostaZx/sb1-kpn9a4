import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TEBEX_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCategories = async () => {
  const { data } = await api.get('/categories?includePackages=true');
  return data;
};

export const getPackages = async () => {
  const { data } = await api.get('/packages');
  return data;
};

export const createBasket = async (complete_url: string, cancel_url: string) => {
  const { data } = await api.post('/basket', { complete_url, cancel_url });
  return data;
};

export const addToBasket = async (basketIdent: string, packageId: number, quantity: number) => {
  const { data } = await api.post(`/basket/${basketIdent}/packages`, {
    package_id: packageId,
    quantity,
  });
  return data;
};