import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, PlayCircle, Clock, Plus, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import type { Movie, Genre } from '@/lib/movies';

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
}

export function MovieCard({ movie, genres }: MovieCardProps) {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://picsum.photos/500/750';

  const movieGenres = (movie.genre_ids || [])
    .map((id) => genres.find((g) => g.id === id)?.name)
    .filter(Boolean) as string[];
  
  const releaseYear = movie.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : 'N/A';
  
  const duration = movie.runtime 
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  return (
    <div className="group relative h-full rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/movies/${movie.id}`} className="block h-full">
        <Card className="h-full border-0 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:bg-card/70">
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src={posterPath}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            
            {/* Top right corner badge */}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
          
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {movie.title}
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 -mt-1 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle menu
                }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{releaseYear}</span>
              {duration && (
                <>
                  <span className="text-muted-foreground/50">•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{duration}</span>
                  </div>
                </>
              )}
            </div>
            
            {movieGenres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {movieGenres.slice(0, 2).map((genre) => (
                  <Badge 
                    key={genre} 
                    variant="secondary" 
                    className="text-xs font-medium px-2 py-0.5 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/70 transition-colors"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
