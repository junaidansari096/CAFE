import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1, customizations = {}) => {
    setCartItems(prev => {
      const existItem = prev.find(x => x._id === product._id && JSON.stringify(x.customizations) === JSON.stringify(customizations));
      const names = Array(qty).fill('');
      if (existItem) {
        const newQty = existItem.qty + qty;
        return prev.map(x => x._id === existItem._id && JSON.stringify(x.customizations) === JSON.stringify(customizations) 
          ? { ...x, qty: newQty, assignedPersonnel: [...(x.assignedPersonnel || []), ...names] } : x);
      }
      return [...prev, { ...product, qty, customizations, assignedPersonnel: names }];
    });
  };

  const removeFromCart = (id, customizations) => {
    setCartItems(prev => prev.filter(x => !(x._id === id && JSON.stringify(x.customizations) === JSON.stringify(customizations))));
  };

  const updateQty = (id, qty, customizations) => {
    setCartItems(prev => prev.map(x => {
      if (x._id === id && JSON.stringify(x.customizations) === JSON.stringify(customizations)) {
        const personnel = [...(x.assignedPersonnel || [])];
        if (qty > personnel.length) {
          personnel.push(...Array(qty - personnel.length).fill(''));
        } else if (qty < personnel.length) {
          personnel.splice(qty);
        }
        return { ...x, qty, assignedPersonnel: personnel };
      }
      return x;
    }));
  };

  const updatePersonnelName = (id, customizations, index, name) => {
    setCartItems(prev => prev.map(x => {
      if (x._id === id && JSON.stringify(x.customizations) === JSON.stringify(customizations)) {
        const personnel = [...(x.assignedPersonnel || [])];
        personnel[index] = name;
        return { ...x, assignedPersonnel: personnel };
      }
      return x;
    }));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, updatePersonnelName, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
