import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Movie, MoviesContextType } from '../types';
import { getMovies, searchMoviesByTitle } from '../services/api';

// Create context with default values
export const MoviesContext = createContext<MoviesContextType>({
  movies: [],
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isFavorite: () => false,
  searchMovies: () => {},
  loading: false,
  error: null,
});

interface MoviesProviderProps {
  children: ReactNode;
}

export const MoviesProvider: React.FC<MoviesProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load movies from API on component mount
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await getMovies();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('movieFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add a movie to favorites
  const addToFavorites = (movie: Movie) => {
    if (!isFavorite(movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  // Remove a movie from favorites
  const removeFromFavorites = (movieId: string) => {
    setFavorites(favorites.filter((movie) => movie.id !== movieId));
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId: string): boolean => {
    return favorites.some((movie) => movie.id === movieId);
  };

  // Search movies by title
  const searchMovies = async (query: string) => {
    if (query.trim() === '') {
      // If query is empty, fetch all movies
      try {
        setLoading(true);
        const data = await getMovies();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const data = await searchMoviesByTitle(query);
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to search movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        searchMovies,
        loading,
        error,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};