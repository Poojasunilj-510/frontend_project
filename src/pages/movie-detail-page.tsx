import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Badge,
  IconButton,
  ButtonProps,
  IconButtonProps,
} from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { FaHeart, FaRegHeart, FaArrowLeft } from 'react-icons/fa';

import { Movie } from '../types';
import { getMovieById } from '../services/api';
import { useMovies } from '../hooks/use-movies';
import LoadingSpinner from '../components/loading-spinner';

const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movie details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFavoriteClick = () => {
    if (!movie) return;

    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !movie) {
    return (
      <Container maxW="container.lg" py="8">
        <Button
          {...({
            leftIcon: <FaArrowLeft />,
            onClick: handleGoBack,
            mb: 4,
            children: 'Go Back',
          } as ButtonProps)}
        />
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error || 'Movie not found'}
        </Alert>
      </Container>
    );
  }

  const isMovieFavorite = isFavorite(movie.id);

  return (
    <Container maxW="container.lg" py="8">
      <Button
        {...({
          leftIcon: <FaArrowLeft />,
          onClick: handleGoBack,
          mb: 6,
          children: 'Go Back',
        } as ButtonProps)}
      />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap="8"
        align={{ base: 'center', md: 'flex-start' }}
      >
        <Box
          width={{ base: '100%', md: '300px' }}
          maxW="300px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
        >
          <Image
            src={
              movie.posterUrl ||
              'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={movie.title}
            width="100%"
            height="auto"
            objectFit="cover"
          />
        </Box>

        <Box flex="1">
          <Flex justify="space-between" align="center" mb="4">
            <Heading size="xl">{movie.title}</Heading>
            <IconButton
              {...({
                'aria-label': isMovieFavorite
                  ? 'Remove from favorites'
                  : 'Add to favorites',
                icon: isMovieFavorite ? <FaHeart /> : <FaRegHeart />,
                colorScheme: isMovieFavorite ? 'red' : 'gray',
                onClick: handleFavoriteClick,
                size: 'lg',
              } as IconButtonProps)}
            />
          </Flex>

          <Flex wrap="wrap" gap="2" mb="4">
            <Badge fontSize="md" colorScheme="teal">
              {movie.releaseYear}
            </Badge>
            <Badge fontSize="md" colorScheme="purple">
              {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
            </Badge>
            <Badge
              fontSize="md"
              colorScheme={movie.rating >= 4 ? 'green' : 'orange'}
            >
              Rating: {movie.rating.toFixed(1)}
            </Badge>
          </Flex>

          <Text fontSize="lg" fontWeight="bold" mb="2">
            Director: {movie.director}
          </Text>

          <Box mb="4">
            <Text fontWeight="bold" mb="2">
              Genres:
            </Text>
            <Flex wrap="wrap" gap="2">
              {movie.genre.map((genre, index) => (
                <Badge key={index} colorScheme="blue" fontSize="md">
                  {genre}
                </Badge>
              ))}
            </Flex>
          </Box>

          {movie.description && (
            <Box mb="4">
              <Text fontWeight="bold" mb="2">
                Description:
              </Text>
              <Text>{movie.description}</Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default MovieDetailPage;
