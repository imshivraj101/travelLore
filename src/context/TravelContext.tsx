
import { ReactNode, createContext, useContext, useState } from "react";

export type HobbyType = "adventure" | "history" | "nightlife" | "art" | "nature" | "food";
export type FoodPreferenceType = "vegan" | "vegetarian" | "omnivore" | "local" | "fine-dining" | "street-food";
export type AgeGroupType = "18-24" | "25-34" | "35-44" | "45-54" | "55-64" | "65+";
export type TravelGroupType = "solo" | "couple" | "family" | "friends";

interface TravelPreferences {
  hobbies: HobbyType[];
  foodPreferences: FoodPreferenceType[];
  sourceCity: string;
  destinationCity: string;
  ageGroup: AgeGroupType;
  travelGroup: TravelGroupType;
  tripDuration: number;
  generatedItinerary: TravelItinerary | null;
}

export interface TravelItinerary {
  id: string;
  destination: string;
  days: TravelDay[];
  description: string;
  foodSuggestions: string[];
  hiddenGems: string[];
}

export interface TravelDay {
  day: number;
  activities: TravelActivity[];
}

export interface TravelActivity {
  id: string;
  name: string;
  type: "must-visit" | "recommended" | "hidden-gem";
  timeOfDay: "morning" | "afternoon" | "evening";
  description: string;
  imageUrl?: string;
}

interface TravelContextType {
  preferences: TravelPreferences;
  updateHobbies: (hobbies: HobbyType[]) => void;
  updateFoodPreferences: (foodPreferences: FoodPreferenceType[]) => void;
  updateSourceCity: (city: string) => void;
  updateDestinationCity: (city: string) => void;
  updateAgeGroup: (ageGroup: AgeGroupType) => void;
  updateTravelGroup: (travelGroup: TravelGroupType) => void;
  updateTripDuration: (days: number) => void;
  setItinerary: (itinerary: TravelItinerary) => void;
  resetPreferences: () => void;
}

const initialPreferences: TravelPreferences = {
  hobbies: [],
  foodPreferences: [],
  sourceCity: "",
  destinationCity: "",
  ageGroup: "25-34",
  travelGroup: "solo",
  tripDuration: 3,
  generatedItinerary: null
};

const TravelContext = createContext<TravelContextType>({
  preferences: initialPreferences,
  updateHobbies: () => {},
  updateFoodPreferences: () => {},
  updateSourceCity: () => {},
  updateDestinationCity: () => {},
  updateAgeGroup: () => {},
  updateTravelGroup: () => {},
  updateTripDuration: () => {},
  setItinerary: () => {},
  resetPreferences: () => {},
});

export function TravelProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<TravelPreferences>(initialPreferences);

  const updateHobbies = (hobbies: HobbyType[]) => {
    setPreferences(prev => ({ ...prev, hobbies }));
  };

  const updateFoodPreferences = (foodPreferences: FoodPreferenceType[]) => {
    setPreferences(prev => ({ ...prev, foodPreferences }));
  };

  const updateSourceCity = (sourceCity: string) => {
    setPreferences(prev => ({ ...prev, sourceCity }));
  };

  const updateDestinationCity = (destinationCity: string) => {
    setPreferences(prev => ({ ...prev, destinationCity }));
  };

  const updateAgeGroup = (ageGroup: AgeGroupType) => {
    setPreferences(prev => ({ ...prev, ageGroup }));
  };

  const updateTravelGroup = (travelGroup: TravelGroupType) => {
    setPreferences(prev => ({ ...prev, travelGroup }));
  };

  const updateTripDuration = (tripDuration: number) => {
    setPreferences(prev => ({ ...prev, tripDuration }));
  };

  const setItinerary = (generatedItinerary: TravelItinerary) => {
    setPreferences(prev => ({ ...prev, generatedItinerary }));
  };

  const resetPreferences = () => {
    setPreferences(initialPreferences);
  };

  return (
    <TravelContext.Provider value={{ 
      preferences, 
      updateHobbies, 
      updateFoodPreferences, 
      updateSourceCity,
      updateDestinationCity,
      updateAgeGroup,
      updateTravelGroup,
      updateTripDuration,
      setItinerary,
      resetPreferences
    }}>
      {children}
    </TravelContext.Provider>
  );
}

export const useTravel = () => useContext(TravelContext);
