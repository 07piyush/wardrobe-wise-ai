
import { ClothingItem, Outfit, User, Weather } from "../models/types";

// Mock user data
export const mockUser: User = {
  id: "user1",
  name: "Alex Johnson",
  bodyTraits: {
    height: 175,
    skinTone: "medium",
    bodyType: "athletic",
    gender: "neutral"
  },
  preferences: {
    likedOutfits: ["outfit1", "outfit3"],
    dislikedTags: ["neon", "plaid"],
    favoriteColors: ["navy", "burgundy", "olive"],
    stylePreferences: ["casual", "minimalist"]
  }
};

// Mock clothing items
export const mockClothingItems: ClothingItem[] = [
  {
    id: "item1",
    name: "Navy Blue T-Shirt",
    type: "top",
    color: "navy",
    material: "cotton",
    formality: "casual",
    season: ["spring", "summer"],
    occasions: ["casual", "weekend"],
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["casual", "basic", "everyday"],
    timesWorn: 12
  },
  {
    id: "item2",
    name: "Khaki Chinos",
    type: "bottom",
    color: "beige",
    material: "cotton",
    formality: "smart casual",
    season: ["spring", "summer", "fall"],
    occasions: ["casual", "work"],
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["versatile", "work", "weekend"],
    timesWorn: 8
  },
  {
    id: "item3",
    name: "White Sneakers",
    type: "footwear",
    color: "white",
    material: "leather",
    formality: "casual",
    season: ["spring", "summer", "fall"],
    occasions: ["casual", "weekend", "errands"],
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["versatile", "comfortable", "everyday"],
    timesWorn: 20
  },
  {
    id: "item4",
    name: "Denim Jacket",
    type: "outerwear",
    color: "blue",
    material: "denim",
    formality: "casual",
    season: ["spring", "fall"],
    occasions: ["casual", "weekend", "concert"],
    imageUrl: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["layering", "classic", "versatile"],
    timesWorn: 6
  },
  {
    id: "item5",
    name: "Black Dress",
    type: "dress",
    color: "black",
    material: "polyester blend",
    formality: "formal",
    season: ["all"],
    occasions: ["formal", "dinner", "party"],
    imageUrl: "https://images.unsplash.com/photo-1551803091-e20673f15770?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["elegant", "classic", "essential"],
    timesWorn: 3
  },
  {
    id: "item6",
    name: "White Button-Up Shirt",
    type: "top",
    color: "white",
    material: "cotton",
    formality: "smart casual",
    season: ["all"],
    occasions: ["work", "formal", "meeting"],
    imageUrl: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["classic", "versatile", "professional"],
    timesWorn: 10
  },
  {
    id: "item7",
    name: "Blue Jeans",
    type: "bottom",
    color: "blue",
    material: "denim",
    formality: "casual",
    season: ["all"],
    occasions: ["casual", "weekend", "everyday"],
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["everyday", "versatile", "comfortable"],
    timesWorn: 25
  },
  {
    id: "item8",
    name: "Brown Leather Boots",
    type: "footwear",
    color: "brown",
    material: "leather",
    formality: "smart casual",
    season: ["fall", "winter"],
    occasions: ["work", "casual", "outdoor"],
    imageUrl: "https://images.unsplash.com/photo-1542840411-2bfbd8a5923f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["durable", "versatile", "weather-appropriate"],
    timesWorn: 14
  }
];

// Mock outfits
export const mockOutfits: Outfit[] = [
  {
    id: "outfit1",
    items: [
      mockClothingItems[0], // Navy Blue T-Shirt
      mockClothingItems[1], // Khaki Chinos
      mockClothingItems[2]  // White Sneakers
    ],
    occasion: "casual weekend",
    season: ["spring", "summer"],
    formality: "casual",
    weather: ["sunny", "partly cloudy"],
    rating: 4
  },
  {
    id: "outfit2",
    items: [
      mockClothingItems[5], // White Button-Up Shirt
      mockClothingItems[1], // Khaki Chinos
      mockClothingItems[7]  // Brown Leather Boots
    ],
    occasion: "work meeting",
    season: ["fall", "winter", "spring"],
    formality: "business casual",
    weather: ["sunny", "cloudy", "partly cloudy"],
    rating: 5
  },
  {
    id: "outfit3",
    items: [
      mockClothingItems[0], // Navy Blue T-Shirt
      mockClothingItems[6], // Blue Jeans
      mockClothingItems[2], // White Sneakers
      mockClothingItems[3]  // Denim Jacket
    ],
    occasion: "casual outing",
    season: ["spring", "fall"],
    formality: "casual",
    weather: ["partly cloudy", "cloudy"],
    rating: 4
  },
  {
    id: "outfit4",
    items: [
      mockClothingItems[4] // Black Dress
    ],
    occasion: "formal dinner",
    season: ["all"],
    formality: "formal",
    weather: ["any"],
    rating: 5
  }
];

// Mock current weather
export const mockWeather: Weather = {
  temperature: 22,
  condition: "partly cloudy",
  precipitation: 10
};
