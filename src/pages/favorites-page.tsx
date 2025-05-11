import React from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { useMovies } from '../hooks/use-movies';
import MovieCard from '../components/movie-card';

const FavoritesPage: React.FC = () => {
  const { favorites } = useMovies();

  if (favorites.length === 0) {
    return (
      <Box textAlign="center" py="10">
        <Heading size="lg" mb="4">
          My Favorites
        </Heading>
        <Text color="gray.600">
          You haven't added any movies to your favorites yet.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb="6">
        My Favorites
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
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
};

export default FavoritesPage;