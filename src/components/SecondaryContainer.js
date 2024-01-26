import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);



  return (
    movies.nowPlayingMovies && (
      <div className='bg-black'>
        <div className='mt-0 pl-4 md:ml-12 relative z-20 md:-mt-96 '>
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
          <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
        </div>
        {/**
         * MovieList - Popular
         * MovieList * n
         * MovieList - Now Playing
         * MovieList - Trending
         * MovieList - Horror
         * 
         * 
         */}
      </div>
    )
  );
};

export default SecondaryContainer;
