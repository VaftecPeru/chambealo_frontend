// Datos comerciales verificables que llegan de la API
// Si la API no envía un dato, la vitrina no lo inventa: simplemente no lo muestra.

export const LOW_STOCK_UNITS = 5;

// Precio actual y, solo si la API envía un precio anterior mayor, el descuento real.
export function getPricing(product) {
  const price = Number(product?.price ?? product?.precio ?? 0) || 0;
  const previous = Number(product?.oldPrice ?? product?.original_price ?? 0) || 0;
  const oldPrice = price > 0 && previous > price ? previous : null;
  const percent = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return { price, oldPrice, percent };
}

// Valoración real (1 a 5). Si la API no la envía, devuelve null y no se muestran estrellas.
export function getRating(product) {
  const value = Number(product?.rating);
  return Number.isFinite(value) && value > 0 ? Math.min(value, 5) : null;
}

// Estado de stock real según lo que devuelve la API.
export function getStockInfo(product) {
  const raw = product?.stock ?? product?.stock_quantity ?? null;

  if (raw === null || raw === '' || Number.isNaN(Number(raw))) {
    return { known: false, units: null, soldOut: false, low: false, label: 'Stock no disponible' };
  }

  const units = Number(raw);
  const soldOut = units <= 0 || product?.status === 'out_of_stock';
  const low = !soldOut && units <= LOW_STOCK_UNITS;

  let label = `${units} unidades`;
  if (soldOut) label = 'Agotado';
  else if (units === 1) label = 'Última unidad';
  else if (low) label = `Últimas ${units} unidades`;

  return { known: true, units, soldOut, low, label };
}