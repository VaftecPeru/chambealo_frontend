# Integración frontend CHAMBEALO (18/11/2026)

Ramas consolidadas: `feature/rodolfo-C-022` + `feature/aaron-C-016` (que contiene la integración del catálogo de Julio).

## Resolución de conflictos
- `App.jsx`: conservar panel administrativo de Aarón y estados de retorno PayPal de Rodolfo.
- `CartContext.jsx`: conservar validación de stock, ids mixtos y limpieza del carrito tras pago confirmado de Rodolfo.
- `productService.js`: conservar carga paginada de catálogo de Rodolfo. El componente `Products.jsx` acepta arreglo, pero no el objeto `{success, data, meta}` del servicio anterior de Aarón, que dejaba el catálogo vacío.
- `Products.jsx`: versión de Aarón con nombres de marcas normalizados para los filtros.
- `NavbarHeader.jsx`, interfaz del panel y servicios de administración: versión de Aarón.

## Gates pendientes
- CI: `npm ci`, `npm run lint`, `npm run build`.
- E2E en entorno aislado: registro/login, listado, stock, carrito, orden, PayPal Sandbox, retorno positivo/fallido/cancelado y auditoría de inventario.
- No hacer despliegue a producción ni cambios en `main` sin autorización.
