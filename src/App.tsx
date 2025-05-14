import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MoviesProvider } from './context/movies-context';
import Layout from './components/layout';
import HomePage from './pages/home-page';
import FavoritesPage from './pages/favorites-page';
import MovieDetailPage from './pages/movie-detail-page';

function App() {
  return (
    <ChakraProvider>
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
