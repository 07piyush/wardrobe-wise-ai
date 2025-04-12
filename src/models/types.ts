
export interface User {
  id: string;
  name: string;
  bodyTraits: BodyTraits;
  preferences: UserPreferences;
}

export interface BodyTraits {
  height?: number; // in cm
  skinTone?: string;
  bodyType?: string;
  gender?: string;
}

export interface UserPreferences {
  likedOutfits: string[];
  dislikedTags: string[];
  favoriteColors: string[];
  stylePreferences: string[];
}

export interface ClothingItem {
  id: string;
  name: string;
  type: ClothingType;
  color: string;
  pattern?: string;
  material?: string;
  formality: Formality;
  season: Season[];
  occasions: string[];
  imageUrl: string;
  tags: string[];
  lastWorn?: Date;
  timesWorn: number;
}

export type ClothingType = 
  'top' | 'bottom' | 'dress' | 'outerwear' | 
  'footwear' | 'accessory' | 'hat' | 'other';

export type Formality = 'casual' | 'smart casual' | 'business casual' | 'formal' | 'very formal';

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface Weather {
  temperature: number; // in Celsius
  condition: WeatherCondition;
  precipitation: number; // percentage chance
}

export type WeatherCondition = 
  'sunny' | 'partly cloudy' | 'cloudy' | 
  'rainy' | 'stormy' | 'snowy' | 'windy';

export interface Outfit {
  id: string;
  items: ClothingItem[];
  occasion?: string;
  season: Season[];
  formality: Formality;
  weather?: WeatherCondition[];
  rating?: number;
}
