
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ArtisticButton from "@/components/ArtisticButton";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const goToAuth = () => navigate('/auth');
  const goToQuiz = () => navigate('/quiz');
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-vangogh-blue to-vangogh-navy overflow-hidden">
      {/* Hero Section */}
      <main className="relative flex-grow flex flex-col justify-center items-center text-center px-6 py-16 md:py-24">
        {/* Background artistic elements */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4A6DB5" d="M219.9,568.2c-171.9,47.2-188.5-109.2-92.6-229.9c56.6-71.3,192.9-108.5,304-50.1c78.8,41.5,158.8,130.7,107.7,196.6c-51.1,65.9-147.6,36.4-212.9,56.2C264.8,560.3,228.8,566,219.9,568.2z"/>
            <path fill="#E3C278" d="M536.9,232.2c100.1-77.3,225.9-42.1,197.9,95.4c-16.5,81.2-117,185-229,168.4c-79.7-11.8-175.8-63-156.6-138.1c19.2-75.1,113.8-76.7,161.1-106.7C540.3,234.9,537.9,231.3,536.9,232.2z"/>
          </svg>
        </div>
        
        {/* Stars in the background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 4 + 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.3;
            const delay = Math.random() * 3;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-vangogh-yellow animate-pulse"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity,
                  animationDelay: `${delay}s`,
                  animationDuration: '3s',
                }}
              />
            );
          })}
        </div>
        
        <div className="z-10 max-w-3xl animate-fade-in">
          <div className="mb-10">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-vangogh-yellow mb-4">
              Travel<span className="text-white">-</span>Lore
            </h1>
            <p className="text-xl md:text-2xl text-vangogh-skyBlue mb-6">
              Discover personalized travel itineraries <br className="hidden md:block" />
              inspired by the swirling artistry of Van Gogh
            </p>
            <p className="text-vangogh-skyBlue/70 max-w-2xl mx-auto">
              Swipe, explore, and create your perfect journey through a beautiful artistic experience
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            {isAuthenticated ? (
              <ArtisticButton onClick={goToQuiz} size="lg">
                Start Your Journey
              </ArtisticButton>
            ) : (
              <>
                <ArtisticButton onClick={goToAuth} size="lg">
                  Sign In
                </ArtisticButton>
                <ArtisticButton onClick={goToAuth} variant="secondary" size="lg">
                  Create Account
                </ArtisticButton>
              </>
            )}
          </div>
        </div>
      </main>
      
      {/* Feature Section */}
      <section className="bg-vangogh-navy/60 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-vangogh-yellow text-center mb-12">
            Create Your Artistic Travel Story
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-vangogh-blue/40 p-6 rounded-xl border border-vangogh-navy shadow-lg">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-playfair font-bold text-vangogh-skyBlue mb-2">Personalized Journeys</h3>
              <p className="text-vangogh-skyBlue/70">
                Customize your travel experience based on your unique preferences and interests
              </p>
            </div>
            
            <div className="bg-vangogh-blue/40 p-6 rounded-xl border border-vangogh-navy shadow-lg">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-playfair font-bold text-vangogh-skyBlue mb-2">Culinary Adventures</h3>
              <p className="text-vangogh-skyBlue/70">
                Discover food experiences that match your dietary preferences and culinary interests
              </p>
            </div>
            
            <div className="bg-vangogh-blue/40 p-6 rounded-xl border border-vangogh-navy shadow-lg">
              <div className="text-4xl mb-4">💫</div>
              <h3 className="text-xl font-playfair font-bold text-vangogh-skyBlue mb-2">Hidden Gems</h3>
              <p className="text-vangogh-skyBlue/70">
                Uncover secret spots and local favorites that most tourists never find
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-vangogh-blue py-4 text-center text-vangogh-skyBlue/70 text-sm">
        <p>Travel-Lore © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default HomePage;
