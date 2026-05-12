import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('freshmart_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('freshmart_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('freshmart_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('freshmart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('freshmart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('freshmart_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity = 1) => {
    let isUpdate = false;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        isUpdate = true;
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    
    if (isUpdate) {
      toast.success(`Updated ${product.name} quantity!`);
    } else {
      toast.success(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find(i => i.id === productId);
      if (item) {
        // We can't easily toast here without knowing the name, 
        // but we can do it after the state update if we find the item first.
      }
      return prevCart.filter((item) => item.id !== productId);
    });
    toast.error(`Item removed from cart`);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const toggleWishlist = (product) => {
    let isAdding = false;
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.id === product.id);
      if (exists) {
        isAdding = false;
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      isAdding = true;
      return [...prevWishlist, product];
    });

    if (isAdding) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.error(`${product.name} removed from wishlist`);
    }
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      status: 'Processing'
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    toast.success('Order placed successfully!');
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        addOrder,
        cartTotal,
        cartCount,
        orders,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
