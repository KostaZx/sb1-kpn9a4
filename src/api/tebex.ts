import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_TEBEX_API_URL,
  headers: {
    'X-Tebex-Secret': import.meta.env.VITE_TEBEX_SECRET
  }
});

export const fetchPackages = async () => {
  const { data } = await api.get('/packages');
  return data;
};

export const fetchPackage = async (id: string) => {
  const { data } = await api.get(`/packages/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};

export const createBasket = async (params: {
  complete_url: string;
  cancel_url: string;
  custom?: Record<string, any>;
}) => {
  const { data } = await api.post('/baskets', params);
  return data;
};

export const addToBasket = async (basketId: string, params: {
  package_id: number;
  quantity: number;
}) => {
  const { data } = await api.post(`/baskets/${basketId}/packages`, params);
  return data;
};