import React from 'react';
import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MoviesProvider } from './context/movies-context';
import Layout from './components/layout';
import HomePage from './pages/home-page';
import FavoritesPage from './pages/favorites-page';
import MovieDetailPage from './pages/movie-detail-page';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#e6f5ff',
      100: '#b3d9ff',
      200: '#80bdff',
      300: '#4da0ff',
      400: '#1a85ff',
      500: '#006ae6',
      600: '#0052b3',
      700: '#003980',
      800: '#00214d',
      900: '#00081a',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MoviesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/movies/:movieId" element={<MovieDetailPage />} />
            </Routes>
          </Layout>
        </Router>
      </MoviesProvider>
    </ChakraProvider>
  );
}

export default App;
