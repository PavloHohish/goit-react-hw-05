import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieCast({ options, defImg }) {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(url, options);
        setCast(response.data.cast);
      } catch (err) {
        console.error('Fetch error: ', err);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  if (cast.length === 0) return <div>Loading...</div>;

  return (
    cast.length > 0 && (
      <ul>
        {cast.map(artist => (
          <li key={artist.id}>
            <img
              width="100"
              src={
                artist.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${artist.profile_path}`
                  : defImg
              }
              alt="Artist photo"
              loading="lazy"
            />
            <p>{artist.name}</p>
            <p>Character: {artist.character}</p>
          </li>
        ))}
      </ul>
    )
  );
}
