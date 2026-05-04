import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface UserReview {
  id: string;
  slug: string;
  user: string;
  avatar?: string;
  text: string;
  likes: number;
  createdAt: number;
}

interface ReviewsContextType {
  getReviewsForAnime: (slug: string) => UserReview[];
  addReview: (slug: string, user: string, text: string, avatar?: string) => void;
  removeReview: (id: string) => void;
}

const ReviewsContext = createContext<ReviewsContextType | null>(null);
const KEY = "yugen_user_reviews";

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    try { setReviews(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { setReviews([]); }
  }, []);

  const persist = (next: UserReview[]) => {
    setReviews(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const getReviewsForAnime = (slug: string) =>
    reviews.filter((r) => r.slug === slug).sort((a, b) => b.createdAt - a.createdAt);

  const addReview = (slug: string, user: string, text: string, avatar?: string) => {
    const r: UserReview = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, slug, user, avatar, text, likes: 0, createdAt: Date.now() };
    persist([r, ...reviews]);
  };

  const removeReview = (id: string) => persist(reviews.filter((r) => r.id !== id));

  return (
    <ReviewsContext.Provider value={{ getReviewsForAnime, addReview, removeReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
};
