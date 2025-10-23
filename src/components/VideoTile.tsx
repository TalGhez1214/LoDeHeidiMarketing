import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoTileProps {
  title: string;
  thumbnail: string;
  onClick: () => void;
}

export function VideoTile({ title, thumbnail, onClick }: VideoTileProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300"
    >
      <ImageWithFallback
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center group-hover:scale-110 transition-all duration-300">
          <Play className="w-7 h-7 text-white ml-1" fill="white" />
        </div>
      </div>
      
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-sm">{title}</p>
      </div>
    </button>
  );
}
