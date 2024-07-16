import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieReviews({ options }) {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(url, options);
        setReviews(response.data.results);
      } catch (err) {
        console.error('Fetch error: ', err);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>{review.author}</li>
          ))}
        </ul>
      ) : (
        <p>We don&#39;t have any reviews for this movie</p>
      )}
    </>
  );
}
