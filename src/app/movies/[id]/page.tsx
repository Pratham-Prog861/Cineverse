import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMovieDetails } from '@/lib/movies';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Calendar, Film } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import TrailerSummary from '@/components/TrailerSummary';
import { Separator } from '@/components/ui/separator';

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);

  if (!movie) {
    notFound();
  }
  
  const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://picsum.photos/400/600';
  const backdropPath = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : 'https://picsum.photos/1280/720';

  const trailer = movie.videos.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

  // A dummy movie url. In a real app this would come from a streaming provider.
  const movieUrl = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  return (
    <>
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image
          src={backdropPath}
          alt={`${movie.title} backdrop`}
          fill
          className="object-cover object-top"
          data-ai-hint="movie backdrop"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex flex-col justify-end pb-12 text-white">
           <h1 className="text-4xl md:text-6xl font-bold mb-2 text-balance">{movie.title}</h1>
           <div className="flex items-center flex-wrap gap-4 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
              </div>
           </div>
           <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres.map(g => <Badge key={g.id} variant="default">{g.name}</Badge>)}
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3">Description</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{movie.overview}</p>
            </div>
            
            <Separator />

            <div>
              <h2 className="text-3xl font-bold mb-6">Watch Movie</h2>
              <VideoPlayer src={movieUrl} />
            </div>
          </div>
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card p-4 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Cast
              </h3>
              <ul className="space-y-2">
                  {movie.credits.cast.slice(0, 10).map(actor => (
                      <li key={actor.name} className="text-muted-foreground">{actor.name}</li>
                  ))}
              </ul>
            </div>
            
            {trailerUrl && <TrailerSummary trailerUrl={trailerUrl} />}
          </div>
        </div>
      </div>
    </>
  );
}
