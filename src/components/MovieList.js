import React, { useEffect, useState } from 'react';
import '../styles/MoviesList.css';
import { Link } from 'react-router-dom';
import { useMoviesMetadata } from './MoviesMetadataContext';

// Helper function to calculate date range in a single line format
const getDateRange = () => {
  const today = new Date();
  const dueDate = new Date(today);
  dueDate.setDate(today.getDate() + 7);
  const formatDate = (date) =>
    date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }); // Format: DD/MM/YYYY
  return `${formatDate(today)} - ${formatDate(dueDate)}`;
};

const MovieList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const { movies, cities, theatres, setMovies, setCities, setTheatres } = useMoviesMetadata();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const citiesResponse = await fetch('http://localhost:8082/cities');
        if (!citiesResponse.ok) {
          throw new Error('Failed to fetch cities');
        }
        const citiesData = await citiesResponse.json();
        
        const moviesResponse = await fetch('http://localhost:8082/movies');
        if (!moviesResponse.ok) {
          throw new Error('Failed to fetch movies');
        }
        const moviesData = await moviesResponse.json();

        const theatresResponse = await fetch('http://localhost:8082/theatres');
        if (!theatresResponse.ok) {
          throw new Error('Failed to fetch theatres');
        }
        const theatresData = await theatresResponse.json();

        setCities(citiesData)
        setMovies(moviesData)
        setTheatres(theatresData)
        console.log("Data loaded");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dateRange = getDateRange();
  const display = (time) => {
    const hours = Math.trunc(time/60);
    const minutes = time % 60;
    let result = hours?hours + " Hrs ":"";
    result = result + minutes?minutes + " Mins":""
    return result;
  }
  return (
    <div className="movie-container">
      <h1>Available Movies</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={"data:image/jpeg;base64,"+movie.poster} alt={movie.name} />
            <div className="movie-info">
              <h2>{movie.name}</h2>
              
              <p>{movie.description}</p>
              <p><strong>Duration: </strong> {display(movie.duration)}</p>
              <Link to={`/book/${movie.id}`} className="movie-button">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
