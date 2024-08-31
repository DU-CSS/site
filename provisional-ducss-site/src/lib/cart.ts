import { create } from "zustand";
import { fetchProduct } from "@/lib/stripe";
import { StripeProduct } from "@/lib/store";

export interface StoreCartItem {
  product: StripeProduct;
  quantity: number;
}

interface StoreCartState {
  items: StoreCartItem[];
  lock: boolean; // Lock flag
  add: (productId: string, quantity: number) => Promise<void>;
  remove: (productId: string, quantity: number) => Promise<void>;
  clear: () => void;
}

export type StripeCheckoutItem = [string, string, number];

export const storeCartItemToStripeCheckoutItem = (item: StoreCartItem): StripeCheckoutItem => [
  item.product.productId,
  item.product.priceId,
  item.quantity
];

export const useCartStore = create<StoreCartState>((set, get) => ({
  items: [],
  lock: false,
  add: async (productId: string, quantity: number) => {
    if (get().lock) return; // Prevent concurrent updates

    set({ lock: true }); // Acquire lock

    try {
      const state = get();
      const itemIndex = state.items.findIndex(item => item.product.productId === productId);

      if (itemIndex !== -1) {
        // Update existing item quantity
        set(state => {
          const updatedItems = [...state.items];
          updatedItems[itemIndex].quantity += quantity;
          return { items: updatedItems };
        });
      } else {
        // Fetch the product only if it's not already in the cart
        const product = await fetchProduct(productId);
        if (!product) return; // Exit if the product is not found

        set(state => ({
          items: [...state.items, { product, quantity }],
        }));
      }
    } finally {
      set({ lock: false }); // Release lock
    }
  },
  remove: async (productId: string, quantity: number) => {
    if (get().lock) return; // Prevent concurrent updates

    set({ lock: true }); // Acquire lock

    try {
      set(state => {
        const itemIndex = state.items.findIndex(item => item.product.productId === productId);
        if (itemIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[itemIndex].quantity -= quantity;
          if (updatedItems[itemIndex].quantity <= 0) {
            updatedItems.splice(itemIndex, 1);
          }
          return { items: updatedItems };
        }
        return state;
      });
    } finally {
      set({ lock: false }); // Release lock
    }
  },
  clear: () => set({ items: [] }),
}));
