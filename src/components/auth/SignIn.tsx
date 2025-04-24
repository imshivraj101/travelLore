
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import ArtisticButton from "../ArtisticButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInProps {
  onToggleForm: () => void;
}

const SignIn = ({ onToggleForm }: SignInProps) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-playfair font-bold text-vangogh-yellow">Welcome Back</h1>
        <p className="text-vangogh-skyBlue mt-2">Sign in to continue your journey</p>
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-600 text-red-100 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-vangogh-skyBlue">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@example.com"
            required
            className="bg-vangogh-blue/50 border-vangogh-navy text-white"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-vangogh-skyBlue">Password</Label>
            <button
              type="button"
              className="text-sm text-vangogh-skyBlue hover:text-vangogh-yellow"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="bg-vangogh-blue/50 border-vangogh-navy text-white"
          />
        </div>
        
        <ArtisticButton
          type="submit"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </ArtisticButton>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-vangogh-skyBlue">
          Don't have an account?{" "}
          <button
            onClick={onToggleForm}
            className="text-vangogh-yellow hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
