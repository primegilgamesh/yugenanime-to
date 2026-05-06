import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface State { [reviewId: string]: string[] } // reviewId -> usernames who liked

interface Ctx {
  isLiked: (reviewId: string) => boolean;
  toggleLike: (reviewId: string) => void;
  getCount: (reviewId: string, base?: number) => number;
}

const ReviewLikesContext = createContext<Ctx | null>(null);
const KEY = "yugen_home_review_likes";

export const ReviewLikesProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoggedIn } = useAuth();
  const [likes, setLikes] = useState<State>({});

  useEffect(() => {
    try { setLikes(JSON.parse(localStorage.getItem(KEY) || "{}")); } catch { setLikes({}); }
  }, []);

  const persist = (s: State) => { setLikes(s); localStorage.setItem(KEY, JSON.stringify(s)); };

  const isLiked = (id: string) => !!user && (likes[id] || []).includes(user.username);
  const getCount = (id: string, base = 0) => base + (likes[id]?.length || 0);
  const toggleLike = (id: string) => {
    if (!isLoggedIn || !user) { toast("Please login to like", { position: "top-right" }); return; }
    const arr = new Set(likes[id] || []);
    if (arr.has(user.username)) arr.delete(user.username); else arr.add(user.username);
    persist({ ...likes, [id]: [...arr] });
  };

  return <ReviewLikesContext.Provider value={{ isLiked, toggleLike, getCount }}>{children}</ReviewLikesContext.Provider>;
};

export const useReviewLikes = () => {
  const ctx = useContext(ReviewLikesContext);
  if (!ctx) throw new Error("useReviewLikes must be used within ReviewLikesProvider");
  return ctx;
};
