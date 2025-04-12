
import React, { useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import ClothingItem from "../components/Wardrobe/ClothingItem";
import { recommendationService } from "../services/recommendationService";
import { ClothingItem as ClothingItemType } from "../models/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Search } from "lucide-react";

const Wardrobe = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allItems = recommendationService.getAllClothingItems();
  
  // Filter items based on search query
  const filteredItems = allItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Group items by type
  const tops = filteredItems.filter(item => item.type === "top");
  const bottoms = filteredItems.filter(item => item.type === "bottom");
  const dresses = filteredItems.filter(item => item.type === "dress");
  const outerwear = filteredItems.filter(item => item.type === "outerwear");
  const footwear = filteredItems.filter(item => item.type === "footwear");
  
  const handleItemClick = (item: ClothingItemType) => {
    // In the future, this would show a detailed view of the item
    console.log("Item clicked:", item);
  };
  
  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-charcoal">My Wardrobe</h1>
          
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your wardrobe..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full mb-4 grid grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tops">Tops</TabsTrigger>
            <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
            <TabsTrigger value="dresses">Dresses</TabsTrigger>
            <TabsTrigger value="outerwear">Outer</TabsTrigger>
            <TabsTrigger value="footwear">Shoes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.map(item => (
                <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tops">
            <div className="grid grid-cols-2 gap-4">
              {tops.map(item => (
                <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bottoms">
            <div className="grid grid-cols-2 gap-4">
              {bottoms.map(item => (
                <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="dresses">
            <div className="grid grid-cols-2 gap-4">
              {dresses.map(item => (
                <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="outerwear">
            <div className="grid grid-cols-2 gap-4">
              {outerwear.map(item => (
                <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="footwear">
            <div className="grid grid-cols-2 gap-4">
              {footwear.map(item => (
                <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Wardrobe;
