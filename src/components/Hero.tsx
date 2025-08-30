import Image from 'next/image';
import { getPopularMovies } from '@/lib/movies';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlayCircle, Info, Star, Clock } from 'lucide-react';

// Add shimmer effect for image loading
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default async function Hero() {
  const movies = await getPopularMovies();
  const heroMovie = movies[Math.floor(Math.random() * 10)];

  if (!heroMovie) {
    return null;
  }
  
  const backdropPath = heroMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
    : `https://picsum.photos/1920/1080`;

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backdropPath}
          alt={heroMovie.title}
          fill
          className="object-cover object-center"
          priority
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
          quality={100}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary">Now Streaming</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-balance">
            {heroMovie.title}
          </h1>
          
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-foreground">
                {heroMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-sm">/10</span>
            </div>
            <span>•</span>
            <span>{new Date(heroMovie.release_date).getFullYear()}</span>
            {heroMovie.runtime && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(heroMovie.runtime / 60)}h {heroMovie.runtime % 60}m</span>
                </div>
              </>
            )}
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground line-clamp-3">
            {heroMovie.overview}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="group h-12 px-6 text-base">
              <Link href={`/movies/${heroMovie.id}`} className="gap-2">
                <PlayCircle className="h-6 w-6 transition-transform group-hover:scale-110" />
                Watch Now
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="group h-12 px-6 text-base bg-background/30 backdrop-blur-sm border-white/20 hover:bg-background/50 hover:border-white/40"
            >
              <Link href={`/movies/${heroMovie.id}`} className="gap-2">
                <Info className="h-5 w-5 transition-transform group-hover:scale-110" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}
