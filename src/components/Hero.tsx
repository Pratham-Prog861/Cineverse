import Image from 'next/image';
import { getPopularMovies } from '@/lib/movies';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

export default async function Hero() {
  const movies = await getPopularMovies();
  const heroMovie = movies[Math.floor(Math.random() * 10)]; // Pick a random movie from top 10

  if (!heroMovie) {
    return null;
  }
  
  const backdropPath = heroMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
    : `https://picsum.photos/1920/1080`;

  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <Image
          src={backdropPath}
          alt={heroMovie.title}
          fill
          className="object-cover"
          priority
          data-ai-hint="movie backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance leading-tight">
            {heroMovie.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 line-clamp-3">
            {heroMovie.overview}
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href={`/movies/${heroMovie.id}`}>
                <PlayCircle className="mr-2 h-6 w-6" />
                Watch Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/movies/${heroMovie.id}`}>
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
