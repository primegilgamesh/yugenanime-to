import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ListProvider } from "@/contexts/ListContext";
import Home from "./pages/Home";
import AnimePage from "./pages/anime-archive/AnimePage";
import EpisodePlayerPage from "./pages/anime-archive/EpisodePlayerPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Trending from "./pages/Trending";
import Recents from "./pages/Recents";
import Discover from "./pages/Discover";
import MyList from "./pages/MyList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ListProvider>
          <Toaster />
          <Sonner position="top-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:slug" element={<AnimePage />} />
              <Route path="/anime/:slug/watch/:episode" element={<EpisodePlayerPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/recents" element={<Recents />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ListProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
