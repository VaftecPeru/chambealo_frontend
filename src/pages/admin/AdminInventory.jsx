import { useCallback, useEffect, useMemo, useState } from 'react';
import { Download, Minus, Package, Plus, RefreshCw, Search } from 'lucide-react';
import { Badge, Notice, Spinner } from '../../components/admin/ui.jsx';
import { fetchAllProducts, getApiError, updateProductStock } from '../../services/adminService';
import {
  LOW_STOCK_THRESHOLD,
  STOCK_LEVELS,
  downloadCsv,
  formatMoney,
  getStockLevel,
  inputClass,
  primaryButton,
  secondaryButton,
  smallButton,
} from '../../utils/admin';

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState(null);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [drafts, setDrafts] = useState({});
  const [savingId, setSavingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError('');

    try {
      setProducts(await fetchAllProducts());
      setDrafts({});
    } catch (err) {
      console.error('Error al cargar el inventario:', err);
      setLoadError(getApiError(err, 'No se pudo cargar el inventario.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const summary = useMemo(
    () => ({
      total: products.length,
      out: products.filter((p) => getStockLevel(p.stock) === 'out').length,
      low: products.filter((p) => getStockLevel(p.stock) === 'low').length,
      units: products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0),
      value: products.reduce((sum, p) => sum + (Number(p.price) || 0) * (Number(p.stock) || 0), 0),
    }),
    [products]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      if (levelFilter && getStockLevel(product.stock) !== levelFilter) return false;
      if (!term) return true;

      return [product.name, product.slug, product.category?.name].some((value) =>
        String(value ?? '').toLowerCase().includes(term)
      );
    });
  }, [products, search, levelFilter]);

  const draftValue = (product) => drafts[product.id] ?? String(product.stock);
  const isDirty = (product) =>
    drafts[product.id] !== undefined && drafts[product.id] !== String(product.stock);

  const setDraft = (id, value) => setDrafts((prev) => ({ ...prev, [id]: value }));

  const adjust = (product, delta) => {
    const current = Number.parseInt(draftValue(product), 10);
    const base = Number.isNaN(current) ? Number(product.stock) || 0 : current;
    setDraft(product.id, String(Math.max(0, base + delta)));
  };

  const handleExport = () => {
    downloadCsv(
      `inventario-${new Date().toISOString().slice(0, 10)}.csv`,
      ['ID', 'Producto', 'Categoría', 'Precio (S/)', 'Stock', 'Nivel'],
      filtered.map((product) => [
        product.id,
        product.name,
        product.category?.name ?? '',
        Number(product.price || 0).toFixed(2),
        product.stock,
        STOCK_LEVELS[getStockLevel(product.stock)].label,
      ])
    );
  };

  const handleSave = async (product) => {
    const raw = draftValue(product).trim();
    const stock = Number(raw);

    if (raw === '' || !Number.isInteger(stock) || stock < 0) {
      setNotice({ type: 'error', text: 'El stock debe ser un número entero de 0 o más.' });
      return;
    }

    setSavingId(product.id);

    try {
      await updateProductStock(product, stock);

      setProducts((prev) => prev.map((item) => (item.id === product.id ? { ...item, stock } : item)));
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[product.id];
        return next;
      });
      setNotice({ type: 'success', text: `Stock de "${product.name}" actualizado a ${stock}.` });
    } catch (err) {
      setNotice({ type: 'error', text: getApiError(err, 'No se pudo actualizar el stock.') });
    } finally {
      setSavingId(null);
    }
  };

  const cards = [
    { label: 'Productos', value: summary.total },
    { label: 'Unidades en stock', value: summary.units },
    { label: 'Valor en stock', value: formatMoney(summary.value) },
    { label: `Stock bajo (≤ ${LOW_STOCK_THRESHOLD})`, value: summary.low },
    { label: 'Agotados', value: summary.out },
  ];

  return (
    <section aria-labelledby="admin-inventory-title">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 id="admin-inventory-title" className="text-xl font-bold text-gray-900">
          Inventario
        </h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar producto o categoría…"
              aria-label="Buscar en el inventario"
              className={`${inputClass} pl-9 sm:w-72`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            aria-label="Filtrar por nivel de stock"
            className={`${inputClass} sm:w-48`}
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="">Todos los niveles</option>
            <option value="out">Agotados</option>
            <option value="low">Stock bajo</option>
            <option value="ok">Disponibles</option>
          </select>

          <button type="button" className={secondaryButton} onClick={handleExport} disabled={filtered.length === 0}>
            <Download size={15} />
            Exportar CSV
          </button>
          <button type="button" className={secondaryButton} onClick={load} disabled={loading}>
            <RefreshCw size={15} />
            Actualizar
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{card.label}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{loading ? '…' : card.value}</p>
          </div>
        ))}
      </div>

      {notice && (
        <Notice type={notice.type} onClose={() => setNotice(null)}>
          {notice.text}
        </Notice>
      )}

      {loading ? (
        <Spinner label="Cargando inventario…" />
      ) : loadError ? (
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
          <p className="mb-4 text-red-700">{loadError}</p>
          <button type="button" className={primaryButton} onClick={load}>
            Reintentar
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          No hay productos que coincidan con el filtro.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Nivel</th>
                  <th className="px-4 py-3">Stock actual</th>
                  <th className="px-4 py-3">Ajustar stock</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => {
                  const level = STOCK_LEVELS[getStockLevel(product.stock)];
                  const dirty = isDirty(product);
                  const saving = savingId === product.id;

                  return (
                    <tr key={product.id} className="border-t border-gray-100 align-middle">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt=""
                              className="aspect-square w-10 shrink-0 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex aspect-square w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                              <Package size={16} />
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{product.category?.name ?? '—'}</td>
                      <td className="px-4 py-3">
                        <Badge tone={level.tone}>{level.label}</Badge>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{product.stock}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className={smallButton}
                            onClick={() => adjust(product, -1)}
                            disabled={saving}
                            aria-label={`Restar una unidad a ${product.name}`}
                          >
                            <Minus size={13} />
                          </button>
                          <input
                            type="number"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            aria-label={`Nuevo stock de ${product.name}`}
                            className={`${inputClass} w-24 text-center`}
                            value={draftValue(product)}
                            onChange={(e) => setDraft(product.id, e.target.value)}
                            disabled={saving}
                          />
                          <button
                            type="button"
                            className={smallButton}
                            onClick={() => adjust(product, 1)}
                            disabled={saving}
                            aria-label={`Sumar una unidad a ${product.name}`}
                          >
                            <Plus size={13} />
                          </button>
                          <button
                            type="button"
                            className={primaryButton}
                            onClick={() => handleSave(product)}
                            disabled={!dirty || saving}
                          >
                            {saving ? 'Guardando…' : 'Guardar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">
        El historial de movimientos de inventario (kardex) se mostrará aquí cuando el backend lo exponga.
      </p>
    </section>
  );
}