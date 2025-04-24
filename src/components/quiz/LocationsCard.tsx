
import { useState } from "react";
import { useTravel } from "@/context/TravelContext";
import SwipeCard from "../SwipeCard";
import ArtisticButton from "../ArtisticButton";
import { Input } from "@/components/ui/input";

interface LocationsCardProps {
  onComplete: () => void;
  onBack: () => void;
}

const LocationsCard = ({ onComplete, onBack }: LocationsCardProps) => {
  const { preferences, updateSourceCity, updateDestinationCity } = useTravel();
  const [sourceCity, setSourceCity] = useState(preferences.sourceCity);
  const [destinationCity, setDestinationCity] = useState(preferences.destinationCity);

  const handleComplete = () => {
    updateSourceCity(sourceCity);
    updateDestinationCity(destinationCity);
    onComplete();
  };

  return (
    <SwipeCard className="flex flex-col bg-night-sky p-6 text-center max-w-md w-full mx-auto rounded-3xl">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-vangogh-yellow">
        Where are you traveling?
      </h2>
      <p className="text-vangogh-skyBlue mb-6">
        Tell us your departure city and destination
      </p>
      
      <div className="space-y-6 mb-8">
        <div className="text-left">
          <label htmlFor="sourceCity" className="block text-sm font-medium text-vangogh-skyBlue mb-2">
            Where are you coming from?
          </label>
          <Input
            id="sourceCity"
            className="w-full bg-vangogh-blue/50 border-vangogh-navy text-white placeholder:text-vangogh-skyBlue/50"
            placeholder="Your home city"
            value={sourceCity}
            onChange={(e) => setSourceCity(e.target.value)}
          />
        </div>
        
        <div className="text-left">
          <label htmlFor="destinationCity" className="block text-sm font-medium text-vangogh-skyBlue mb-2">
            Where would you like to go?
          </label>
          <Input
            id="destinationCity"
            className="w-full bg-vangogh-blue/50 border-vangogh-navy text-white placeholder:text-vangogh-skyBlue/50"
            placeholder="Your destination"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
          />
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
          disabled={!sourceCity || !destinationCity}
          className="flex-1"
        >
          Continue
        </ArtisticButton>
      </div>
    </SwipeCard>
  );
};

export default LocationsCard;
