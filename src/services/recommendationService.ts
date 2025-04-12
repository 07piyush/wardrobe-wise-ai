import { ClothingItem, Outfit, User, Weather } from "../models/types";
import { mockClothingItems, mockOutfits, mockWeather } from "./mockData";

// Simple recommendation engine for MVP
export class RecommendationService {
  private user: User | null = null;
  private weather: Weather = mockWeather;
  private clothingItems: ClothingItem[] = mockClothingItems;
  private outfits: Outfit[] = mockOutfits;
  
  setUser(user: User) {
    this.user = user;
  }
  
  setWeather(weather: Weather) {
    this.weather = weather;
  }
  
  getWeather(): Weather {
    return this.weather;
  }
  
  getAllClothingItems(): ClothingItem[] {
    return this.clothingItems;
  }
  
  getClothingItemsByType(type: string): ClothingItem[] {
    return this.clothingItems.filter(item => item.type === type);
  }
  
  // Get recommended outfits based on weather and user preferences
  getRecommendedOutfits(count = 5): Outfit[] {
    let recommendedOutfits = [...this.outfits];
    
    // Filter by weather appropriateness
    if (this.weather) {
      // Simple weather-based filtering
      if (this.weather.temperature < 15) {
        // Cold weather
        recommendedOutfits = recommendedOutfits.filter(outfit => 
          outfit.season.includes('fall') || outfit.season.includes('winter'));
      } else if (this.weather.temperature > 25) {
        // Hot weather
        recommendedOutfits = recommendedOutfits.filter(outfit => 
          outfit.season.includes('summer'));
      }
      
      // Rain consideration
      if (this.weather.condition === 'rainy' || this.weather.precipitation > 50) {
        // Exclude outfits not suitable for rain
        recommendedOutfits = recommendedOutfits.filter(outfit => 
          !outfit.weather || !outfit.weather.includes('sunny'));
      }
    }
    
    // Sort by user preferences if we have a user
    if (this.user) {
      recommendedOutfits.sort((a, b) => {
        // Check if outfit is in liked outfits
        const aLiked = this.user!.preferences.likedOutfits.includes(a.id) ? 1 : 0;
        const bLiked = this.user!.preferences.likedOutfits.includes(b.id) ? 1 : 0;
        
        if (aLiked !== bLiked) return bLiked - aLiked;
        
        // Otherwise sort by rating
        return (b.rating || 0) - (a.rating || 0);
      });
    } else {
      // Sort by rating if no user
      recommendedOutfits.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    // Return the top outfits
    return recommendedOutfits.slice(0, count);
  }
  
  // Add a new clothing item
  addClothingItem(item: ClothingItem) {
    this.clothingItems.push(item);
  }
  
  // Record user feedback on an outfit
  rateOutfit(outfitId: string, liked: boolean) {
    if (!this.user) return;
    
    if (liked) {
      if (!this.user.preferences.likedOutfits.includes(outfitId)) {
        this.user.preferences.likedOutfits.push(outfitId);
      }
    } else {
      // Remove from liked if present
      this.user.preferences.likedOutfits = this.user.preferences.likedOutfits
        .filter(id => id !== outfitId);
      
      // Add tags to disliked
      const outfit = this.outfits.find(o => o.id === outfitId);
      if (outfit) {
        const tags = outfit.items.flatMap(item => item.tags);
        this.user.preferences.dislikedTags = [
          ...this.user.preferences.dislikedTags,
          ...tags.filter(tag => !this.user!.preferences.dislikedTags.includes(tag))
        ];
      }
    }
  }

  // Get a single outfit by ID
  getOutfitById(id: string): Outfit | undefined {
    return this.outfits.find(outfit => outfit.id === id);
  }
}

// Create and export a singleton instance
export const recommendationService = new RecommendationService();
