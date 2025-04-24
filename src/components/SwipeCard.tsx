
import { ReactNode, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SwipeCardProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

const SwipeCard = ({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  className 
}: SwipeCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const startX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setDragOffset(diff);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = currentX - startX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    completeSwipe();
  };

  const handleMouseUp = () => {
    completeSwipe();
  };

  const completeSwipe = () => {
    setIsDragging(false);
    
    // Threshold for considering a swipe (in pixels)
    const threshold = 100;
    
    if (dragOffset > threshold) {
      setSwipeDirection("right");
      onSwipeRight?.();
    } else if (dragOffset < -threshold) {
      setSwipeDirection("left");
      onSwipeLeft?.();
    } else {
      // Reset if the swipe wasn't strong enough
      setDragOffset(0);
    }
  };

  // Reset drag when animation completes
  const handleAnimationEnd = () => {
    if (swipeDirection) {
      setDragOffset(0);
      setSwipeDirection(null);
    }
  };

  const cardStyles = {
    transform: isDragging ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)` : '',
    opacity: isDragging ? 1 - Math.abs(dragOffset) / 500 : 1
  };

  const animationClass = swipeDirection === "left" 
    ? "animate-swipe-out-left" 
    : swipeDirection === "right" 
      ? "animate-swipe-out-right" 
      : "";

  return (
    <div
      className={cn("swipe-card card-swipe select-none", className, animationClass)}
      style={cardStyles}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default SwipeCard;
