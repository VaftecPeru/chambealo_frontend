// Utilidades compartidas del panel administrativo

export const LOW_STOCK_THRESHOLD = 5;

export const PRODUCT_STATUS_LABELS = {
  active: 'Activo',
  inactive: 'Inactivo',
  out_of_stock: 'Agotado',
};

export const STOCK_LEVELS = {
  out: { label: 'Agotado', tone: 'red' },
  low: { label: 'Stock bajo', tone: 'amber' },
  ok: { label: 'Disponible', tone: 'green' },
};

export const formatMoney = (amount) => `S/ ${Number(amount || 0).toFixed(2)}`;

export function slugify(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getStockLevel(stock) {
  const value = Number(stock) || 0;
  if (value <= 0) return 'out';
  if (value <= LOW_STOCK_THRESHOLD) return 'low';
  return 'ok';
}

// Clases de Tailwind reutilizadas en los formularios y botones del panel.
export const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:bg-gray-100';

export const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300';

export const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60';

export const dangerButton =
  'inline-flex items-center justify-center gap-1 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60';

export const smallButton =
  'inline-flex items-center justify-center gap-1 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60';

// ---------- Imágenes de producto ----------

export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export function validateImageFile(file) {
  if (!file) return '';
  if (!IMAGE_TYPES.includes(file.type)) return 'Usa una imagen JPG, PNG o WEBP.';
  if (file.size > MAX_IMAGE_BYTES) return 'La imagen no debe pesar más de 2 MB.';
  return '';
}

// ---------- Exportar a CSV (se abre bien en Excel) ----------

export function toCsv(headers, rows) {
  const cell = (value) => {
    let text = String(value ?? '');
    // Evita que Excel interprete el texto como fórmula.
    if (/^[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  };

  return [headers, ...rows].map((row) => row.map(cell).join(',')).join('\r\n');
}

export function downloadCsv(filename, headers, rows) {
  const blob = new Blob(['\ufeff', toCsv(headers, rows)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}