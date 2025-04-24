
import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  steps: number;
  currentStep: number;
  className?: string;
}

const ProgressDots = ({ steps, currentStep, className }: ProgressDotsProps) => {
  return (
    <div className={cn("progress-dots", className)}>
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "progress-dot", 
            index === currentStep - 1 && "active"
          )}
        />
      ))}
    </div>
  );
};

export default ProgressDots;
