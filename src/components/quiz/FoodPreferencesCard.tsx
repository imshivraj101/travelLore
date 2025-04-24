
import { useState } from "react";
import { FoodPreferenceType, useTravel } from "@/context/TravelContext";
import SwipeCard from "../SwipeCard";
import ArtisticButton from "../ArtisticButton";
import { cn } from "@/lib/utils";

interface FoodPreferencesCardProps {
  onComplete: () => void;
  onBack: () => void;
}

const FoodPreferencesCard = ({ onComplete, onBack }: FoodPreferencesCardProps) => {
  const { preferences, updateFoodPreferences } = useTravel();
  const [selectedPreferences, setSelectedPreferences] = useState<FoodPreferenceType[]>(
    preferences.foodPreferences
  );

  const foodPreferences: { type: FoodPreferenceType; label: string; icon: string }[] = [
    { type: "vegan", label: "Vegan", icon: "🥗" },
    { type: "vegetarian", label: "Vegetarian", icon: "🥦" },
    { type: "omnivore", label: "Everything", icon: "🍖" },
    { type: "local", label: "Local Cuisine", icon: "🍲" },
    { type: "fine-dining", label: "Fine Dining", icon: "🍷" },
    { type: "street-food", label: "Street Food", icon: "🌮" },
  ];

  const togglePreference = (preference: FoodPreferenceType) => {
    setSelectedPreferences(prev =>
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleComplete = () => {
    updateFoodPreferences(selectedPreferences);
    onComplete();
  };

  return (
    <SwipeCard className="flex flex-col bg-night-sky p-6 text-center max-w-md w-full mx-auto rounded-3xl">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-vangogh-yellow">
        What do you like to eat?
      </h2>
      <p className="text-vangogh-skyBlue mb-6">
        Select all that apply to your food preferences
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {foodPreferences.map((preference) => (
          <button
            key={preference.type}
            onClick={() => togglePreference(preference.type)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300",
              "border-2 hover:shadow-lg",
              selectedPreferences.includes(preference.type)
                ? "bg-vangogh-starBlue border-vangogh-skyBlue"
                : "bg-vangogh-blue/50 border-vangogh-navy hover:bg-vangogh-navy/30"
            )}
          >
            <span className="text-4xl mb-2">{preference.icon}</span>
            <span className="font-medium text-sm">{preference.label}</span>
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
          disabled={selectedPreferences.length === 0}
          className="flex-1"
        >
          Continue
        </ArtisticButton>
      </div>
    </SwipeCard>
  );
};

export default FoodPreferencesCard;
