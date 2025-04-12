
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { StrictMode } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import FancyPageTransition from "./components/Animation/FancyPageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Wardrobe from "./pages/Wardrobe";
import AddItem from "./pages/AddItem";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import OutfitDetail from "./pages/OutfitDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1
    }
  }
});

// AnimatedRoutes component to handle route animations
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <FancyPageTransition location={location.pathname}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/outfit/:id" element={<OutfitDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </FancyPageTransition>
  );
};

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;
