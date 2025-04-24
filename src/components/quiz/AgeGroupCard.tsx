
import { useState } from "react";
import { AgeGroupType, useTravel } from "@/context/TravelContext";
import SwipeCard from "../SwipeCard";
import ArtisticButton from "../ArtisticButton";
import { cn } from "@/lib/utils";

interface AgeGroupCardProps {
  onComplete: () => void;
  onBack: () => void;
}

const AgeGroupCard = ({ onComplete, onBack }: AgeGroupCardProps) => {
  const { preferences, updateAgeGroup } = useTravel();
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroupType>(
    preferences.ageGroup
  );

  const ageGroups: { value: AgeGroupType; label: string }[] = [
    { value: "18-24", label: "18-24" },
    { value: "25-34", label: "25-34" },
    { value: "35-44", label: "35-44" },
    { value: "45-54", label: "45-54" },
    { value: "55-64", label: "55-64" },
    { value: "65+", label: "65+" },
  ];

  const handleComplete = () => {
    updateAgeGroup(selectedAgeGroup);
    onComplete();
  };

  return (
    <SwipeCard className="flex flex-col bg-night-sky p-6 text-center max-w-md w-full mx-auto rounded-3xl">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-vangogh-yellow">
        What's your age group?
      </h2>
      <p className="text-vangogh-skyBlue mb-6">
        This helps us tailor activities for your trip
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {ageGroups.map((ageGroup) => (
          <button
            key={ageGroup.value}
            onClick={() => setSelectedAgeGroup(ageGroup.value)}
            className={cn(
              "flex items-center justify-center p-4 rounded-xl transition-all duration-300",
              "border-2 hover:shadow-lg",
              selectedAgeGroup === ageGroup.value
                ? "bg-vangogh-starBlue border-vangogh-skyBlue"
                : "bg-vangogh-blue/50 border-vangogh-navy hover:bg-vangogh-navy/30"
            )}
          >
            <span className="font-medium">{ageGroup.label}</span>
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

export default AgeGroupCard;
