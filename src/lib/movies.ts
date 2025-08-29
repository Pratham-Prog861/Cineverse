export type Movie = {
  id: number;
  title: string;
  description: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  backdrop_path: string | null;
  overview: string;
  genres: { id: number; name: string }[];
  credits: {
    cast: { name: string }[];
  };
  videos: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
};

export type Genre = {
  id: number;
  name: string;
};

const API_KEY = process.env.TMDB_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
};

async function fetchFromTMDB(url: string, params: Record<string, string> = {}) {
  const
 
searchParams = new URLSearchParams(params);
  const response = await fetch(`${API_BASE_URL}${url}?${searchParams.toString()}`, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch from TMDB: ${response.statusText}`);
  }
  return response.json();
}

export async function getPopularMovies() {
  const data = await fetchFromTMDB('/movie/popular', { language: 'en-US', page: '1' });
  return data.results as Movie[];
}

export async function searchMovies(query: string, genre: string, year: string, rating: string) {
  let movies;
  if (query) {
    const data = await fetchFromTMDB('/search/movie', { query, language: 'en-US', page: '1', include_adult: 'false' });
    movies = data.results;
  } else {
    const params: Record<string,string> = {
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      include_adult: 'false',
    }
    if (year && year !== 'all') params.primary_release_year = year;
    if (rating && rating !== 'all') params['vote_average.gte'] = rating;
    if (genre && genre !== 'all') params.with_genres = genre;

    const data = await fetchFromTMDB('/discover/movie', params);
    movies = data.results;
  }
  return movies as Movie[];
}


export async function getMovieDetails(id: string): Promise<Movie> {
  return fetchFromTMDB(`/movie/${id}`, { append_to_response: 'videos,credits' });
}

export async function getGenres(): Promise<Genre[]> {
    const data = await fetchFromTMDB('/genre/movie/list', { language: 'en' });
    return data.genres;
}
