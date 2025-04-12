
import React from "react";
import { ClothingItem as ClothingItemType } from "../../models/types";

interface ClothingItemProps {
  item: ClothingItemType;
  onClick?: (item: ClothingItemType) => void;
}

const ClothingItem: React.FC<ClothingItemProps> = ({ item, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
      onClick={handleClick}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-2">
        <h4 className="text-sm font-medium truncate">{item.name}</h4>
        <div className="flex items-center mt-1">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: item.color }}
            aria-label={`Color: ${item.color}`}
          />
          <span className="text-xs text-gray-600 capitalize">{item.formality}</span>
        </div>
      </div>
    </div>
  );
};

export default ClothingItem;
