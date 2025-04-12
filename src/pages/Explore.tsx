
import React from "react";
import AppLayout from "../components/Layout/AppLayout";
import { Card, CardContent } from "../components/ui/card";
import { recommendationService } from "../services/recommendationService";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const outfits = recommendationService.getRecommendedOutfits(10);
  
  // Create outfit collections for exploration
  const occasionCollections = [
    { name: "Work Ready", outfits: outfits.filter(o => o.formality === "business casual") },
    { name: "Weekend Casual", outfits: outfits.filter(o => o.formality === "casual") },
    { name: "Evening Out", outfits: outfits.filter(o => o.formality === "smart casual" || o.formality === "formal") }
  ];
  
  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-charcoal">Explore</h1>
          <p className="text-gray-600 mt-1">Discover outfit ideas for any occasion</p>
        </header>
        
        <div className="space-y-8">
          {occasionCollections.map((collection) => (
            <div key={collection.name}>
              <h2 className="text-lg font-medium mb-3">{collection.name}</h2>
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4">
                  {collection.outfits.map((outfit) => (
                    <Card 
                      key={outfit.id} 
                      className="min-w-[200px] flex-shrink-0 cursor-pointer"
                      onClick={() => navigate(`/outfit/${outfit.id}`)}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-[3/4] relative">
                          <img 
                            src={outfit.items[0]?.imageUrl || "https://via.placeholder.com/300x400"} 
                            alt={outfit.occasion || "Outfit"} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                            <h3 className="text-white text-sm font-medium">
                              {outfit.occasion || "Outfit"}
                            </h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Explore;
