
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArtisticButton from "@/components/ArtisticButton";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goToHome = () => navigate('/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-vangogh-blue to-vangogh-navy p-6">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-bold text-vangogh-yellow mb-6">404</div>
        <h1 className="text-4xl font-playfair font-bold text-vangogh-skyBlue mb-4">
          Page Not Found
        </h1>
        <p className="text-vangogh-skyBlue/70 mb-8">
          It seems you've wandered off the beaten path. Let's guide you back to the journey.
        </p>
        <ArtisticButton onClick={goToHome}>
          Return to Homepage
        </ArtisticButton>
      </div>
    </div>
  );
};

export default NotFound;
