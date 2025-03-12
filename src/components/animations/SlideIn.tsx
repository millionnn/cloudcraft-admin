
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

export function SlideIn({ 
  children, 
  direction = "right", 
  delay = 0, 
  className 
}: SlideInProps) {
  return (
    <div
      className={cn(
        direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left", 
        "opacity-0",
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`, 
        animationFillMode: "forwards" 
      }}
    >
      {children}
    </div>
  );
}
