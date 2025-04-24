
import { useState } from "react";
import { useTravel } from "@/context/TravelContext";
import SwipeCard from "../SwipeCard";
import ArtisticButton from "../ArtisticButton";

interface TripDurationCardProps {
  onComplete: () => void;
  onBack: () => void;
}

const TripDurationCard = ({ onComplete, onBack }: TripDurationCardProps) => {
  const { preferences, updateTripDuration } = useTravel();
  const [duration, setDuration] = useState(preferences.tripDuration || 3);

  const handleComplete = () => {
    updateTripDuration(duration);
    onComplete();
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value, 10));
  };

  return (
    <SwipeCard className="flex flex-col bg-night-sky p-6 text-center max-w-md w-full mx-auto rounded-3xl">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-vangogh-yellow">
        How long is your trip?
      </h2>
      <p className="text-vangogh-skyBlue mb-6">
        Select the number of days for your adventure
      </p>
      
      <div className="mb-8 space-y-6">
        <div className="flex justify-center">
          <span className="text-6xl font-playfair">{duration}</span>
          <span className="text-xl ml-2 self-end mb-2 text-vangogh-skyBlue">days</span>
        </div>
        
        <div className="px-4">
          <input
            type="range"
            min="1"
            max="14"
            value={duration}
            onChange={handleSliderChange}
            className="w-full h-2 bg-vangogh-navy rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vangogh-yellow"
          />
          <div className="flex justify-between mt-2 text-xs text-vangogh-skyBlue">
            <span>1</span>
            <span>7</span>
            <span>14</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <ArtisticButton 
          onClick={onBack} 
          variant="outline"
          className="flex-1"
        >
          Back
        </ArtisticButton>
        <ArtisticButton 
          onClick={handleComplete}
          className="flex-1"
        >
          Continue
        </ArtisticButton>
      </div>
    </SwipeCard>
  );
};

export default TripDurationCard;
