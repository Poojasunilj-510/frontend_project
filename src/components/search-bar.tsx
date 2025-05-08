import React, { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useMovies } from '../hooks/use-movies';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchMovies } = useMovies();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(searchQuery);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      searchMovies('');
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ position: 'relative' }}>
      <Input
        placeholder="Search movies by title..."
        value={searchQuery}
        onChange={handleChange}
        borderRadius="full"
        size="md"
        paddingRight="40px"
      />
      <button
        type="submit"
        style={{
          position: 'absolute',
          right: '5px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: 'teal',
          color: 'white',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer'
        }}
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;