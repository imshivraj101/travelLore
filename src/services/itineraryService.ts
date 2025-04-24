
import { TravelActivity, TravelItinerary, TravelDay } from "@/context/TravelContext";

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with real key

// Mock image URLs for activities
const imageUrls = [
  "https://source.unsplash.com/random/300x200/?landmark",
  "https://source.unsplash.com/random/300x200/?museum",
  "https://source.unsplash.com/random/300x200/?restaurant",
  "https://source.unsplash.com/random/300x200/?park",
  "https://source.unsplash.com/random/300x200/?beach",
  "https://source.unsplash.com/random/300x200/?shopping",
  "https://source.unsplash.com/random/300x200/?nightlife",
];

// Generate a mock itinerary based on the user's preferences
export async function generateItinerary(preferences: any): Promise<TravelItinerary> {
  // In a real app, we would call the Gemini API here
  // For now, we'll generate a mock response
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const days: TravelDay[] = [];
  
  // Generate activities for each day
  for (let i = 0; i < preferences.tripDuration; i++) {
    const dayActivities: TravelActivity[] = [];
    
    // Morning activity
    dayActivities.push({
      id: `morning-${i}`,
      name: generateActivityName(preferences, "morning"),
      type: "must-visit",
      timeOfDay: "morning",
      description: generateDescription(preferences),
      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)]
    });
    
    // Afternoon activity
    dayActivities.push({
      id: `afternoon-${i}`,
      name: generateActivityName(preferences, "afternoon"),
      type: "recommended",
      timeOfDay: "afternoon",
      description: generateDescription(preferences),
      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)]
    });
    
    // Evening activity
    dayActivities.push({
      id: `evening-${i}`,
      name: generateActivityName(preferences, "evening"),
      type: "hidden-gem",
      timeOfDay: "evening",
      description: generateDescription(preferences),
      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)]
    });
    
    days.push({
      day: i + 1,
      activities: dayActivities
    });
  }
  
  // Generate food suggestions based on preferences
  const foodSuggestions = generateFoodSuggestions(preferences);
  
  // Generate hidden gems
  const hiddenGems = [
    `Secret spot in ${preferences.destinationCity}`,
    "Local's favorite café",
    "Hidden viewpoint",
    "Off-the-beaten-path attraction"
  ];
  
  return {
    id: `trip-${Date.now()}`,
    destination: preferences.destinationCity,
    days,
    description: generateTripDescription(preferences),
    foodSuggestions,
    hiddenGems
  };
}

// Helper function to generate activity names based on preferences
function generateActivityName(preferences: any, timeOfDay: string): string {
  const { hobbies, destinationCity } = preferences;
  
  const activityMap: Record<string, string[]> = {
    adventure: ["Hiking Trail", "Water Sports", "Mountain Biking", "Zip-lining", "Rock Climbing"],
    history: ["Historic Site Tour", "Museum Visit", "Ancient Ruins", "Heritage Walk", "Cultural Center"],
    nightlife: ["Local Bar Hopping", "Live Music Venue", "Dance Club", "Comedy Show", "Night Market"],
    art: ["Art Gallery", "Street Art Tour", "Craft Workshop", "Theater Performance", "Design District"],
    nature: ["Botanical Garden", "National Park", "Wildlife Sanctuary", "Beach Day", "Sunset Viewpoint"],
    food: ["Food Tour", "Cooking Class", "Market Visit", "Wine Tasting", "Farm-to-Table Experience"]
  };
  
  let activityPool: string[] = [];
  
  // Add activities based on selected hobbies
  if (hobbies.length > 0) {
    for (const hobby of hobbies) {
      if (activityMap[hobby]) {
        activityPool = [...activityPool, ...activityMap[hobby]];
      }
    }
  } else {
    // If no hobbies selected, use all activities
    Object.values(activityMap).forEach(activities => {
      activityPool = [...activityPool, ...activities];
    });
  }
  
  // If somehow we still have no activities, provide defaults
  if (activityPool.length === 0) {
    activityPool = ["Sightseeing", "Local Tour", "Shopping", "Relaxation", "City Exploration"];
  }
  
  // Select a random activity
  const activity = activityPool[Math.floor(Math.random() * activityPool.length)];
  
  // Time-specific prefixes
  const timePrefix = {
    morning: ["Early Morning", "Sunrise", "Morning"],
    afternoon: ["Midday", "Afternoon", "Lunch Time"],
    evening: ["Evening", "Sunset", "Night"]
  }[timeOfDay];
  
  const prefix = timePrefix[Math.floor(Math.random() * timePrefix.length)];
  
  return `${prefix} ${activity} in ${destinationCity}`;
}

// Helper function to generate descriptions
function generateDescription(preferences: any): string {
  const descriptions = [
    "Immerse yourself in this unforgettable experience that perfectly matches your interests.",
    "This local favorite offers a unique perspective on the destination's culture.",
    "A must-visit destination that travelers consistently rate as a highlight.",
    "Explore this hidden gem that few tourists discover on their own.",
    "Enjoy the perfect balance of adventure and relaxation in this amazing spot."
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Helper function to generate trip descriptions
function generateTripDescription(preferences: any): string {
  const { destinationCity, tripDuration, travelGroup } = preferences;
  
  const groupText = {
    solo: "solo adventurer",
    couple: "couple",
    family: "family",
    friends: "group of friends"
  }[travelGroup];
  
  return `A spectacular ${tripDuration}-day journey through the vibrant streets and hidden corners of ${destinationCity}. Crafted especially for a ${groupText}, this itinerary blends must-see attractions with authentic local experiences, creating memories that will last a lifetime in the spirit of Van Gogh's passionate artistry.`;
}

// Helper function to generate food suggestions
function generateFoodSuggestions(preferences: any): string[] {
  const { foodPreferences, destinationCity } = preferences;
  
  const suggestionMap: Record<string, string[]> = {
    vegan: [
      `Best Vegan Restaurant in ${destinationCity}`,
      "Plant-based local specialties",
      "Vegan-friendly street food options"
    ],
    vegetarian: [
      "Vegetarian-friendly local cuisine",
      "Farm-to-table vegetarian experience",
      "Historic vegetarian restaurant"
    ],
    omnivore: [
      "Authentic local meat dishes",
      "Seafood specialties",
      "Traditional mixed cuisine"
    ],
    local: [
      "Hidden gem local eatery",
      "Traditional family restaurant",
      "Authentic regional cuisine"
    ],
    "fine-dining": [
      "Michelin-starred experience",
      "Upscale local fusion",
      "Elegant dining with a view"
    ],
    "street-food": [
      "Bustling food market",
      "Late night food stalls",
      "Street food walking tour"
    ]
  };
  
  let suggestions: string[] = [];
  
  // Add suggestions based on selected food preferences
  if (foodPreferences.length > 0) {
    for (const pref of foodPreferences) {
      if (suggestionMap[pref]) {
        suggestions = [...suggestions, ...suggestionMap[pref]];
      }
    }
  } else {
    // If no preferences selected, use general suggestions
    suggestions = [
      "Popular local restaurant",
      "Tourist-friendly dining options",
      "Diverse culinary experiences",
      "Budget-friendly eateries"
    ];
  }
  
  // Return 3-5 random suggestions
  const numSuggestions = Math.floor(Math.random() * 3) + 3; // 3-5
  const shuffled = suggestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numSuggestions);
}

// This would be the actual call to the Gemini API in a real implementation
async function callGeminiAPI(prompt: string) {
  try {
    /*
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    */
    
    // For now, just return a placeholder
    return "This would be the Gemini API response";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
