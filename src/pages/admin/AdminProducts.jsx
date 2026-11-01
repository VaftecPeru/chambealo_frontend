import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  ImagePlus,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { Badge, Field, Modal, Notice, Spinner } from '../../components/admin/ui.jsx';
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  getApiError,
  getCreatedId,
  getFieldErrors,
  getImageUploadError,
  productToForm,
  updateProduct,
  uploadProductImage,
} from '../../services/adminService';
import {
  PRODUCT_STATUS_LABELS,
  STOCK_LEVELS,
  dangerButton,
  downloadCsv,
  formatMoney,
  getStockLevel,
  inputClass,
  primaryButton,
  secondaryButton,
  slugify,
  smallButton,
  validateImageFile,
} from '../../utils/admin';

const PAGE_SIZE = 10;

// Cómo se obtiene el valor de cada columna ordenable.
const SORT_VALUES = {
  name: (product) => product.name,
  category: (product) => product.category?.name,
  brand: (product) => product.brand?.name,
  price: (product) => product.price,
  stock: (product) => product.stock,
};

const NUMERIC_SORTS = ['price', 'stock'];

function compareBy(key, a, b) {
  const first = SORT_VALUES[key](a);
  const second = SORT_VALUES[key](b);

  if (NUMERIC_SORTS.includes(key)) {
    return (Number(first) || 0) - (Number(second) || 0);
  }

  return String(first ?? '').localeCompare(String(second ?? ''), 'es', { sensitivity: 'base' });
}

function validateProduct(form) {
  const errors = {};
  const price = Number(form.price);
  const stock = Number(form.stock);

  if (!form.name.trim()) errors.name = 'Escribe el nombre del producto.';
  if (!form.category_id) errors.category_id = 'Selecciona una categoría.';
  if (!form.brand_id) errors.brand_id = 'Selecciona una marca.';
  if (form.price === '' || Number.isNaN(price) || price < 0) {
    errors.price = 'Ingresa un precio válido (0 o más).';
  }
  if (form.stock === '' || !Number.isInteger(stock) || stock < 0) {
    errors.stock = 'El stock debe ser un número entero (0 o más).';
  }

  return errors;
}

