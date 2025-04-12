
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
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
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
          <TabsList className="w-full mb-4 grid grid-cols-6 bg-background/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            <TabsTrigger value="tops" className="text-xs sm:text-sm">Tops</TabsTrigger>
            <TabsTrigger value="bottoms" className="text-xs sm:text-sm">Bottoms</TabsTrigger>
            <TabsTrigger value="dresses" className="text-xs sm:text-sm">Dresses</TabsTrigger>
            <TabsTrigger value="outerwear" className="text-xs sm:text-sm">Outer</TabsTrigger>
            <TabsTrigger value="footwear" className="text-xs sm:text-sm">Shoes</TabsTrigger>
          </TabsList>
          
          <div className="min-h-[300px]">
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
                  ))
                ) : (
                  <p className="col-span-2 text-center py-8 text-gray-500">No items found</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="tops" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {tops.length > 0 ? (
                  tops.map(item => (
                    <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
                  ))
                ) : (
                  <p className="col-span-2 text-center py-8 text-gray-500">No tops found</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="bottoms" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {bottoms.length > 0 ? (
                  bottoms.map(item => (
                    <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
                  ))
                ) : (
                  <p className="col-span-2 text-center py-8 text-gray-500">No bottoms found</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="dresses" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {dresses.length > 0 ? (
                  dresses.map(item => (
                    <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
                  ))
                ) : (
                  <p className="col-span-2 text-center py-8 text-gray-500">No dresses found</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="outerwear" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {outerwear.length > 0 ? (
                  outerwear.map(item => (
                    <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
                  ))
                ) : (
                  <p className="col-span-2 text-center py-8 text-gray-500">No outerwear found</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="footwear" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {footwear.length > 0 ? (
                  footwear.map(item => (
                    <ClothingItem key={item.id} item={item} onClick={handleItemClick} />
                  ))
                ) : (
                  <p className="col-span-2 text-center py-8 text-gray-500">No footwear found</p>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Wardrobe;
