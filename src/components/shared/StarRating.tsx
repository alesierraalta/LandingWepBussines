'use client';

import { memo } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export const StarRating = memo<StarRatingProps>(({ 
  rating, 
  size = 16, 
  className = '' 
}) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={size}
          style={{
            color: index < rating ? '#fbbf24' : '#d1d5db'
          }}
          fill={index < rating ? '#fbbf24' : 'none'}
        />
      ))}
    </div>
  );
});

StarRating.displayName = 'StarRating';

