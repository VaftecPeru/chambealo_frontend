import api from './api';

// Obtener lista de productos (Catálogo)
export const getProducts = async (category = '') => {
  const response = await api.get('/products', {
    params: category ? { category } : {}
  });
  return response.data;
};

// Obtener el detalle de un producto específico
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};