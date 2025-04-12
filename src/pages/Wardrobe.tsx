
import React, { useState } from "react";
import AppLayout from "../components/Layout/AppLayout";
import ClothingItem from "../components/Wardrobe/ClothingItem";
import { recommendationService } from "../services/recommendationService";
import { ClothingItem as ClothingItemType } from "../models/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };
  
  const renderItems = (items: ClothingItemType[]) => {
    if (items.length === 0) {
      return (
        <div className="col-span-2 flex flex-col items-center justify-center py-12 text-gray-500">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mb-2">No items found</p>
            <p className="text-xs">Try a different search term or category</p>
          </motion.div>
        </div>
      );
    }
    
    return items.map((item, index) => (
      <motion.div
        key={item.id}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
      >
        <ClothingItem item={item} onClick={handleItemClick} />
      </motion.div>
    ));
  };
  
  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        <motion.header 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-charcoal dark:text-white">My Wardrobe</h1>
          
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search your wardrobe..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/70 dark:bg-charcoal/70 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.header>
        
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
                {renderItems(filteredItems)}
              </div>
            </TabsContent>
            
            <TabsContent value="tops" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {renderItems(tops)}
              </div>
            </TabsContent>
            
            <TabsContent value="bottoms" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {renderItems(bottoms)}
              </div>
            </TabsContent>
            
            <TabsContent value="dresses" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {renderItems(dresses)}
              </div>
            </TabsContent>
            
            <TabsContent value="outerwear" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {renderItems(outerwear)}
              </div>
            </TabsContent>
            
            <TabsContent value="footwear" className="mt-0">
              <div className="grid grid-cols-2 gap-4">
                {renderItems(footwear)}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Wardrobe;
