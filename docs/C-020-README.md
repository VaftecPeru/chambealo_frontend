# C-020 - Carrito de compras

## Descripción

Se implementaron y probaron las funcionalidades principales del carrito de compras de Chambealo, utilizando React y el contexto global CartContext.

El carrito permite agregar productos del catálogo, modificar cantidades, eliminar productos y consultar el total de la compra.

## Funcionalidades implementadas

- Agregar productos al carrito desde el catálogo.
- Mostrar nombre, imagen, precio y cantidad de cada producto.
- Aumentar y disminuir las cantidades.
- Evitar que la cantidad supere el stock disponible informado por el catálogo.
- Eliminar productos del carrito.
- Calcular subtotales y total de la compra.
- Actualizar el contador de productos.
- Conservar el carrito al actualizar la página mediante localStorage.
- Acceder al checkout desde el carrito.

## Archivos principales

- src/components/Cart.jsx: interfaz del carrito, controles de cantidad y resumen de compra.
- src/contexts/CartContext.jsx: administración de productos, cantidades, stock y persistencia.

## Integración con Laravel

El carrito utiliza los productos obtenidos desde el catálogo conectado a la API de Laravel.

El backend cuenta con validaciones para comprobar disponibilidad, cantidades y precios al crear pedidos.

La prueba completa de creación de pedidos autenticados queda pendiente de verificación.

## Pruebas realizadas

- Agregar uno o varios productos.
- Aumentar y disminuir cantidades.
- Comprobar límites de stock por producto.
- Eliminar productos y actualizar el total.
- Actualizar la página y comprobar que se conserve el carrito.
- Ejecutar npm run build correctamente.
- Ejecutar git diff --check sin errores.

## Consideraciones

- Los productos del carrito se almacenan en localStorage bajo la clave chambealo_cart.
- El stock mostrado en React corresponde a los datos recibidos del catálogo y debe volver a validarse en el servidor al crear el pedido.
- El envío y los descuentos se muestran actualmente con valor cero.
- La aplicación de cupones todavía no está conectada a una validación funcional.
- La integración completa del pago con PayPal corresponde a la C-021.

## Estado

Funcionalidad principal del carrito implementada y probada localmente.

Pendiente: prueba integrada de creación de pedido autenticado y entrega al equipo.
