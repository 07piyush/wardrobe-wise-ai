
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ rotate: 10 }}
      className="z-50"
    >
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg fixed 
                 bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm transition-all duration-500
                 neumorphic-toggle dark:neumorphic-toggle-dark"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          key={theme}
        >
          {theme === "dark" ? <Sun size={20} className="text-soft-yellow" /> : <Moon size={20} className="text-charcoal" />}
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;
