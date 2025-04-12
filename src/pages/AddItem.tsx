
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Camera, Upload } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { ClothingItem, ClothingType, Formality, Season } from "../models/types";
import { recommendationService } from "../services/recommendationService";

const AddItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [type, setType] = useState<ClothingType>("top");
  const [color, setColor] = useState("");
  const [formality, setFormality] = useState<Formality>("casual");
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80");
  
  // Toggle season selection
  const toggleSeason = (season: Season) => {
    if (seasons.includes(season)) {
      setSeasons(seasons.filter(s => s !== season));
    } else {
      setSeasons([...seasons, season]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !color || seasons.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new clothing item
    const newItem: ClothingItem = {
      id: `item${Date.now()}`,
      name,
      type,
      color,
      formality,
      season: seasons,
      occasions: [formality === "casual" ? "everyday" : "work"],
      imageUrl,
      tags: [type, color, formality],
      timesWorn: 0
    };
    
    recommendationService.addClothingItem(newItem);
    
    toast({
      title: "Item Added!",
      description: `${name} has been added to your wardrobe`,
      duration: 3000
    });
    
    navigate("/wardrobe");
  };
  
  const handleTakePhoto = () => {
    // In a real app, this would access the camera
    toast({
      title: "Camera not available",
      description: "This feature is not available in the demo",
      duration: 3000
    });
  };
  
  const handleUploadPhoto = () => {
    // In a real app, this would open a file picker
    toast({
      title: "Upload not available",
      description: "This feature is not available in the demo",
      duration: 3000
    });
  };
  
  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-charcoal">Add New Item</h1>
        </header>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Blue Denim Shirt"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={(value) => setType(value as ClothingType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                    <SelectItem value="dress">Dress</SelectItem>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                    <SelectItem value="accessory">Accessory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  placeholder="e.g. Navy Blue"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="formality">Style/Formality</Label>
                <Select value={formality} onValueChange={(value) => setFormality(value as Formality)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select formality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="smart casual">Smart Casual</SelectItem>
                    <SelectItem value="business casual">Business Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="very formal">Very Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Seasons</Label>
                <div className="flex flex-wrap gap-2">
                  {(["spring", "summer", "fall", "winter"] as Season[]).map((season) => (
                    <button
                      key={season}
                      type="button"
                      className={`px-3 py-1 text-sm rounded-full ${
                        seasons.includes(season)
                          ? "bg-terracotta text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => toggleSeason(season)}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Photo</Label>
                <div className="flex justify-center mb-4">
                  <div className="w-40 h-40 border border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleTakePhoto}
                  >
                    <Camera className="mr-2" size={18} />
                    Take Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleUploadPhoto}
                  >
                    <Upload className="mr-2" size={18} />
                    Upload
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-terracotta hover:bg-terracotta/80">
                Add to Wardrobe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddItem;
