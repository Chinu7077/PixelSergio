import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PokemonGoJourney from "./pages/PokemonGoJourney";
import { Map, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Floating Journey Button Component
const FloatingJourneyButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show on the journey page itself
  if (location.pathname === '/pokemon-go-journey') return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => navigate('/pokemon-go-journey')}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
            size="icon"
          >
            <div className="relative">
              <Map className="h-8 w-8 text-white" />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-gray-900 text-white border-gray-700">
          <p className="font-semibold">My Pokémon GO Journey</p>
          <p className="text-xs opacity-80">Click to view your journey!</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const queryClient = new QueryClient();

// App Content with Floating Button
const AppContent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pokemon-go-journey" element={<PokemonGoJourney />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingJourneyButton />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
