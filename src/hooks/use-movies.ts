import { useContext } from 'react';
import { MoviesContext } from '../context/movies-context';
import { MoviesContextType } from '../types';

export const useMovies = (): MoviesContextType => {
  const context = useContext(MoviesContext);
  
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  
  return context;
};