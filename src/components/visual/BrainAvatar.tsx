import { BrainColor } from '../../types/brain';
import { BRAIN_ARCHETYPES } from '../../data/brainData';
import { Search, ListOrdered, Zap, Heart } from 'lucide-react';

export const BrainAvatar = ({
  color,
  size = 'md',
  showLabel = true
}: {
  color: BrainColor;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}) => {
  const archetype = BRAIN_ARCHETYPES[color];

  const getIcon = () => {
    switch (color) {
      case 'purple':
        return <Search className="w-1/2 h-1/2" />;
      case 'red':
        return <ListOrdered className="w-1/2 h-1/2" />;
      case 'green':
        return <Zap className="w-1/2 h-1/2" />;
      case 'blue':
        return <Heart className="w-1/2 h-1/2" />;
    }
  };

  const dimClass = size === 'lg' ? 'w-16 h-16 text-2xl' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-12 h-12 text-base';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`${dimClass} rounded-2xl flex items-center justify-center text-white shadow-md transition-transform hover:scale-105`}
        style={{
          backgroundColor: archetype.primaryColor,
          boxShadow: `0 8px 20px -4px ${archetype.primaryColor}50`
        }}
      >
        {getIcon()}
      </div>
      {showLabel && (
        <span className="text-xs font-black tracking-tight" style={{ color: archetype.textColor }}>
          {archetype.avatarName} ({archetype.name.replace(' Brain', '')})
        </span>
      )}
    </div>
  );
};
