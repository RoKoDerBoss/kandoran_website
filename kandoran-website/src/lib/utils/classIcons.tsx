import React from 'react';
import { 
    Sword,
    Compass,
    ShieldPlus,
    Swords,
    Flame,
    Cross,
    Moon,
    Music,
    Gem,
    Leaf,
    Axe,
    Wind,
    BookText,
} from 'lucide-react';

export interface ClassIconProps {
  className?: string;
  size?: string | number;
  variant?: 'sm' | 'md' | 'lg';
}

// Color mapping for each class
export const classColors = {
  Rogue: 'text-amber-500',
  Ranger: 'text-green-500',
  Fighter: 'text-red-500',
  Wizard: 'text-blue-500',
  Cleric: 'text-yellow-500',
  Barbarian: 'text-red-600',
  Warlock: 'text-purple-600',
  Paladin: 'text-blue-400',
  Monk: 'text-amber-700',
  Druid: 'text-green-600',
  Bard: 'text-pink-500',
  Sorcerer: 'text-purple-500',
  Default: 'text-blue-500'
};

// Icon size variants
export const iconSizeVariants = {
  sm: 16,
  md: 20,
  lg: 24
};

// Component for each class icon
export const ClassIcons = {
  Rogue: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Sword 
      className={`${classColors.Rogue} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Ranger: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Compass 
      className={`${classColors.Ranger} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Fighter: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Swords 
      className={`${classColors.Fighter} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Wizard: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <BookText 
      className={`${classColors.Wizard} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Cleric: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Cross 
      className={`${classColors.Cleric} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Barbarian: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Axe 
      className={`${classColors.Barbarian} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Warlock: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Moon 
      className={`${classColors.Warlock} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Paladin: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <ShieldPlus 
      className={`${classColors.Paladin} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Monk: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Wind 
      className={`${classColors.Monk} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Druid: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Leaf 
      className={`${classColors.Druid} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Bard: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Music 
      className={`${classColors.Bard} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Sorcerer: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Flame 
      className={`${classColors.Sorcerer} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  ),
  Default: ({ className, size, variant = 'md' }: ClassIconProps) => (
    <Gem 
      className={`${classColors.Default} ${className || ''}`} 
      size={size || iconSizeVariants[variant]} 
    />
  )
};

// Helper function to get the icon component for a given class name
export const getClassIcon = (className: string) => {
  return ClassIcons[className as keyof typeof ClassIcons] || ClassIcons.Default;
};

export default ClassIcons; 