
import React, { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const { toast } = useToast();

  // Initialize speech recognition if supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = "en-US";
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
      handleVoiceCommand(transcript);
    };
  }

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Not supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive"
      });
      return;
    }
    
    if (isListening) {
      recognition.stop();
    } else {
      setTranscript("");
      recognition.start();
      toast({
        title: "Listening...",
        description: "Ask me something like: 'Show me my wardrobe'",
      });
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    toast({
      title: "I heard",
      description: command,
    });

    // Basic command handling
    if (lowerCommand.includes("wardrobe")) {
      window.location.href = "/wardrobe";
    } else if (lowerCommand.includes("add") && lowerCommand.includes("item")) {
      window.location.href = "/add-item";
    } else if (lowerCommand.includes("explore")) {
      window.location.href = "/explore";
    } else if (lowerCommand.includes("profile")) {
      window.location.href = "/profile";
    } else if (lowerCommand.includes("home")) {
      window.location.href = "/";
    } else {
      toast({
        title: "I'm not sure",
        description: "I didn't understand that command",
        variant: "destructive"
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Button
          onClick={toggleListening}
          className={`rounded-full w-14 h-14 flex items-center justify-center shadow-xl fixed 
                    backdrop-blur-lg glassmorphism transition-all duration-300
                    ${isListening ? "bg-terracotta/80" : "bg-terracotta/70"}`}
          size="icon"
        >
          <motion.div
            animate={isListening ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {isListening ? 
              <MicOff size={24} className="text-white" /> : 
              <Mic size={24} className="text-white" />
            }
          </motion.div>
          
          {isListening && (
            <motion.div 
              className="absolute w-full h-full rounded-full border-4 border-terracotta/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
};

export default VoiceAssistant;
