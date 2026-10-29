import api from './api';

// Obtener los productos del catálogo.
export const getProducts = async (category = '') => {
  const response = await api.get('/products', {
    params: {
      per_page: 100,
      ...(category ? { category } : {}),
    },
  });

  return response.data;
};

// Obtener el detalle de un producto por su ID.
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};
