
import React from "react";
import BottomNavigation from "./BottomNavigation";
import VoiceAssistant from "../VoiceAssistant/VoiceAssistant";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface AppLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, showNav = true }) => {
  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal dark:text-cream flex flex-col transition-colors duration-300">
      <main className="flex-1 pb-16">
        {children}
      </main>
      {showNav && <BottomNavigation />}
      
      {/* Floating Voice Assistant Button */}
      <div className="fixed right-4 bottom-20 z-20">
        <VoiceAssistant />
      </div>
      
      {/* Theme Toggle Button */}
      <div className="fixed right-4 top-4 z-20">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AppLayout;
