import create from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  basketId: string | null;
  itemCount: number;
  setBasketId: (id: string) => void;
  setItemCount: (count: number) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      basketId: null,
      itemCount: 0,
      setBasketId: (id) => set({ basketId: id }),
      setItemCount: (count) => set({ itemCount: count }),
    }),
    {
      name: 'cart-storage',
    }
  )
);