
import React from "react";
import { Home, Search, Upload, Shirt, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Explore", path: "/explore" },
    { icon: Upload, label: "Add", path: "/add-item" },
    { icon: Shirt, label: "Wardrobe", path: "/wardrobe" },
    { icon: User, label: "Profile", path: "/profile" }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around z-10">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center ${
              isActive ? "text-terracotta" : "text-gray-500"
            }`}
          >
            <item.icon size={24} className={isActive ? "fill-terracotta/10" : ""} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
