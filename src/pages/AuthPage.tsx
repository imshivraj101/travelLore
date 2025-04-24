
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/quiz');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="flex-grow flex items-center justify-center p-4 bg-gradient-to-b from-vangogh-blue to-vangogh-navy overflow-hidden relative"
      >
        {/* Background swirls */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4A6DB5" d="M219.9,568.2c-171.9,47.2-188.5-109.2-92.6-229.9c56.6-71.3,192.9-108.5,304-50.1c78.8,41.5,158.8,130.7,107.7,196.6c-51.1,65.9-147.6,36.4-212.9,56.2C264.8,560.3,228.8,566,219.9,568.2z"/>
            <path fill="#E3C278" d="M536.9,232.2c100.1-77.3,225.9-42.1,197.9,95.4c-16.5,81.2-117,185-229,168.4c-79.7-11.8-175.8-63-156.6-138.1c19.2-75.1,113.8-76.7,161.1-106.7C540.3,234.9,537.9,231.3,536.9,232.2z"/>
          </svg>
        </div>
        
        <div className="z-10 w-full max-w-md">
          {isSignUp ? (
            <SignUp onToggleForm={() => setIsSignUp(false)} />
          ) : (
            <SignIn onToggleForm={() => setIsSignUp(true)} />
          )}
        </div>
      </div>
      
      <footer className="bg-vangogh-blue py-4 text-center text-vangogh-skyBlue/70 text-sm">
        <p>Travel-Lore © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default AuthPage;
