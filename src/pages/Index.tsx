
import React, { useState, useEffect } from "react";
import AppLayout from "../components/Layout/AppLayout";
import OutfitCard from "../components/Outfit/OutfitCard";
import WeatherDisplay from "../components/Weather/WeatherDisplay";
import { recommendationService } from "../services/recommendationService";
import { Outfit } from "../models/types";
import { mockUser } from "../services/mockData";
import { useToast } from "../hooks/use-toast";

const Index = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const { toast } = useToast();
  
  // Initialize the recommendation service with the mock user
  useEffect(() => {
    recommendationService.setUser(mockUser);
    const recommendedOutfits = recommendationService.getRecommendedOutfits();
    setOutfits(recommendedOutfits);
  }, []);
  
  const handleSwipeLeft = (outfit: Outfit) => {
    // Dislike outfit
    recommendationService.rateOutfit(outfit.id, false);
    toast({
      title: "Not for you",
      description: "We'll recommend something different next time",
      duration: 2000
    });
    goToNextOutfit();
  };
  
  const handleSwipeRight = (outfit: Outfit) => {
    // Like outfit
    recommendationService.rateOutfit(outfit.id, true);
    toast({
      title: "Great choice!",
      description: "We've saved this to your likes",
      duration: 2000
    });
    goToNextOutfit();
  };
  
  const goToNextOutfit = () => {
    setCurrentOutfitIndex(prev => {
      // If we've gone through all outfits, reset to beginning
      if (prev >= outfits.length - 1) {
        toast({
          title: "All caught up!",
          description: "You've seen all our recommendations for now",
          duration: 3000
        });
        return 0;
      }
      return prev + 1;
    });
  };
  
  const currentOutfit = outfits[currentOutfitIndex];
  const weather = recommendationService.getWeather();
  
  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-charcoal">Wardrobe Wise</h1>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600">Today's suggestions</p>
            <WeatherDisplay weather={weather} />
          </div>
        </header>
        
        <div className="relative mt-4">
          {currentOutfit ? (
            <OutfitCard 
              outfit={currentOutfit}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ) : (
            <div className="text-center py-20 bg-white rounded-lg shadow">
              <p>No outfit recommendations available.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
