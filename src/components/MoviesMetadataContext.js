import React, { createContext, useState, useContext } from 'react';

const MoviesMetadataContext = createContext(true);

export const useMoviesMetadata = () => {
  return useContext(MoviesMetadataContext);
};

export const MoviesMetadataProvider = ({ children }) => {

  const [cities, setCities] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  return (
    <MoviesMetadataContext.Provider value={{ cities, movies, theatres, setCities, setMovies, setTheatres }}>
      {children}
    </MoviesMetadataContext.Provider>
  );
};