
import React from "react";
import AppLayout from "../components/Layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Camera, Edit, Heart, Settings, Star, Shirt, Clock } from "lucide-react";
import { mockUser } from "../services/mockData";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = mockUser;
  
  return (
    <AppLayout>
      <div className="max-w-md mx-auto px-4 py-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-charcoal">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings size={20} />
          </Button>
        </header>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User avatar" />
              <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              className="rounded-full absolute bottom-0 right-0 w-8 h-8"
              variant="secondary"
            >
              <Camera size={14} />
            </Button>
          </div>
          
          <h2 className="text-lg font-semibold mt-4">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.preferences.stylePreferences.join(", ")}</p>
          
          <div className="flex mt-4 space-x-3">
            <Button variant="outline" size="sm" className="flex gap-1">
              <Edit size={14} />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="flex gap-1">
              <Heart size={14} />
              My Likes
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Style Stats</CardTitle>
              <CardDescription>Your wardrobe breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex justify-center items-center h-12 w-12 mx-auto mb-2 rounded-full bg-terracotta/10">
                    <Shirt size={24} className="text-terracotta" />
                  </div>
                  <div className="text-2xl font-semibold">8</div>
                  <div className="text-xs text-gray-500">Items</div>
                </div>
                <div>
                  <div className="flex justify-center items-center h-12 w-12 mx-auto mb-2 rounded-full bg-sage/10">
                    <Star size={24} className="text-sage" />
                  </div>
                  <div className="text-2xl font-semibold">4</div>
                  <div className="text-xs text-gray-500">Outfits</div>
                </div>
                <div>
                  <div className="flex justify-center items-center h-12 w-12 mx-auto mb-2 rounded-full bg-soft-yellow/20">
                    <Clock size={24} className="text-soft-yellow" />
                  </div>
                  <div className="text-2xl font-semibold">14</div>
                  <div className="text-xs text-gray-500">Days</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Favorites</CardTitle>
              <CardDescription>Your most-loved styles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {user.preferences.favoriteColors.map((color, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="capitalize">{color}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-gray-500 text-sm">
            <Link to="/privacy" className="underline">Privacy Policy</Link> &bull; <Link to="/terms" className="underline">Terms of Use</Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
