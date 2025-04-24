
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ArtisticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const ArtisticButton = ({ 
  children, 
  onClick, 
  className,
  variant = "primary",
  disabled = false,
  type = "button",
  size = "md",
  fullWidth = false
}: ArtisticButtonProps) => {
  const sizeClasses = {
    sm: "text-sm px-3 py-1",
    md: "text-base px-5 py-2",
    lg: "text-lg px-6 py-3"
  };

  const variantClasses = {
    primary: "bg-vangogh-starBlue hover:bg-vangogh-navy text-white border-2 border-vangogh-skyBlue",
    secondary: "bg-vangogh-yellow hover:bg-vangogh-wheat text-vangogh-blue border-2 border-vangogh-orange",
    outline: "bg-transparent hover:bg-vangogh-navy/10 border-2 border-current"
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        "font-playfair rounded-2xl transition-all duration-300 transform shadow-md hover:shadow-lg hover:-translate-y-1",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled}
      type={type}
    >
      {children}
    </Button>
  );
};

export default ArtisticButton;