function SortHeader({ label, sortKey, sort, onSort, align = 'left' }) {
  const active = sort.key === sortKey;
  const Icon = !active ? ArrowUpDown : sort.dir === 'asc' ? ArrowUp : ArrowDown;
  const ariaSort = !active ? 'none' : sort.dir === 'asc' ? 'ascending' : 'descending';

  return (
    <th className={`px-4 py-3 ${align === 'right' ? 'text-right' : ''}`} aria-sort={ariaSort}>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1 uppercase tracking-wide hover:text-gray-900 ${
          active ? 'text-gray-900' : 'text-gray-500'
        }`}
      >
        {label}
        <Icon size={12} />
      </button>
    </th>
  );
}

function ProductForm({ product, categories, brands, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => productToForm(product));
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageError, setImageError] = useState('');
  const [preview, setPreview] = useState('');

  // Vista previa de la imagen elegida (se libera al cambiar o cerrar).
  useEffect(() => {
    if (!imageFile) return undefined;

    const url = URL.createObjectURL(imageFile);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const shownImage = (imageFile && preview) || product?.image_url || '';

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleName = (value) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
    setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleImage = (file) => {
    const problem = validateImageFile(file);
    setImageError(problem);
    setImageFile(problem ? null : file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validateProduct(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    setSubmitError('');

    try {
      await onSubmit(form, imageFile);
    } catch (err) {
      setErrors(getFieldErrors(err));
      setSubmitError(getApiError(err, 'No se pudo guardar el producto.'));
      setSaving(false);
    }
  };

  const invalid = (name) => Boolean(errors[name]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      {submitError && <Notice type="error">{submitError}</Notice>}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <p className="mb-1 text-sm font-medium text-gray-700">Imagen del producto</p>
          <div className="flex items-center gap-4">
            {shownImage ? (
              <img
                src={shownImage}
                alt="Vista previa del producto"
                className="aspect-square w-24 shrink-0 rounded-xl border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex aspect-square w-24 shrink-0 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400">
                <Package size={28} />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <label htmlFor="product-image" className={`${secondaryButton} cursor-pointer`}>
                  <ImagePlus size={16} />
                  {shownImage ? 'Cambiar imagen' : 'Subir imagen'}
                </label>
                {imageFile && (
                  <button type="button" className={smallButton} onClick={() => handleImage(null)}>
                    Quitar selección
                  </button>
                )}
              </div>
              <input
                id="product-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  e.target.value = '';
                  handleImage(file);
                }}
              />
              <p className="text-xs text-gray-500">
                JPG, PNG o WEBP · máximo 2 MB.{imageFile ? ` Nueva imagen: ${imageFile.name}` : ''}
              </p>
              {imageError && <p className="text-xs text-red-600">{imageError}</p>}
            </div>
          </div>
        </div>

        <Field id="product-name" label="Nombre" required error={errors.name} className="sm:col-span-2">
          <input
            id="product-name"
            autoFocus
            className={inputClass}
            value={form.name}
            onChange={(e) => handleName(e.target.value)}
            aria-invalid={invalid('name')}
            aria-describedby={invalid('name') ? 'product-name-error' : undefined}
          />
        </Field>

        <Field
          id="product-slug"
          label="Slug (URL)"
          error={errors.slug}
          hint="Se genera solo a partir del nombre."
          className="sm:col-span-2"
        >
          <input
            id="product-slug"
            className={inputClass}
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setField('slug', e.target.value);
            }}
          />
        </Field>

        <Field id="product-category" label="Categoría" required error={errors.category_id}>
          <select
            id="product-category"
            className={inputClass}
            value={form.category_id}
            onChange={(e) => setField('category_id', e.target.value)}
            aria-invalid={invalid('category_id')}
          >
            <option value="">Selecciona…</option>
            {categories.map((category) => (
              <option key={category.id} value={String(category.id)}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="product-brand" label="Marca" required error={errors.brand_id}>
          <select
            id="product-brand"
            className={inputClass}
            value={form.brand_id}
            onChange={(e) => setField('brand_id', e.target.value)}
            aria-invalid={invalid('brand_id')}
          >
            <option value="">Selecciona…</option>
            {brands.map((brand) => (
              <option key={brand.id} value={String(brand.id)}>
                {brand.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="product-price" label="Precio (S/)" required error={errors.price}>
          <input
            id="product-price"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            className={inputClass}
            value={form.price}
            onChange={(e) => setField('price', e.target.value)}
            aria-invalid={invalid('price')}
          />
        </Field>

        <Field id="product-stock" label="Stock" required error={errors.stock}>
          <input
            id="product-stock"
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            className={inputClass}
            value={form.stock}
            onChange={(e) => setField('stock', e.target.value)}
            aria-invalid={invalid('stock')}
          />
        </Field>

        <Field id="product-status" label="Estado" error={errors.status}>
          <select
            id="product-status"
            className={inputClass}
            value={form.status}
            onChange={(e) => setField('status', e.target.value)}
          >
            {Object.entries(PRODUCT_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="product-description" label="Descripción" error={errors.description} className="sm:col-span-2">
          <textarea
            id="product-description"
            rows={3}
            className={inputClass}
            value={form.description}
            onChange={(e) => setField('description', e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" className={secondaryButton} onClick={onCancel} disabled={saving}>
          Cancelar
        </button>
        <button type="submit" className={primaryButton} disabled={saving}>
          {saving ? 'Guardando…' : product ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [sort, setSort] = useState({ key: '', dir: 'asc' });
  const [page, setPage] = useState(1);
  const [editor, setEditor] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setLoadError('');

    try {
      const [productList, categoryList, brandList] = await Promise.all([
        fetchAllProducts(),
        fetchCategories(),
        fetchBrands(),
      ]);

      setProducts(productList);
      setCategories(categoryList);
      setBrands(brandList);
    } catch (err) {
      console.error('Error al cargar el catálogo del panel:', err);
      setLoadError(getApiError(err, 'No se pudo cargar el catálogo.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      if (categoryFilter && String(product.category?.id) !== categoryFilter) return false;
      if (brandFilter && String(product.brand?.id) !== brandFilter) return false;
      if (!term) return true;

      return [product.name, product.slug, product.brand?.name, product.category?.name].some((value) =>
        String(value ?? '').toLowerCase().includes(term)
      );
    });
  }, [products, search, categoryFilter, brandFilter]);

  const sorted = useMemo(() => {
    if (!sort.key) return filtered;

    const factor = sort.dir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => factor * compareBy(sort.key, a, b));
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const firstIndex = (currentPage - 1) * PAGE_SIZE;
  const visible = sorted.slice(firstIndex, firstIndex + PAGE_SIZE);
  const hasFilters = Boolean(search || categoryFilter || brandFilter);

  const closeEditor = useCallback(() => setEditor(null), []);

  const toggleSort = (key) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }
    );
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setCategoryFilter('');
    setBrandFilter('');
    setPage(1);
  };

  const handleExport = () => {
    downloadCsv(
      `productos-${new Date().toISOString().slice(0, 10)}.csv`,
      ['ID', 'Producto', 'Categoría', 'Marca', 'Precio (S/)', 'Stock', 'Estado'],
      sorted.map((product) => [
        product.id,
        product.name,
        product.category?.name ?? '',
        product.brand?.name ?? '',
        Number(product.price || 0).toFixed(2),
        product.stock,
        PRODUCT_STATUS_LABELS[product.status] ?? product.status,
      ])
    );
  };

  const handleSave = async (form, imageFile) => {
    const editing = editor?.product;
    const result = editing ? await updateProduct(editing.id, form) : await createProduct(form);

    setEditor(null);

    // La imagen se sube aparte; si falla, el producto ya quedó guardado.
    let imageProblem = '';

    if (imageFile) {
      try {
        const productId = editing ? editing.id : getCreatedId(result);
        if (productId == null) throw new Error('missing-id');

        await uploadProductImage(productId, imageFile);
      } catch (err) {
        imageProblem = getImageUploadError(err);
      }
    }

    const text = `Producto "${form.name.trim()}" ${editing ? 'actualizado' : 'creado'} correctamente.`;

    setNotice(
      imageProblem
        ? { type: 'error', text: `${text} Pero la imagen no se pudo subir: ${imageProblem}` }
        : { type: 'success', text }
    );
    await load(true);
  };

  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `¿Eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    setDeletingId(product.id);

    try {
      await deleteProduct(product.id);
      setNotice({ type: 'success', text: `Producto "${product.name}" eliminado.` });
      await load(true);
    } catch (err) {
      setNotice({ type: 'error', text: getApiError(err, 'No se pudo eliminar el producto.') });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section aria-labelledby="admin-products-title">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="admin-products-title" className="text-xl font-bold text-gray-900">
          Productos
          <span className="ml-2 text-sm font-medium text-gray-500">({sorted.length})</span>
        </h2>

        <div className="flex flex-wrap gap-2">
          <button type="button" className={secondaryButton} onClick={handleExport} disabled={sorted.length === 0}>
            <Download size={15} />
            Exportar CSV
          </button>
          <button type="button" className={secondaryButton} onClick={() => load()} disabled={loading}>
            <RefreshCw size={15} />
            Actualizar
          </button>
          <button type="button" className={primaryButton} onClick={() => setEditor({ product: null })}>
            <Plus size={16} />
            Nuevo producto
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Buscar producto, marca o categoría…"
            aria-label="Buscar productos"
            className={`${inputClass} pl-9 sm:w-72`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          aria-label="Filtrar por categoría"
          className={`${inputClass} sm:w-48`}
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrar por marca"
          className={`${inputClass} sm:w-48`}
          value={brandFilter}
          onChange={(e) => {
            setBrandFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Todas las marcas</option>
          {brands.map((brand) => (
            <option key={brand.id} value={String(brand.id)}>
              {brand.name}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button type="button" className={smallButton} onClick={clearFilters}>
            <X size={13} />
            Limpiar filtros
          </button>
        )}
      </div>

      {notice && (
        <Notice type={notice.type} onClose={() => setNotice(null)}>
          {notice.text}
        </Notice>
      )}

      {loading ? (
        <Spinner label="Cargando productos…" />
      ) : loadError ? (
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
          <p className="mb-4 text-red-700">{loadError}</p>
          <button type="button" className={primaryButton} onClick={() => load()}>
            Reintentar
          </button>
        </div>
      ) : sorted.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          {products.length === 0
            ? 'Todavía no hay productos. Crea el primero con "Nuevo producto".'
            : 'No hay productos que coincidan con la búsqueda.'}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs">
                <tr>
                  <SortHeader label="Producto" sortKey="name" sort={sort} onSort={toggleSort} />
                  <SortHeader label="Categoría" sortKey="category" sort={sort} onSort={toggleSort} />
                  <SortHeader label="Marca" sortKey="brand" sort={sort} onSort={toggleSort} />
                  <SortHeader label="Precio" sortKey="price" sort={sort} onSort={toggleSort} align="right" />
                  <SortHeader label="Stock" sortKey="stock" sort={sort} onSort={toggleSort} />
                  <th className="px-4 py-3 uppercase tracking-wide text-gray-500">Estado</th>
                  <th className="px-4 py-3 text-right uppercase tracking-wide text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((product) => {
                  const level = STOCK_LEVELS[getStockLevel(product.stock)];

                  return (
                    <tr key={product.id} className="border-t border-gray-100 align-middle">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt=""
                              className="aspect-square w-12 shrink-0 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex aspect-square w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                              <Package size={20} />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{product.category?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-700">{product.brand?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">
                        {formatMoney(product.price)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{product.stock}</span>
                          <Badge tone={level.tone}>{level.label}</Badge>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {PRODUCT_STATUS_LABELS[product.status] ?? product.status}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            className={smallButton}
                            onClick={() => setEditor({ product })}
                          >
                            <Pencil size={13} />
                            Editar
                          </button>
                          <button
                            type="button"
                            className={dangerButton}
                            onClick={() => handleDelete(product)}
                            disabled={deletingId === product.id}
                          >
                            <Trash2 size={13} />
                            {deletingId === product.id ? 'Eliminando…' : 'Eliminar'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-sm text-gray-600 sm:flex-row">
            <p>
              Mostrando {firstIndex + 1}–{firstIndex + visible.length} de {sorted.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={smallButton}
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                type="button"
                className={smallButton}
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {editor && (
        <Modal title={editor.product ? 'Editar producto' : 'Nuevo producto'} onClose={closeEditor}>
          <ProductForm
            key={editor.product?.id ?? 'nuevo'}
            product={editor.product}
            categories={categories}
            brands={brands}
            onSubmit={handleSave}
            onCancel={closeEditor}
          />
        </Modal>
      )}
    </section>
  );
}