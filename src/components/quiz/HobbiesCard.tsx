
import { useState } from "react";
import { HobbyType, useTravel } from "@/context/TravelContext";
import SwipeCard from "../SwipeCard";
import ArtisticButton from "../ArtisticButton";
import { cn } from "@/lib/utils";

interface HobbiesCardProps {
  onComplete: () => void;
}

const HobbiesCard = ({ onComplete }: HobbiesCardProps) => {
  const { preferences, updateHobbies } = useTravel();
  const [selectedHobbies, setSelectedHobbies] = useState<HobbyType[]>(preferences.hobbies);

  const hobbies: { type: HobbyType; label: string; icon: string }[] = [
    { type: "adventure", label: "Adventure & Sports", icon: "🏄‍♂️" },
    { type: "history", label: "History & Culture", icon: "🏛️" },
    { type: "nightlife", label: "Nightlife & Entertainment", icon: "🌃" },
    { type: "art", label: "Art & Museums", icon: "🎨" },
    { type: "nature", label: "Nature & Outdoors", icon: "🏞️" },
    { type: "food", label: "Food & Culinary", icon: "🍽️" },
  ];

  const toggleHobby = (hobby: HobbyType) => {
    setSelectedHobbies(prev => 
      prev.includes(hobby) 
        ? prev.filter(h => h !== hobby) 
        : [...prev, hobby]
    );
  };

  const handleComplete = () => {
    updateHobbies(selectedHobbies);
    onComplete();
  };

  return (
    <SwipeCard className="flex flex-col bg-night-sky p-6 text-center max-w-md w-full mx-auto rounded-3xl">
      <h2 className="text-3xl font-playfair font-bold mb-4 text-vangogh-yellow">
        What do you enjoy when traveling?
      </h2>
      <p className="text-vangogh-skyBlue mb-6">
        Select all that interest you
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {hobbies.map((hobby) => (
          <button
            key={hobby.type}
            onClick={() => toggleHobby(hobby.type)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300",
              "border-2 hover:shadow-lg",
              selectedHobbies.includes(hobby.type)
                ? "bg-vangogh-starBlue border-vangogh-skyBlue"
                : "bg-vangogh-blue/50 border-vangogh-navy hover:bg-vangogh-navy/30"
            )}
          >
            <span className="text-4xl mb-2">{hobby.icon}</span>
            <span className="font-medium text-sm">{hobby.label}</span>
          </button>
        ))}
      </div>
      
      <ArtisticButton 
        onClick={handleComplete} 
        disabled={selectedHobbies.length === 0}
        fullWidth
      >
        Continue
      </ArtisticButton>
    </SwipeCard>
  );
};

export default HobbiesCard;
