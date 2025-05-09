import React from 'react';
import { Box, Grid, Heading } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { useMovies } from '../hooks/use-movies';
import MovieCard from '../components/movie-card';
import LoadingSpinner from '../components/loading-spinner';

const HomePage: React.FC = () => {
  const { movies, loading, error } = useMovies();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        <AlertTitle>{error}</AlertTitle>
      </Alert>
    );
  }

  if (movies.length === 0) {
    return (
      <Box textAlign="center" py="10">
        <Heading size="md" color="gray.600">
          No movies found. Try a different search query.
        </Heading>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb="6">
        Browse Movies
      </Heading>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
          xl: 'repeat(5, 1fr)',
        }}
        gap="6"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;