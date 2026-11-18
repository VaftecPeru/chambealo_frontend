import api from './api';

// Obtener lista de productos (Catálogo)
export const getProducts = async (category = '') => {
  const params = category ? { category } : {};

  const firstResponse = await api.get('/products', {
    params: { ...params, page: 1 },
  });

  const firstData = firstResponse.data;

  const extractProducts = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.products)) return data.products;
    return [];
  };

  let products = extractProducts(firstData);
  const totalPages = Number(firstData?.meta?.last_page || 1);

  for (let page = 2; page <= totalPages; page++) {
    const response = await api.get('/products', {
      params: { ...params, page },
    });

    products = [...products, ...extractProducts(response.data)];
  }

  return products;
};

// Obtener el detalle de un producto específico
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};