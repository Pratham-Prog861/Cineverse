import Image from 'next/image';
import { notFound } from 'next/navigation';
import { movies } from '@/lib/movies';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Calendar } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import TrailerSummary from '@/components/TrailerSummary';
import { Separator } from '@/components/ui/separator';

export function generateStaticParams() {
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = movies.find(m => m.id.toString() === params.id);

  if (!movie) {
    notFound();
  }

  return (
    <>
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src={movie.posterUrl}
          alt={`${movie.title} backdrop`}
          fill
          className="object-cover object-top"
          data-ai-hint={movie.posterAiHint}
          priority
        />
        <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex flex-col justify-end pb-12 text-white">
           <h1 className="text-4xl md:text-6xl font-bold mb-2 text-balance">{movie.title}</h1>
           <div className="flex items-center flex-wrap gap-4 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{movie.releaseYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{movie.rating.toFixed(1)}</span>
              </div>
           </div>
           <div className="flex flex-wrap gap-2 mt-4">
              {movie.genre.map(g => <Badge key={g} variant="default">{g}</Badge>)}
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3">Description</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{movie.description}</p>
            </div>
            
            <Separator />

            <div>
              <h2 className="text-3xl font-bold mb-6">Watch Movie</h2>
              <VideoPlayer src={movie.movieUrl} />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card p-4 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Cast
              </h3>
              <ul className="space-y-2">
                  {movie.cast.map(actor => (
                      <li key={actor} className="text-muted-foreground">{actor}</li>
                  ))}
              </ul>
            </div>
            
            <TrailerSummary trailerUrl={movie.trailerUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
