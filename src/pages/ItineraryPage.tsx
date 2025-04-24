
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTravel } from '@/context/TravelContext';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import ArtisticButton from '@/components/ArtisticButton';

const ItineraryPage = () => {
  const { isAuthenticated } = useAuth();
  const { preferences } = useTravel();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Redirect to quiz if no itinerary is generated
    if (!preferences.generatedItinerary) {
      navigate('/quiz');
    }
  }, [isAuthenticated, preferences.generatedItinerary, navigate]);

  const handleNewJourney = () => {
    navigate('/quiz');
  };

  if (!preferences.generatedItinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-vangogh-blue to-vangogh-navy">
        <div className="text-center">
          <h1 className="text-3xl font-playfair font-bold text-vangogh-yellow mb-4">
            No itinerary found
          </h1>
          <p className="text-vangogh-skyBlue mb-8">
            Let's create a new travel experience for you
          </p>
          <ArtisticButton onClick={handleNewJourney}>
            Start New Journey
          </ArtisticButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-vangogh-blue to-vangogh-navy">
      <header className="py-4 px-6 flex justify-between items-center border-b border-vangogh-navy">
        <h1 className="text-2xl font-playfair font-bold text-vangogh-yellow">
          Travel-Lore
        </h1>
        <div className="space-x-4">
          <ArtisticButton onClick={handleNewJourney} variant="outline" size="sm">
            New Journey
          </ArtisticButton>
        </div>
      </header>
      
      <main className="flex-grow p-4 md:p-8">
        <ItineraryDisplay itinerary={preferences.generatedItinerary} />
      </main>
      
      <footer className="bg-vangogh-blue py-4 text-center text-vangogh-skyBlue/70 text-sm">
        <p>Travel-Lore © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default ItineraryPage;
