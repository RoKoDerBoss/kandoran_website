import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cva, type VariantProps } from 'class-variance-authority';

// Card size variants
const cardVariants = cva(
  `overflow-hidden bg-white`,
  {
    variants: {
      size: {
        sm: "w-[265px]",
        md: "w-[320px]",
        lg: "w-[384px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// Extract variant props type
interface CharacterCardSkeletonProps extends VariantProps<typeof cardVariants> {
  className?: string;
}

export const CharacterCardSkeleton: React.FC<CharacterCardSkeletonProps> = ({ 
  size = "md", 
  className 
}) => {
  // Size specific configs
  const heights = {
    sm: {
      banner: "h-12",
      avatar: "h-24 w-24",
      content: "h-80",
    },
    md: {
      banner: "h-16",
      avatar: "h-28 w-28",
      content: "h-96",
    },
    lg: {
      banner: "h-20",
      avatar: "h-32 w-32",
      content: "h-108",
    }
  };

  const config = heights[size as keyof typeof heights];

  return (
    <Card className={`${cardVariants({ size })} ${className} animate-pulse`}>
      {/* Header with Banner and Avatar */}
      <div className="relative">
        {/* Banner */}
        <Skeleton className={`${config.banner} w-full rounded-t-lg`} />
        
        {/* Level Badge */}
        <Skeleton className="absolute top-0 right-0 h-12 w-12 rounded-bl-lg" />
        
        {/* Status Badge */}
        <Skeleton className="absolute top-2 left-2 h-6 w-16 rounded-full" />
        
        {/* Avatar */}
        <div className="flex justify-center -mt-6 relative z-10">
          <Skeleton className={`${config.avatar} rounded-full border-4 border-white`} />
        </div>
      </div>
      
      <CardContent className="pt-6 px-4">
        {/* Name */}
        <div className="flex justify-center mb-2">
          <Skeleton className="h-7 w-28" />
        </div>
        
        {/* Race */}
        <div className="flex justify-center mb-4">
          <Skeleton className="h-4 w-20" />
        </div>
        
        {/* Class Badges */}
        <div className="flex justify-center space-x-2 mb-4">
          <Skeleton className="h-12 w-32 rounded-lg" />
          <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
        
        {/* Last Game Row */}
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t p-2">
        <Skeleton className="h-4 w-32" />
      </CardFooter>
    </Card>
  );
};

export default CharacterCardSkeleton; 