
import React, { useState, useEffect } from "react";
import AppLayout from "../components/Layout/AppLayout";
import OutfitCardAnimated from "../components/Outfit/OutfitCardAnimated";
import WeatherDisplay from "../components/Weather/WeatherDisplay";
import { recommendationService } from "../services/recommendationService";
import { Outfit } from "../models/types";
import { mockUser } from "../services/mockData";
import { useToast } from "../hooks/use-toast";
import KineticTypography from "../components/Animation/KineticTypography";
import ScrollReveal from "../components/Animation/ScrollReveal";
import { motion } from "framer-motion";

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
      <motion.div 
        className="max-w-md mx-auto px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <h1 className="text-2xl font-bold">
              <KineticTypography text="Wardrobe Wise" className="text-charcoal dark:text-cream" />
            </h1>
          </motion.div>
          
          <ScrollReveal threshold={0.1} delay={0.3}>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-600 dark:text-gray-300">Today's suggestions</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <WeatherDisplay weather={weather} />
              </motion.div>
            </div>
          </ScrollReveal>
        </header>
        
        <ScrollReveal threshold={0.1} delay={0.4}>
          <div className="relative mt-4">
            {currentOutfit ? (
              <OutfitCardAnimated 
                outfit={currentOutfit}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            ) : (
              <div className="text-center py-20 bg-white dark:bg-charcoal/40 rounded-lg shadow glassmorphism">
                <p>No outfit recommendations available.</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </motion.div>
    </AppLayout>
  );
};

export default Index;
