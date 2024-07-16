import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage({ options }) {
  const [movies, setMovies] = useState([]);

  const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

  useEffect(() => {
    axios
      .get(url, options)
      .then(response => setMovies(response.data.results))
      .catch(err => console.error('Fetch error: ', err));
  }, [url, options]);

  return <MovieList movies={movies} />;
}
