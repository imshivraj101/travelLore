
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import ArtisticButton from "../ArtisticButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpProps {
  onToggleForm: () => void;
}

const SignUp = ({ onToggleForm }: SignUpProps) => {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await signup(name, email, password);
      if (!success) {
        setError("Failed to create account");
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
        <h1 className="text-4xl font-playfair font-bold text-vangogh-yellow">Create Account</h1>
        <p className="text-vangogh-skyBlue mt-2">Begin your artistic travel journey</p>
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-600 text-red-100 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-vangogh-skyBlue">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className="bg-vangogh-blue/50 border-vangogh-navy text-white"
          />
        </div>
        
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
          <Label htmlFor="password" className="text-vangogh-skyBlue">Password</Label>
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
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-vangogh-skyBlue">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isLoading ? "Creating account..." : "Sign Up"}
        </ArtisticButton>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-vangogh-skyBlue">
          Already have an account?{" "}
          <button
            onClick={onToggleForm}
            className="text-vangogh-yellow hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
