import React from 'react';

interface NameAvatarProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const NameAvatar: React.FC<NameAvatarProps> = ({ name, size = 'medium', className = '' }) => {
  // Get initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Generate color based on name hash
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Enhanced gradient color combinations for more visual appeal
  const gradientColors = [
    { from: 'from-blue-400', to: 'to-cyan-500', shadow: 'shadow-blue-500/25' },
    { from: 'from-emerald-400', to: 'to-teal-500', shadow: 'shadow-emerald-500/25' },
    { from: 'from-purple-400', to: 'to-pink-500', shadow: 'shadow-purple-500/25' },
    { from: 'from-rose-400', to: 'to-red-500', shadow: 'shadow-rose-500/25' },
    { from: 'from-amber-400', to: 'to-orange-500', shadow: 'shadow-amber-500/25' },
    { from: 'from-indigo-400', to: 'to-violet-500', shadow: 'shadow-indigo-500/25' },
    { from: 'from-fuchsia-400', to: 'to-pink-500', shadow: 'shadow-fuchsia-500/25' },
    { from: 'from-emerald-400', to: 'to-green-500', shadow: 'shadow-emerald-500/25' },
    { from: 'from-orange-400', to: 'to-red-500', shadow: 'shadow-orange-500/25' },
    { from: 'from-sky-400', to: 'to-blue-500', shadow: 'shadow-sky-500/25' }
  ];

  const colorIndex = hashCode(name) % gradientColors.length;
  const color = gradientColors[colorIndex];

  const sizeClasses = {
    small: 'w-10 h-10 text-sm',
    medium: 'w-16 h-16 text-base',
    large: 'w-24 h-24 text-xl'
  };

  const textShadow = initials.length === 1 ? 'drop-shadow-md' : '';

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br ${color.from} ${color.to}
        rounded-full flex items-center justify-center
        font-bold uppercase tracking-wide
        ${color.shadow} shadow-2xl
        border-4 border-yellow-400
        flex-shrink-0
        hover:scale-105 transition-all duration-200
        ${textShadow}
        ${className}
      `}
    >
      <span className="text-white drop-shadow-md">
        {initials || '?'}
      </span>
    </div>
  );
};

export default NameAvatar;
