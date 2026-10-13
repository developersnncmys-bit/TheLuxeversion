"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { PRODUCTS, type Product } from "@/lib/content";

export type DrawerKind = "cart" | "wishlist" | "search" | "account" | null;

export type CartItem = {
  handle: string;
  qty: number;
};

export type User = {
  email: string;
  name?: string;
};

export type Address = {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  phone?: string;
};

export type Preferences = {
  language: "English";
  currency: "INR" | "USD" | "EUR" | "GBP";
};

const DEFAULT_PREFERENCES: Preferences = {
  language: "English",
  currency: "INR"
};

export type WrappingOption = "essential" | "classic";

export type CartExtras = {
  wrapping: WrappingOption;
  giftMessage: string; // empty string = no card
};

const DEFAULT_EXTRAS: CartExtras = {
  wrapping: "essential",
  giftMessage: ""
};

export type OrderStatus = "placed" | "cancelled" | "shipped" | "delivered";

export type OrderItem = {
  handle: string;
  name: string;
  image?: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  placedAt: string; // ISO
  status: OrderStatus;
  cancelledAt?: string;
  items: OrderItem[];
  extras: CartExtras;
  delivery: { method: "standard" | "express"; cost: number };
  payment: { method: "upi" | "card" | "netbanking" | "cod"; fee: number };
  contact: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shipping: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal: string;
    country: string;
  };
  subtotal: number;
  total: number;
  gst: number;
};

// What the caller passes to addOrder. The store fills in id/placedAt/status.
export type OrderDraft = Omit<Order, "id" | "placedAt" | "status">;

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  drawer: DrawerKind;
  user: User | null;
  addresses: Address[];
  preferences: Preferences;
  cartExtras: CartExtras;
  orders: Order[];

  openDrawer: (kind: DrawerKind) => void;
  closeDrawer: () => void;

  addToCart: (handle: string, qty?: number) => void;
  removeFromCart: (handle: string) => void;
  updateCartQty: (handle: string, qty: number) => void;
  clearCart: () => void;
  setCartExtras: (patch: Partial<CartExtras>) => void;

  toggleWishlist: (handle: string) => void;
  isInWishlist: (handle: string) => boolean;
  removeFromWishlist: (handle: string) => void;

  signIn: (email: string, name?: string) => void;
  signOut: () => void;

  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;

  updatePreferences: (patch: Partial<Preferences>) => void;

  placeOrder: (draft: OrderDraft) => Order;
  cancelOrder: (id: string) => void;
  orderById: (id: string) => Order | undefined;

  cartCount: number;
  cartSubtotal: number;

  productByHandle: (handle: string) => Product | undefined;
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "tlv:cart:v1";
const WISHLIST_KEY = "tlv:wishlist:v1";
const USER_KEY = "tlv:user:v1";
const ADDRESSES_KEY = "tlv:addresses:v1";
const PREFERENCES_KEY = "tlv:preferences:v1";
const EXTRAS_KEY = "tlv:cart-extras:v1";
const ORDERS_KEY = "tlv:orders:v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [preferences, setPreferences] = useState<Preferences>(DEFAULT_PREFERENCES);
  const [cartExtras, setCartExtrasState] = useState<CartExtras>(DEFAULT_EXTRAS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [drawer, setDrawer] = useState<DrawerKind>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once, client-side only.
  useEffect(() => {
    setCart(safeParse<CartItem[]>(localStorage.getItem(CART_KEY), []));
    setWishlist(safeParse<string[]>(localStorage.getItem(WISHLIST_KEY), []));
    setUser(safeParse<User | null>(localStorage.getItem(USER_KEY), null));
    setAddresses(safeParse<Address[]>(localStorage.getItem(ADDRESSES_KEY), []));
    setPreferences(
      safeParse<Preferences>(
        localStorage.getItem(PREFERENCES_KEY),
        DEFAULT_PREFERENCES
      )
    );
    setCartExtrasState(
      safeParse<CartExtras>(localStorage.getItem(EXTRAS_KEY), DEFAULT_EXTRAS)
    );
    setOrders(safeParse<Order[]>(localStorage.getItem(ORDERS_KEY), []));
    setHydrated(true);
  }, []);

  // Persist. Skip until after hydration so we don't wipe existing storage
  // with the empty initial state on the first render.
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  }, [addresses, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [preferences, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(EXTRAS_KEY, JSON.stringify(cartExtras));
  }, [cartExtras, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  const openDrawer = useCallback((kind: DrawerKind) => setDrawer(kind), []);
  const closeDrawer = useCallback(() => setDrawer(null), []);

  const addToCart = useCallback((handle: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.handle === handle);
      if (existing) {
        return prev.map((i) =>
          i.handle === handle ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { handle, qty }];
    });
  }, []);

  const removeFromCart = useCallback((handle: string) => {
    setCart((prev) => prev.filter((i) => i.handle !== handle));
  }, []);

  const updateCartQty = useCallback((handle: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.handle !== handle);
      return prev.map((i) => (i.handle === handle ? { ...i, qty } : i));
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const setCartExtras = useCallback((patch: Partial<CartExtras>) => {
    setCartExtrasState((prev) => ({ ...prev, ...patch }));
  }, []);

  const toggleWishlist = useCallback((handle: string) => {
    setWishlist((prev) =>
      prev.includes(handle)
        ? prev.filter((h) => h !== handle)
        : [...prev, handle]
    );
  }, []);

  const isInWishlist = useCallback(
    (handle: string) => wishlist.includes(handle),
    [wishlist]
  );

  const removeFromWishlist = useCallback((handle: string) => {
    setWishlist((prev) => prev.filter((h) => h !== handle));
  }, []);

  const productByHandle = useCallback(
    (handle: string) => PRODUCTS.find((p) => p.handle === handle),
    []
  );

  const signIn = useCallback((email: string, name?: string) => {
    setUser({ email: email.trim(), name: name?.trim() || undefined });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const addAddress = useCallback((address: Omit<Address, "id">) => {
    setAddresses((prev) => [
      ...prev,
      { ...address, id: `addr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` }
    ]);
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const updatePreferences = useCallback((patch: Partial<Preferences>) => {
    setPreferences((prev) => ({ ...prev, ...patch }));
  }, []);

  const placeOrder = useCallback((draft: OrderDraft): Order => {
    const id = `LV-${Date.now().toString().slice(-8)}`;
    const order: Order = {
      ...draft,
      id,
      placedAt: new Date().toISOString(),
      status: "placed"
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const cancelOrder = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id && o.status === "placed"
          ? { ...o, status: "cancelled", cancelledAt: new Date().toISOString() }
          : o
      )
    );
  }, []);

  const orderById = useCallback(
    (id: string) => orders.find((o) => o.id === id),
    [orders]
  );

  const cartCount = useMemo(
    () => cart.reduce((acc, i) => acc + i.qty, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((acc, i) => {
        const p = PRODUCTS.find((x) => x.handle === i.handle);
        return acc + (p?.price.inr ?? 0) * i.qty;
      }, 0),
    [cart]
  );

  const value: StoreState = {
    cart,
    wishlist,
    drawer,
    user,
    addresses,
    preferences,
    cartExtras,
    orders,
    openDrawer,
    closeDrawer,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    setCartExtras,
    toggleWishlist,
    isInWishlist,
    removeFromWishlist,
    signIn,
    signOut,
    addAddress,
    removeAddress,
    updatePreferences,
    placeOrder,
    cancelOrder,
    orderById,
    cartCount,
    cartSubtotal,
    productByHandle
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return ctx;
}
