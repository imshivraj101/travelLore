
import { useTravel, TravelItinerary, TravelDay, TravelActivity } from "@/context/TravelContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ArtisticButton from "./ArtisticButton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ItineraryDisplay = ({ itinerary }: { itinerary: TravelItinerary }) => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 brush-stroke">
          Your Journey to {itinerary.destination}
        </h1>
        <p className="text-xl text-vangogh-skyBlue max-w-3xl mx-auto">
          {itinerary.description}
        </p>
      </div>
      
      <Tabs defaultValue={String(activeDay)} className="w-full" onValueChange={(val) => setActiveDay(Number(val))}>
        <div className="flex justify-center mb-8">
          <TabsList className="bg-vangogh-blue overflow-x-auto max-w-full flex flex-nowrap">
            {itinerary.days.map((day) => (
              <TabsTrigger 
                key={day.day} 
                value={String(day.day)}
                className={cn(
                  "min-w-20 font-playfair",
                  activeDay === day.day && "bg-vangogh-starBlue"
                )}
              >
                Day {day.day}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {itinerary.days.map((day) => (
          <TabsContent key={day.day} value={String(day.day)} className="animate-fade-in">
            <DayItinerary day={day} />
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <Card className="bg-vangogh-blue/50 border-vangogh-navy shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-2xl font-playfair font-bold text-vangogh-yellow mb-4">
              Food Suggestions
            </h3>
            <ul className="space-y-2">
              {itinerary.foodSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-vangogh-yellow mr-2">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-vangogh-blue/50 border-vangogh-navy shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-2xl font-playfair font-bold text-vangogh-yellow mb-4">
              Hidden Gems
            </h3>
            <ul className="space-y-2">
              {itinerary.hiddenGems.map((gem, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-vangogh-yellow mr-2">✦</span>
                  <span>{gem}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <ArtisticButton className="mx-auto">
          Save My Journey
        </ArtisticButton>
      </div>
    </div>
  );
};

const DayItinerary = ({ day }: { day: TravelDay }) => {
  return (
    <div className="space-y-6">
      {day.activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

const ActivityCard = ({ activity }: { activity: TravelActivity }) => {
  const timeLabel = {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening"
  }[activity.timeOfDay];
  
  const typeLabel = {
    "must-visit": "Must Visit",
    "recommended": "Recommended",
    "hidden-gem": "Hidden Gem"
  }[activity.type];
  
  const typeColor = {
    "must-visit": "bg-vangogh-starBlue",
    "recommended": "bg-vangogh-orange",
    "hidden-gem": "bg-vangogh-cypress"
  }[activity.type];
  
  return (
    <Card className="overflow-hidden border-2 border-vangogh-navy shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="grid md:grid-cols-3">
        <div 
          className="h-48 md:h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${activity.imageUrl})` }}
        />
        <div className="md:col-span-2 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-sm text-vangogh-skyBlue">{timeLabel}</span>
              <h3 className="text-xl font-bold font-playfair">{activity.name}</h3>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full text-white ${typeColor}`}>
              {typeLabel}
            </span>
          </div>
          <p className="text-vangogh-skyBlue">{activity.description}</p>
        </div>
      </div>
    </Card>
  );
};

export default ItineraryDisplay;
