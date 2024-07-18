import { useState, useEffect, useRef, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

const buildClassScore = movieScore => {
  return clsx(
    movieScore > 7 && css.scoreGood,
    movieScore <= 7 && movieScore >= 5 && css.scoreNeutral,
    movieScore < 5 && css.scoreBad,
    css.scoreTextShadow
  );
};

export default function MovieDetailsPage({ options, defImg }) {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        setMovie(response.data);
      } catch (err) {
        console.error('Fetch error: ', err);
      }
    };
    fetchMovieDetails();
  }, [options, movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <Link className={css.back} to={backLinkHref.current}>
        Back
      </Link>

      <div className={css.movieDiv}>
        <div>
          <img
            width="250"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defImg
            }
            alt="Movie poster"
            loading="lazy"
          />
        </div>
        <div className={css.detailsDiv}>
          <h2>{movie.title}</h2>
          <p className={buildClassScore(movie.vote_average)}>
            User score: {movie.vote_average}
          </p>
          <ul>
            <li>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={css.addInfo}>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
