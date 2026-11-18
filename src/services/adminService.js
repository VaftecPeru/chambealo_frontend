import api from './api';
import { slugify } from '../utils/admin';

// Servicio del panel administrativo
// Use la misma instancia de axios (api.js), que ya envía el token Bearer.

const PER_PAGE = 100;
const MAX_PAGES = 50;

// aca convierte un error de axios en un mensaje claro para el usuario.
export function getApiError(err, fallback = 'Ocurrió un error inesperado. Inténtalo de nuevo.') {
  if (!err?.response) {
    return 'No se pudo conectar con el servidor.';
  }

  const { status, data } = err.response;

  if (status === 501) return 'Esta acción todavía no está disponible en el backend.';
  if (status === 403) return 'No tienes permisos para realizar esta acción.';
  if (status === 401) return 'Tu sesión expiró. Inicia sesión de nuevo.';

  if (status === 422 && data?.errors) {
    const first = Object.values(data.errors)[0];
    return (Array.isArray(first) ? first[0] : first) || data.message || fallback;
  }

  return data?.message || data?.error || fallback;
}

// Errores de validación del backend (422) agrupados por campo.
export function getFieldErrors(err) {
  const errors = err?.response?.status === 422 ? err.response.data?.errors : null;
  if (!errors) return {};

  return Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [
      field,
      Array.isArray(messages) ? messages[0] : String(messages),
    ])
  );
}

// La API responde { data: [...] } o { products: [...] }; se aceptan ambas.
function toList(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
}

// ---------- Lecturas ----------

export async function fetchAllProducts() {
  const items = [];
  let page = 1;
  let lastPage = 1;

  do {
    const { data } = await api.get('/products', {
      params: { per_page: PER_PAGE, page },
    });

    items.push(...toList(data));
    lastPage = data?.meta?.last_page ?? 1;
    page += 1;
  } while (page <= lastPage && page <= MAX_PAGES);

  return items;
}

export async function fetchCategories() {
  const { data } = await api.get('/categories');
  return toList(data);
}

export async function fetchBrands() {
  const { data } = await api.get('/brands');
  return toList(data);
}

// ---------- Productos ----------

export function productToForm(product) {
  return {
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    price: product?.price != null ? String(product.price) : '',
    stock: product?.stock != null ? String(product.stock) : '0',
    status: product?.status ?? 'active',
    category_id: product?.category?.id != null ? String(product.category.id) : '',
    brand_id: product?.brand?.id != null ? String(product.brand.id) : '',
  };
}

function buildProductPayload(form) {
  return {
    name: form.name.trim(),
    slug: form.slug.trim() || slugify(form.name),
    description: form.description.trim() || null,
    price: Number(form.price),
    stock: Number.parseInt(form.stock, 10),
    status: form.status,
    category_id: Number(form.category_id),
    brand_id: Number(form.brand_id),
  };
}

export async function createProduct(form) {
  const { data } = await api.post('/products', buildProductPayload(form));
  return data;
}

export async function updateProduct(id, form) {
  const { data } = await api.put(`/products/${id}`, buildProductPayload(form));
  return data;
}

// Cambia solo el stock reutilizando el resto de datos del producto.
export function updateProductStock(product, stock) {
  return updateProduct(product.id, { ...productToForm(product), stock: String(stock) });
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

// ---------- Categorías ----------

export function categoryToForm(category) {
  return {
    name: category?.name ?? '',
    slug: category?.slug ?? '',
    description: category?.description ?? '',
    parent_id: category?.parent_id != null ? String(category.parent_id) : '',
  };
}

function buildCategoryPayload(form) {
  return {
    name: form.name.trim(),
    slug: form.slug.trim() || slugify(form.name),
    description: form.description.trim() || null,
    parent_id: form.parent_id ? Number(form.parent_id) : null,
  };
}

export async function createCategory(form) {
  const { data } = await api.post('/categories', buildCategoryPayload(form));
  return data;
}

export async function updateCategory(id, form) {
  const { data } = await api.put(`/categories/${id}`, buildCategoryPayload(form));
  return data;
}

export async function deleteCategory(id) {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
}
// ---------- Imagen del producto ----------

// Id del producto recién creado, según cómo responda el backend.
export function getCreatedId(result) {
  return result?.data?.id ?? result?.data?.product_id ?? result?.id ?? result?.product?.id ?? null;
}

// Sube una imagen nueva: POST /products/{id}/image con el archivo en el campo "image".
export async function uploadProductImage(id, file) {
  const body = new FormData();
  body.append('image', file);

  const { data } = await api.post(`/products/${id}/image`, body, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data;
}

export function getImageUploadError(err) {
  if (!err?.response && err?.message === 'missing-id') {
    return 'el backend no devolvió el id del producto.';
  }

  const status = err?.response?.status;
  if (status === 404 || status === 405 || status === 501) {
    return 'la carga de imágenes todavía no está disponible en el backend.';
  }

  return getApiError(err, 'inténtalo de nuevo.');
}