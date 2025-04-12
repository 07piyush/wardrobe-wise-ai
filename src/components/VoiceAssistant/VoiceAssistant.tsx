
import React, { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
    <Button
      onClick={toggleListening}
      className={`rounded-full w-12 h-12 flex items-center justify-center shadow-lg fixed ${
        isListening ? "bg-terracotta animate-pulse" : "bg-terracotta"
      }`}
      size="icon"
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
    </Button>
  );
};

export default VoiceAssistant;
