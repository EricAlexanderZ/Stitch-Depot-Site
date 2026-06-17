"use client";

import { createContext, useCallback, useContext, useState } from "react";

export type CartItem = {
  style: string;
  color: string;
  stitch: string;
  placements: string[];
  quantity: number;
  total: number;
  perHat: number;
  previewImage?: string;
};

type CartContextValue = {
  item: CartItem | null;
  total: number;
  setItem: (item: CartItem) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue>({
  item: null,
  total: 0,
  setItem: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [item, setItemState] = useState<CartItem | null>(null);

  const setItem = useCallback((i: CartItem) => {
    setItemState(i);
  }, []);

  const clearCart = useCallback(() => {
    setItemState(null);
  }, []);

  return (
    <CartContext.Provider value={{ item, total: item?.total ?? 0, setItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
