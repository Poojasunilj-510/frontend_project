import React from 'react';
import { Box, Image, Heading, Text, Badge, Flex } from '@chakra-ui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { Movie } from '../types';
import { useMovies } from '../hooks/use-movies';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const isMovieFavorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      transition="transform 0.3s"
      _hover={{ transform: 'scale(1.02)' }}
    >
      <Box position="relative">
        <RouterLink to={`/movies/${movie.id}`}>
          <Image
            src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={movie.title}
            height="300px"
            width="100%"
            objectFit="cover"
          />
        </RouterLink>
        <Box position="absolute" top="4" right="4">
          {isMovieFavorite ? (
            <FaHeart 
              onClick={handleFavoriteClick} 
              color="red" 
              size={24} 
              cursor="pointer" 
            />
          ) : (
            <FaRegHeart 
              onClick={handleFavoriteClick} 
              color="gray" 
              size={24} 
              cursor="pointer" 
            />
          )}
        </Box>
      </Box>

      <Box p="4">
        <RouterLink to={`/movies/${movie.id}`}>
          <Heading size="md" mb="2" truncate>
            {movie.title}
          </Heading>
        </RouterLink>

        <Text fontSize="sm" color="gray.600" mb="2">
          Directed by {movie.director}
        </Text>

        <Flex align="center" mb="2">
          <Text fontSize="sm" mr="2">
            {movie.releaseYear}
          </Text>
          <Text fontSize="sm" mr="2">
            •
          </Text>
          <Text fontSize="sm">
            {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
          </Text>
        </Flex>

        <Flex wrap="wrap" gap="2" mb="2">
          {movie.genre.map((genre, index) => (
            <Badge key={index} colorScheme="teal" borderRadius="full" px="2">
              {genre}
            </Badge>
          ))}
        </Flex>

        <Flex align="center">
          <Badge colorScheme={movie.rating >= 4 ? 'green' : 'orange'} fontSize="sm">
            {movie.rating.toFixed(1)}
          </Badge>
        </Flex>
      </Box>
    </Box>
  );
};

export default MovieCard;