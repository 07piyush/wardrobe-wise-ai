
import React from "react";
import BottomNavigation from "./BottomNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, showNav = true }) => {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <main className="flex-1 pb-16">
        {children}
      </main>
      {showNav && <BottomNavigation />}
    </div>
  );
};

export default AppLayout;
