
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import { Button } from "../components/ui/button";
import { ArrowLeft, Heart, Share2, Tag } from "lucide-react";
import { recommendationService } from "../services/recommendationService";
import { useToast } from "../hooks/use-toast";

const OutfitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get the outfit by id
  const outfit = id ? recommendationService.getOutfitById(id) : undefined;
  
  // Handle if outfit is not found
  if (!outfit) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-xl font-semibold">Outfit not found</h2>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const handleLike = () => {
    recommendationService.rateOutfit(outfit.id, true);
    toast({
      title: "Added to favorites",
      description: "This outfit has been added to your favorites",
      duration: 2000
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share feature",
      description: "This feature is not available in the demo",
      duration: 2000
    });
  };
  
  return (
    <AppLayout showNav={false}>
      <div className="relative">
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-10 bg-white/80 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        
        {/* Main image */}
        <div className="h-[60vh]">
          <img 
            src={outfit.items[0].imageUrl} 
            alt={outfit.occasion || "Outfit"}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Outfit details */}
        <div className="bg-white p-6 min-h-[40vh] rounded-t-3xl -mt-10 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{outfit.occasion || "Outfit"}</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleLike}>
                <Heart size={20} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 size={20} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              <div className="space-y-3">
                {outfit.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-lg overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Style Details</h3>
              <div className="flex flex-wrap gap-2">
                {outfit.formality && (
                  <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {outfit.formality}
                  </div>
                )}
                {outfit.season.map((season) => (
                  <div key={season} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {season}
                  </div>
                ))}
                {outfit.weather && outfit.weather.map((condition) => (
                  <div key={condition} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {condition}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <Button className="w-full bg-terracotta hover:bg-terracotta/80">
                <Tag className="mr-2" size={16} />
                Save to Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default OutfitDetail;
