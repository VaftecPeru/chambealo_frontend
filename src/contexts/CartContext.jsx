
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('chambealo_cart');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('chambealo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    const productId = product.product_id ?? product.id;
    const requestedQuantity = Math.floor(Number(quantity));

    if (productId == null || !Number.isFinite(requestedQuantity) || requestedQuantity < 1) {
      console.error('Producto o cantidad inválida:', product);
      return;
    }

    const rawStock = product.stock ?? product.stock_quantity;
    const stock = rawStock == null ? null : Number(rawStock);

    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => String(item.id) === String(productId)
      );

      const existingQuantity = existingItem?.quantity ?? 0;
      const maxStock = Number.isFinite(stock) ? Math.max(0, stock) : null;

      if (maxStock !== null && existingQuantity >= maxStock) {
        return prevItems;
      }

      const newQuantity = maxStock === null
        ? existingQuantity + requestedQuantity
        : Math.min(existingQuantity + requestedQuantity, maxStock);

      if (existingItem) {
        return prevItems.map(item =>
          String(item.id) === String(productId)
            ? {
                ...item,
                quantity: newQuantity,
                stock: maxStock,
                image: product.image_url ?? item.image,
                category: product.category?.name ?? item.category
              }
            : item
        );
      }

      if (newQuantity < 1) return prevItems;

      return [...prevItems, {
        id: productId,
        name: product.name ?? product.nombre ?? 'Producto',
        price: Number(product.price ?? product.precio ?? 0),
        image: product.image_url ?? product.img1 ?? product.image ?? product.imagenes?.[0],
        category: product.category?.name ?? product.category_name ?? 'General',
        stock: maxStock,
        quantity: newQuantity
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => String(item.id) !== String(productId))
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (String(item.id) !== String(productId)) return item;

        const stock = item.stock == null ? null : Number(item.stock);

        if (stock !== null && Number.isFinite(stock) && item.quantity >= stock) {
          return item;
        }

        return { ...item, quantity: item.quantity + 1 };
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        String(item.id) === String(productId) && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartItemsCount,
    getCartTotal,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return context;
};
