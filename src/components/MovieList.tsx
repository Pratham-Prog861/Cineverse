"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { searchMovies, getGenres } from '@/lib/movies';
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
import type { Movie, Genre } from '@/lib/movies';
import { useDebounce } from 'use-debounce';

export default function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const [rating, setRating] = useState('all');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = ['all'];
    for (let y = currentYear; y >= 1980; y--) {
      years.push(y.toString());
    }
    return years;
  }, []);
  
  useEffect(() => {
    async function fetchInitialData() {
        setIsLoading(true);
        try {
            const [moviesData, genresData] = await Promise.all([
                searchMovies('', 'all', 'all', 'all'),
                getGenres()
            ]);
            setMovies(moviesData);
            setGenres(genresData);
        } catch (error) {
            console.error("Failed to fetch initial data", error);
        } finally {
            setIsLoading(false);
        }
    }
    fetchInitialData();
  }, []);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
        const moviesData = await searchMovies(debouncedSearchTerm, genre, year, rating);
        setMovies(moviesData);
    } catch (error) {
        console.error("Failed to search movies", error);
    } finally {
        setIsLoading(false);
    }
  }, [debouncedSearchTerm, genre, year, rating]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);


  return (
    <div>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Label htmlFor="search-movie" className="sr-only">Search</Label>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="search-movie"
            placeholder="Search movie..."
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
                <SelectItem value="all">All Genres</SelectItem>
              {genres.map((g) => (
                <SelectItem key={g.id} value={g.id.toString()}>
                  {g.name}
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
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="aspect-[2/3] bg-muted rounded-lg animate-pulse"></div>
                    <div className="h-5 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
            ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
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
