export interface Movie {
    id: string;
    title: string;
    director: string;
    releaseYear: number;
    genre: string[];
    rating: number;
    duration: number; // in minutes
    posterUrl?: string;
    description?: string;
  }
  
  export interface MoviesContextType {
    movies: Movie[];
    favorites: Movie[];
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (movieId: string) => void;
    isFavorite: (movieId: string) => boolean;
    searchMovies: (query: string) => void;
    loading: boolean;
    error: string | null;
  }