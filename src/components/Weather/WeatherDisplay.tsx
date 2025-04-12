
import React from "react";
import { CloudSun, Cloud, Snowflake, CloudRain, Sun, Wind } from "lucide-react";
import { Weather } from "../../models/types";

interface WeatherDisplayProps {
  weather: Weather;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  // Function to get the appropriate icon based on weather condition
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "sunny":
        return <Sun className="text-soft-yellow" size={28} />;
      case "partly cloudy":
        return <CloudSun className="text-gray-500" size={28} />;
      case "cloudy":
        return <Cloud className="text-gray-500" size={28} />;
      case "rainy":
        return <CloudRain className="text-gray-500" size={28} />;
      case "snowy":
        return <Snowflake className="text-blue-300" size={28} />;
      case "windy":
        return <Wind className="text-gray-500" size={28} />;
      default:
        return <CloudSun className="text-gray-500" size={28} />;
    }
  };
  
  return (
    <div className="flex items-center bg-white rounded-xl p-3 shadow-sm">
      {getWeatherIcon()}
      <div className="ml-3">
        <div className="font-medium">{Math.round(weather.temperature)}°C</div>
        <div className="text-xs text-gray-500 capitalize">{weather.condition}</div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
