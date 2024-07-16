import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import NotFoundPage from '../../pages/NotFoundPage';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews')
);

export default function App() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2QxNGY4NzIxZjgxZTRkMDJkZjM0ZTkwYmM2M2RiOSIsIm5iZiI6MTcyMDkxNDkzNi40Mzc2NTUsInN1YiI6IjY2OTMxMGRkZGNiNmJiZGVhZDkwNzRjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CUeYUXVqiD2Z1eUsFEGVmWqYSwb17THg3S1SrHIZUtU',
    },
  };

  const defImg = 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

  return (
    <div>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage options={options} />} />
          <Route path="/movies" element={<MoviesPage options={options} />} />
          <Route
            path="/movies/:movieId"
            element={<MovieDetailsPage options={options} defImg={defImg} />}
          >
            <Route
              path="cast"
              element={<MovieCast options={options} defImg={defImg} />}
            ></Route>
            <Route
              path="reviews"
              element={<MovieReviews options={options} />}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
