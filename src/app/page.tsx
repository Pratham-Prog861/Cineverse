import MovieList from '@/components/MovieList';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
        Discover Movies
      </h1>
      <MovieList />
    </div>
  );
}
