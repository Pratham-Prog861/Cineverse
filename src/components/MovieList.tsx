"use client";

import { useState, useMemo } from 'react';
import { movies } from '@/lib/movies';
import { MovieCard } from '@/components/MovieCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Label } from './ui/label';

export default function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const [rating, setRating] = useState('all');

  const genres = useMemo(
    () => [
      'all',
      ...Array.from(new Set(movies.flatMap((m) => m.genre))).sort(),
    ],
    []
  );
  const years = useMemo(
    () => [
      'all',
      ...Array.from(new Set(movies.map((m) => m.releaseYear.toString()))).sort(
        (a, b) => parseInt(b) - parseInt(a)
      ),
    ],
    []
  );

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesGenre = genre === 'all' || movie.genre.includes(genre);
      const matchesYear = year === 'all' || movie.releaseYear.toString() === year;
      const matchesRating =
        rating === 'all' || movie.rating >= parseInt(rating);
      return matchesSearch && matchesGenre && matchesYear && matchesRating;
    });
  }, [searchTerm, genre, year, rating]);

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Label htmlFor="search-movie" className="sr-only">Search</Label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="search-movie"
            placeholder="Search movie or cast..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div>
          <Label htmlFor="genre-filter">Genre</Label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger id="genre-filter">
              <SelectValue placeholder="Filter by Genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map((g) => (
                <SelectItem key={g} value={g}>
                  {g === 'all' ? 'All Genres' : g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="year-filter">Year</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger id="year-filter">
              <SelectValue placeholder="Filter by Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y === 'all' ? 'All Years' : y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rating-filter">Rating</Label>
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger id="rating-filter">
              <SelectValue placeholder="Filter by Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="9">9+ Stars</SelectItem>
              <SelectItem value="8">8+ Stars</SelectItem>
              <SelectItem value="7">7+ Stars</SelectItem>
              <SelectItem value="6">6+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">No Movies Found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
