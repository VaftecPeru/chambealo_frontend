import { useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';

// Piezas visuales pequeñas que comparten las pantallas del panel (C-016).

const NOTICE_STYLES = {
  success: 'border-green-300 bg-green-50 text-green-800',
  error: 'border-red-300 bg-red-50 text-red-700',
  info: 'border-blue-300 bg-blue-50 text-blue-800',
};

const BADGE_STYLES = {
  green: 'bg-green-100 text-green-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-700',
};

export function Notice({ type = 'info', children, onClose }) {
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`mb-4 flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${NOTICE_STYLES[type]}`}
    >
      <div>{children}</div>
      {onClose && (
        <button type="button" onClick={onClose} className="shrink-0 font-semibold underline">
          Cerrar
        </button>
      )}
    </div>
  );
}

export function Badge({ tone = 'gray', children }) {
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}

export function Field({ id, label, required, error, hint, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function Spinner({ label = 'Cargando…' }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-gray-600" role="status">
      <RefreshCw size={18} className="animate-spin" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-modal-title"
        className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 id="admin-modal-title" className="text-lg font-bold text-gray-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}