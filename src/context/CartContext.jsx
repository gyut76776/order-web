import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

const addToCart = (item) => {
  setCart((prevCart) => {
    const existing = prevCart.find((p) => p.id === item.id);

    if (existing) {
      return prevCart.map((p) =>
        p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      );
    }

    return [
      ...prevCart,
      {
        ...item,
        quantity: 1,
        category: item.category   // <- ini ditambahkan
      }
    ];
  });
};


  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // 💡 pastikan selalu terdefinisi, walau cart kosong
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const updateQuantity = (id, newQty) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.id === id ? { ...item, quantity: Math.max(newQty, 1) } : item
      )
  );
};
const updateNote = (id, newNote) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, note: newNote } : item
    )
  );
};


  return (
    <CartContext.Provider
     value={{ cart, addToCart, removeFromCart, updateQuantity, updateNote, totalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
