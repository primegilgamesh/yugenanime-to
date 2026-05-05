import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface UserReview {
  id: string;
  slug: string;
  user: string;
  avatar?: string;
  text: string;
  likes: number;
  dislikes: number;
  likedBy?: string[];
  dislikedBy?: string[];
  createdAt: number;
}

interface ReviewsContextType {
  getReviewsForAnime: (slug: string) => UserReview[];
  addReview: (slug: string, user: string, text: string, avatar?: string) => void;
  removeReview: (id: string) => void;
  voteReview: (id: string, voter: string, kind: "like" | "dislike") => void;
}

const ReviewsContext = createContext<ReviewsContextType | null>(null);
const KEY = "yugen_user_reviews";

export const ReviewsProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    try {
      const raw: UserReview[] = JSON.parse(localStorage.getItem(KEY) || "[]");
      setReviews(raw.map((r) => ({ ...r, dislikes: r.dislikes ?? 0, likedBy: r.likedBy ?? [], dislikedBy: r.dislikedBy ?? [] })));
    } catch { setReviews([]); }
  }, []);

  const persist = (next: UserReview[]) => {
    setReviews(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const getReviewsForAnime = (slug: string) =>
    reviews.filter((r) => r.slug === slug).sort((a, b) => b.createdAt - a.createdAt);

  const addReview = (slug: string, user: string, text: string, avatar?: string) => {
    const r: UserReview = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, slug, user, avatar, text, likes: 0, dislikes: 0, likedBy: [], dislikedBy: [], createdAt: Date.now() };
    persist([r, ...reviews]);
  };

  const removeReview = (id: string) => persist(reviews.filter((r) => r.id !== id));

  const voteReview = (id: string, voter: string, kind: "like" | "dislike") => {
    persist(reviews.map((r) => {
      if (r.id !== id) return r;
      const liked = new Set(r.likedBy || []);
      const disliked = new Set(r.dislikedBy || []);
      if (kind === "like") {
        if (liked.has(voter)) liked.delete(voter);
        else { liked.add(voter); disliked.delete(voter); }
      } else {
        if (disliked.has(voter)) disliked.delete(voter);
        else { disliked.add(voter); liked.delete(voter); }
      }
      return { ...r, likedBy: [...liked], dislikedBy: [...disliked], likes: liked.size, dislikes: disliked.size };
    }));
  };

  return (
    <ReviewsContext.Provider value={{ getReviewsForAnime, addReview, removeReview, voteReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
};
