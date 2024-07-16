import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';

export default function MoviesPage({ options }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchMovieName = searchParams.get('name') ?? '';

  const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`;

  const fetchMovies = async () => {
    try {
      const response = await axios.get(url, options);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const movieName = form.elements.movieName.value;
    setQuery(movieName);
  };

  useEffect(() => {
    if (query !== '') {
      fetchMovies();
    }
  }, [query]);

  const updateQueryString = name => {
    const nextParams = name !== '' ? { name } : {};
    setSearchParams(nextParams);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movieName"
          value={searchMovieName}
          onChange={e => updateQueryString(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <MovieList movies={movies} />
    </>
  );
}
