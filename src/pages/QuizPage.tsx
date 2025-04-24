
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTravel, TravelItinerary } from '@/context/TravelContext';
import ProgressDots from '@/components/ProgressDots';
import HobbiesCard from '@/components/quiz/HobbiesCard';
import FoodPreferencesCard from '@/components/quiz/FoodPreferencesCard';
import LocationsCard from '@/components/quiz/LocationsCard';
import AgeGroupCard from '@/components/quiz/AgeGroupCard';
import TravelGroupCard from '@/components/quiz/TravelGroupCard';
import TripDurationCard from '@/components/quiz/TripDurationCard';
import { generateItinerary } from '@/services/itineraryService';
import ArtisticButton from '@/components/ArtisticButton';

const totalSteps = 6;

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { preferences, setItinerary } = useTravel();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Optional: redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(current => current + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(current => current - 1);
    }
  };
  
  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const generatedItinerary = await generateItinerary(preferences);
      setItinerary(generatedItinerary);
      navigate('/itinerary');
    } catch (error) {
      console.error("Error generating itinerary:", error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-vangogh-blue to-vangogh-navy">
      <div className="flex-grow p-4">
        <header className="text-center py-8">
          <h1 className="text-4xl font-playfair font-bold text-vangogh-yellow mb-2">
            Plan Your Journey
          </h1>
          <p className="text-vangogh-skyBlue">
            Let's create your perfect travel experience
          </p>
          <ProgressDots steps={totalSteps} currentStep={currentStep} className="mt-6" />
        </header>
        
        <main className="flex justify-center items-center my-8 px-4">
          <div className="w-full">
            {currentStep === 1 && <HobbiesCard onComplete={nextStep} />}
            {currentStep === 2 && <FoodPreferencesCard onComplete={nextStep} onBack={prevStep} />}
            {currentStep === 3 && <LocationsCard onComplete={nextStep} onBack={prevStep} />}
            {currentStep === 4 && <AgeGroupCard onComplete={nextStep} onBack={prevStep} />}
            {currentStep === 5 && <TravelGroupCard onComplete={nextStep} onBack={prevStep} />}
            {currentStep === 6 && <TripDurationCard onComplete={nextStep} onBack={prevStep} />}
            
            {isLoading && (
              <div className="fixed inset-0 bg-vangogh-blue/80 flex items-center justify-center z-50">
                <div className="text-center p-6 rounded-xl bg-vangogh-navy/50 shadow-xl">
                  <div className="w-16 h-16 border-4 border-vangogh-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-playfair font-bold text-vangogh-yellow">
                    Creating Your Journey
                  </h3>
                  <p className="text-vangogh-skyBlue mt-2">
                    Painting your perfect travel experience...
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <footer className="bg-vangogh-blue py-4 text-center text-vangogh-skyBlue/70 text-sm">
        <p>Travel-Lore © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default QuizPage;
