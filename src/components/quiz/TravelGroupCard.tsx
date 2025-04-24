
import { useState } from "react";
import { TravelGroupType, useTravel } from "@/context/TravelContext";
import SwipeCard from "../SwipeCard";
import ArtisticButton from "../ArtisticButton";
import { cn } from "@/lib/utils";

interface TravelGroupCardProps {
  onComplete: () => void;
  onBack: () => void;
}

const TravelGroupCard = ({ onComplete, onBack }: TravelGroupCardProps) => {
  const { preferences, updateTravelGroup } = useTravel();
  const [selectedTravelGroup, setSelectedTravelGroup] = useState<TravelGroupType>(
    preferences.travelGroup
  );

  const travelGroups: { value: TravelGroupType; label: string; icon: string }[] = [
    { value: "solo", label: "Solo", icon: "🧳" },
    { value: "couple", label: "Couple", icon: "💑" },
    { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
    { value: "friends", label: "Friends", icon: "👯‍♂️" },
  ];

  const handleComplete = () => {
    updateTravelGroup(selectedTravelGroup);
    onComplete();
  };

  return (
    <SwipeCard className="flex flex-col bg-night-sky p-6 text-center max-w-md w-full mx-auto rounded-3xl">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-vangogh-yellow">
        Who are you traveling with?
      </h2>
      <p className="text-vangogh-skyBlue mb-6">
        Select the option that best describes your travel group
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {travelGroups.map((group) => (
          <button
            key={group.value}
            onClick={() => setSelectedTravelGroup(group.value)}
            className={cn(
              "flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-300",
              "border-2 hover:shadow-lg",
              selectedTravelGroup === group.value
                ? "bg-vangogh-starBlue border-vangogh-skyBlue"
                : "bg-vangogh-blue/50 border-vangogh-navy hover:bg-vangogh-navy/30"
            )}
          >
            <span className="text-4xl mb-2">{group.icon}</span>
            <span className="font-medium">{group.label}</span>
          </button>
        ))}
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

export default TravelGroupCard;
