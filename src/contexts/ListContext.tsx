import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

export type ListCategory = "plan-to-watch" | "watching" | "completed" | "dropped";

interface ListItem {
  slug: string;
  title: string;
  cover: string;
  category: ListCategory;
  addedAt: number;
}

interface FavoriteItem {
  slug: string;
  title: string;
  cover: string;
  addedAt: number;
}

interface ListContextType {
  listItems: ListItem[];
  favorites: FavoriteItem[];
  addToList: (slug: string, title: string, cover: string, category: ListCategory) => void;
  removeFromList: (slug: string) => void;
  getListCategory: (slug: string) => ListCategory | null;
  toggleFavorite: (slug: string, title: string, cover: string) => boolean;
  isFavorited: (slug: string) => boolean;
}

const ListContext = createContext<ListContextType | null>(null);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const storageKey = user ? `yugen_list_${user.email}` : null;
  const favKey = user ? `yugen_favs_${user.email}` : null;

  useEffect(() => {
    if (storageKey) {
      try { setListItems(JSON.parse(localStorage.getItem(storageKey) || "[]")); } catch { setListItems([]); }
    } else { setListItems([]); }
    if (favKey) {
      try { setFavorites(JSON.parse(localStorage.getItem(favKey) || "[]")); } catch { setFavorites([]); }
    } else { setFavorites([]); }
  }, [storageKey, favKey]);

  const persist = (items: ListItem[], favs: FavoriteItem[]) => {
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(items));
    if (favKey) localStorage.setItem(favKey, JSON.stringify(favs));
  };

  const addToList = (slug: string, title: string, cover: string, category: ListCategory) => {
    setListItems((prev) => {
      const filtered = prev.filter((i) => i.slug !== slug);
      const next = [...filtered, { slug, title, cover, category, addedAt: Date.now() }];
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const removeFromList = (slug: string) => {
    setListItems((prev) => {
      const next = prev.filter((i) => i.slug !== slug);
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  const getListCategory = (slug: string): ListCategory | null => {
    return listItems.find((i) => i.slug === slug)?.category || null;
  };

  const toggleFavorite = (slug: string, title: string, cover: string): boolean => {
    const exists = favorites.some((f) => f.slug === slug);
    setFavorites((prev) => {
      const next = exists ? prev.filter((f) => f.slug !== slug) : [...prev, { slug, title, cover, addedAt: Date.now() }];
      if (favKey) localStorage.setItem(favKey, JSON.stringify(next));
      return next;
    });
    return !exists;
  };

  const isFavorited = (slug: string) => favorites.some((f) => f.slug === slug);

  return (
    <ListContext.Provider value={{ listItems, favorites, addToList, removeFromList, getListCategory, toggleFavorite, isFavorited }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error("useList must be used within ListProvider");
  return ctx;
};
