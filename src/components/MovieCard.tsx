import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import type { Movie, Genre } from '@/lib/movies';

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
}

export function MovieCard({ movie, genres }: MovieCardProps) {
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
    : 'https://picsum.photos/400/600';

  const movieGenres = (movie.genre_ids || []).map(id => genres.find(g => g.id === id)?.name).filter(Boolean);
  
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Link href={`/movies/${movie.id}`} className="group">
      <Card className="overflow-hidden h-full transition-all duration-300 group-hover:shadow-primary/20 group-hover:shadow-lg group-hover:-translate-y-2">
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={posterPath}
              alt={movie.title}
              width={400}
              height={600}
              className="object-cover w-full h-auto aspect-[2/3]"
              data-ai-hint="movie poster"
            />
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
              {movie.title}
            </h3>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{releaseYear}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {movieGenres.slice(0, 2).map((g) => (
                <Badge key={g} variant="secondary" className="text-xs">
                  {g}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
