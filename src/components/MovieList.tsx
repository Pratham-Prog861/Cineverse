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
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import type { Movie, Genre } from '@/lib/movies';
import { useDebounce } from 'use-debounce';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';

export default function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const [rating, setRating] = useState('all');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [{ value: 'all', label: 'All Years' }];
    for (let y = currentYear; y >= 1980; y--) {
      years.push({ value: y.toString(), label: y.toString() });
    }
    return years;
  }, []);
  
  const ratings = [
    { value: 'all', label: 'All Ratings' },
    { value: '9', label: '9+ (Excellent)' },
    { value: '8', label: '8+ (Great)' },
    { value: '7', label: '7+ (Good)' },
    { value: '6', label: '6+ (Okay)' },
    { value: '5', label: '5+ (Average)' },
  ];
  
  const fetchMovies = useCallback(async () => {
    try {
      const moviesData = await searchMovies(
        debouncedSearchTerm, 
        genre, 
        year, 
        rating
      );
      setMovies(moviesData);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm, genre, year, rating]);

  useEffect(() => {
    async function fetchInitialData() {
      setIsLoading(true);
      try {
        const [moviesData, genresData] = await Promise.all([
          searchMovies(debouncedSearchTerm, genre, year, rating),
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
  
  useEffect(() => {
    if (debouncedSearchTerm || genre !== 'all' || year !== 'all' || rating !== 'all') {
      fetchMovies();
    }
  }, [debouncedSearchTerm, genre, year, rating, fetchMovies]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setGenre('all');
    setYear('all');
    setRating('all');
  };
  
  // Check if any filter is active
  const hasActiveFilters = genre !== 'all' || year !== 'all' || rating !== 'all' || searchTerm !== '';

  // Loading skeleton
  const renderSkeletons = () => {
    return Array(8).fill(0).map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
          Discover Movies
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-5 rounded-full bg-background/50 backdrop-blur-sm border-border/50 focus-visible:ring-2 focus-visible:ring-primary/50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Mobile Filter Button */}
          <Button 
            variant={hasActiveFilters ? "default" : "outline"}
            size="lg"
            className="md:hidden rounded-full gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
            Filters {hasActiveFilters && `(${[
              genre !== 'all' ? 1 : 0,
              year !== 'all' ? 1 : 0,
              rating !== 'all' ? 1 : 0,
            ].filter(Boolean).reduce((a, b) => a + b, 0)})`}
          </Button>
          
          {/* Desktop Filter Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="w-[180px] rounded-full bg-background/50 backdrop-blur-sm border-border/50">
                <SelectValue placeholder="All Genres" />
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
            
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-[140px] rounded-full bg-background/50 backdrop-blur-sm border-border/50">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y.value} value={y.value}>
                    {y.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger className="w-[160px] rounded-full bg-background/50 backdrop-blur-sm border-border/50">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent>
                {ratings.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Panel */}
      {isFilterOpen && isMobile && (
        <div className="md:hidden mb-6 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-sm text-primary"
            >
              Clear all
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Genre</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="All Genres" />
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Year</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y.value} value={y.value}>
                        {y.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Rating</Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratings.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Active Filters */}
      {hasActiveFilters && !isMobile && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Filters:</span>
          {genre !== 'all' && (
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              {genres.find(g => g.id.toString() === genre)?.name || 'Genre'}
              <button 
                onClick={() => setGenre('all')}
                className="ml-2 rounded-full hover:bg-foreground/10 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {year !== 'all' && (
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              {year}
              <button 
                onClick={() => setYear('all')}
                className="ml-2 rounded-full hover:bg-foreground/10 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {rating !== 'all' && (
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              {ratings.find(r => r.value === rating)?.label.split(' ')[0]}
              <button 
                onClick={() => setRating('all')}
                className="ml-2 rounded-full hover:bg-foreground/10 p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-sm text-primary hover:bg-transparent hover:underline"
          >
            Clear all
          </Button>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {renderSkeletons()}
        </div>
      ) : (
        <>
          {/* No Results */}
          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-muted/30 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any movies matching your search. Try adjusting your filters or search term.
              </p>
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="text-sm text-muted-foreground mb-4">
                Showing <span className="font-medium text-foreground">{movies.length}</span> {movies.length === 1 ? 'movie' : 'movies'}
              </div>
              
              {/* Movie Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {movies.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    genres={genres} 
                  />
                ))}
              </div>
              
              {/* Loading More Indicator */}
              {false && ( // Replace with actual loading more state if implementing pagination
                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="gap-2" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading more...
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
