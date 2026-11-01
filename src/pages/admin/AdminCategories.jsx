import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { Field, Modal, Notice, Spinner } from '../../components/admin/ui.jsx';
import {
  categoryToForm,
  createCategory,
  deleteCategory,
  fetchCategories,
  getApiError,
  getFieldErrors,
  updateCategory,
} from '../../services/adminService';
import {
  dangerButton,
  inputClass,
  primaryButton,
  secondaryButton,
  slugify,
  smallButton,
} from '../../utils/admin';

function CategoryForm({ category, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => categoryToForm(category));
  const [slugTouched, setSlugTouched] = useState(Boolean(category));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const parentOptions = categories.filter((item) => item.id !== category?.id);

  const handleName = (value) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
    setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setErrors({ name: 'Escribe el nombre de la categoría.' });
      return;
    }

    setSaving(true);
    setSubmitError('');

    try {
      await onSubmit(form);
    } catch (err) {
      setErrors(getFieldErrors(err));
      setSubmitError(getApiError(err, 'No se pudo guardar la categoría.'));
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {submitError && <Notice type="error">{submitError}</Notice>}

      <div className="grid gap-4">
        <Field id="category-name" label="Nombre" required error={errors.name}>
          <input
            id="category-name"
            autoFocus
            className={inputClass}
            value={form.name}
            onChange={(e) => handleName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'category-name-error' : undefined}
          />
        </Field>

        <Field
          id="category-slug"
          label="Slug (URL)"
          error={errors.slug}
          hint="Se genera solo a partir del nombre."
        >
          <input
            id="category-slug"
            className={inputClass}
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm((prev) => ({ ...prev, slug: e.target.value }));
            }}
          />
        </Field>

        <Field id="category-parent" label="Categoría padre" error={errors.parent_id}>
          <select
            id="category-parent"
            className={inputClass}
            value={form.parent_id}
            onChange={(e) => setForm((prev) => ({ ...prev, parent_id: e.target.value }))}
          >
            <option value="">Ninguna (categoría principal)</option>
            {parentOptions.map((item) => (
              <option key={item.id} value={String(item.id)}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="category-description" label="Descripción" error={errors.description}>
          <textarea
            id="category-description"
            rows={3}
            className={inputClass}
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
        </Field>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" className={secondaryButton} onClick={onCancel} disabled={saving}>
          Cancelar
        </button>
        <button type="submit" className={primaryButton} disabled={saving}>
          {saving ? 'Guardando…' : category ? 'Guardar cambios' : 'Crear categoría'}
        </button>
      </div>
    </form>
  );
}

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState(null);
  const [editor, setEditor] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setLoadError('');

    try {
      setCategories(await fetchCategories());
    } catch (err) {
      console.error('Error al cargar las categorías:', err);
      setLoadError(getApiError(err, 'No se pudieron cargar las categorías.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const namesById = useMemo(
    () => Object.fromEntries(categories.map((item) => [item.id, item.name])),
    [categories]
  );

  const closeEditor = useCallback(() => setEditor(null), []);

  const handleSave = async (form) => {
    const editing = editor?.category;

    if (editing) {
      await updateCategory(editing.id, form);
    } else {
      await createCategory(form);
    }

    setEditor(null);
    setNotice({
      type: 'success',
      text: `Categoría "${form.name.trim()}" ${editing ? 'actualizada' : 'creada'} correctamente.`,
    });
    await load(true);
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `¿Eliminar la categoría "${category.name}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) return;

    setDeletingId(category.id);

    try {
      await deleteCategory(category.id);
      setNotice({ type: 'success', text: `Categoría "${category.name}" eliminada.` });
      await load(true);
    } catch (err) {
      setNotice({ type: 'error', text: getApiError(err, 'No se pudo eliminar la categoría.') });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section aria-labelledby="admin-categories-title">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="admin-categories-title" className="text-xl font-bold text-gray-900">
          Categorías
          <span className="ml-2 text-sm font-medium text-gray-500">({categories.length})</span>
        </h2>

        <div className="flex gap-2">
          <button type="button" className={secondaryButton} onClick={() => load()} disabled={loading}>
            <RefreshCw size={15} />
            Actualizar
          </button>
          <button type="button" className={primaryButton} onClick={() => setEditor({ category: null })}>
            <Plus size={16} />
            Nueva categoría
          </button>
        </div>
      </div>

      {notice && (
        <Notice type={notice.type} onClose={() => setNotice(null)}>
          {notice.text}
        </Notice>
      )}

      {loading ? (
        <Spinner label="Cargando categorías…" />
      ) : loadError ? (
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
          <p className="mb-4 text-red-700">{loadError}</p>
          <button type="button" className={primaryButton} onClick={() => load()}>
            Reintentar
          </button>
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-600">
          Todavía no hay categorías. Crea la primera con "Nueva categoría".
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Slug</th>
                  <th className="px-4 py-3">Categoría padre</th>
                  <th className="px-4 py-3">Descripción</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-t border-gray-100 align-middle">
                    <td className="px-4 py-3 font-semibold text-gray-900">{category.name}</td>
                    <td className="px-4 py-3 text-gray-600">{category.slug}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {category.parent_id ? namesById[category.parent_id] ?? '—' : '—'}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-gray-600">
                      {category.description || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button type="button" className={smallButton} onClick={() => setEditor({ category })}>
                          <Pencil size={13} />
                          Editar
                        </button>
                        <button
                          type="button"
                          className={dangerButton}
                          onClick={() => handleDelete(category)}
                          disabled={deletingId === category.id}
                        >
                          <Trash2 size={13} />
                          {deletingId === category.id ? 'Eliminando…' : 'Eliminar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editor && (
        <Modal title={editor.category ? 'Editar categoría' : 'Nueva categoría'} onClose={closeEditor}>
          <CategoryForm
            key={editor.category?.id ?? 'nueva'}
            category={editor.category}
            categories={categories}
            onSubmit={handleSave}
            onCancel={closeEditor}
          />
        </Modal>
      )}
    </section>
  );
}