
import React, { useState } from "react";
import { Heart, X, Sun, Cloud, CloudRain, ThermometerSun } from "lucide-react";
import { Outfit } from "../../models/types";
import { motion } from "framer-motion";

interface OutfitCardProps {
  outfit: Outfit;
  onSwipeLeft: (outfit: Outfit) => void;
  onSwipeRight: (outfit: Outfit) => void;
}

const OutfitCardAnimated: React.FC<OutfitCardProps> = ({ outfit, onSwipeLeft, onSwipeRight }) => {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  
  const handleSwipeLeft = () => {
    setSwipeDirection("left");
    setTimeout(() => onSwipeLeft(outfit), 300);
  };
  
  const handleSwipeRight = () => {
    setSwipeDirection("right");
    setTimeout(() => onSwipeRight(outfit), 300);
  };
  
  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x < 0) {
        handleSwipeLeft();
      } else {
        handleSwipeRight();
      }
    }
  };
  
  // Get the main clothing item image to display
  const mainItem = outfit.items[0];
  const mainImageUrl = mainItem?.imageUrl || "https://via.placeholder.com/500x700?text=No+Image";
  
  // Determine weather icon
  const weatherIcon = () => {
    if (!outfit.weather || outfit.weather.length === 0) return null;
    
    const weatherType = outfit.weather[0];
    switch (weatherType) {
      case "sunny":
        return <Sun size={16} />;
      case "partly cloudy":
      case "cloudy":
        return <Cloud size={16} />;
      case "rainy":
        return <CloudRain size={16} />;
      default:
        return <ThermometerSun size={16} />;
    }
  };

  return (
    <motion.div
      className="outfit-card max-w-sm w-full mx-auto overflow-hidden"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{
        x: swipeDirection === "left" ? -1000 : swipeDirection === "right" ? 1000 : 0,
        rotate: swipeDirection === "left" ? -20 : swipeDirection === "right" ? 20 : 0,
        opacity: swipeDirection ? 0 : 1
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20
      }}
      style={{ x: dragX }}
    >
      <div className="relative">
        <motion.div
          className="overflow-hidden"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={mainImageUrl} 
            alt={outfit.occasion || "Outfit"} 
            className="w-full h-[500px] object-cover"
          />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-white">
            <h3 className="text-xl font-semibold font-display organic-text">
              {outfit.occasion || "Everyday Look"}
            </h3>
            <div className="flex items-center mt-1">
              {weatherIcon()}
              <span className="ml-1 text-sm">{outfit.formality}</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="p-4 bg-white dark:bg-charcoal/80 backdrop-blur-lg transition-colors duration-300">
        <div className="flex flex-wrap gap-2 mb-3">
          {outfit.items.map((item, index) => (
            <motion.span 
              key={item.id}
              className="text-xs bg-muted px-2 py-1 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {item.name}
            </motion.span>
          ))}
        </div>
        
        <div className="flex justify-around mt-4">
          <motion.button 
            onClick={handleSwipeLeft}
            className="bg-muted text-charcoal p-3 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Dislike outfit"
          >
            <X size={24} />
          </motion.button>
          <motion.button 
            onClick={handleSwipeRight}
            className="bg-terracotta text-white p-3 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Like outfit"
          >
            <Heart size={24} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default OutfitCardAnimated;
