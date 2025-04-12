
import React from "react";
import { motion } from "framer-motion";

interface KineticTypographyProps {
  text: string;
  className?: string;
}

const KineticTypography: React.FC<KineticTypographyProps> = ({ text, className = "" }) => {
  // Split text into individual characters
  const characters = text.split("");

  // Animation variants for characters
  const characterAnimation = {
    hover: (i: number) => ({
      y: [0, -10, 0],
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        repeat: 0,
        repeatType: "mirror" as const,
      },
    }),
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      whileHover="hover"
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={characterAnimation}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default KineticTypography;
