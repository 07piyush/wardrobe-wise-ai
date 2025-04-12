
import React, { useState } from "react";
import { Heart, X, Sun, Cloud, CloudRain, ThermometerSun } from "lucide-react";
import { Outfit } from "../../models/types";

interface OutfitCardProps {
  outfit: Outfit;
  onSwipeLeft: (outfit: Outfit) => void;
  onSwipeRight: (outfit: Outfit) => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onSwipeLeft, onSwipeRight }) => {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  
  // Handle drag (for desktop)
  const [dragStart, setDragStart] = useState<number | null>(null);
  
  const handleSwipeLeft = () => {
    setSwipeDirection("left");
    setTimeout(() => onSwipeLeft(outfit), 300);
  };
  
  const handleSwipeRight = () => {
    setSwipeDirection("right");
    setTimeout(() => onSwipeRight(outfit), 300);
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
  };
  
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStart === null) return;
    
    const dragDistance = e.clientX - dragStart;
    if (Math.abs(dragDistance) > 100) {
      if (dragDistance < 0) {
        handleSwipeLeft();
      } else {
        handleSwipeRight();
      }
    }
    
    setDragStart(null);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    // Add any dragging effects if needed
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
    <div
      className={`outfit-card max-w-sm w-full mx-auto ${
        swipeDirection === "left" ? "animate-swipe-left" 
        : swipeDirection === "right" ? "animate-swipe-right" 
        : ""
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="relative">
        <img 
          src={mainImageUrl} 
          alt={outfit.occasion || "Outfit"} 
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="text-white">
            <h3 className="text-xl font-semibold">{outfit.occasion || "Everyday Look"}</h3>
            <div className="flex items-center mt-1">
              {weatherIcon()}
              <span className="ml-1 text-sm">{outfit.formality}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex flex-wrap gap-2 mb-3">
          {outfit.items.map((item) => (
            <span 
              key={item.id}
              className="text-xs bg-muted px-2 py-1 rounded-full"
            >
              {item.name}
            </span>
          ))}
        </div>
        
        <div className="flex justify-around mt-4">
          <button 
            onClick={handleSwipeLeft}
            className="bg-muted text-charcoal p-3 rounded-full"
            aria-label="Dislike outfit"
          >
            <X size={24} />
          </button>
          <button 
            onClick={handleSwipeRight}
            className="bg-terracotta text-white p-3 rounded-full"
            aria-label="Like outfit"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
