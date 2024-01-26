import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({title, movies}) => {

    return (
    <div className='px-6 text-white'>
      <h1 className='text-3xl py-4'>{title}</h1>
      <div className='flex overflow-x-scroll no-scrollbar '>
        <div className='flex'>
          {movies?.map(movie => <MovieCard key={movie.id} posterPath={movie.poster_path} /> )}          
        </div>
      </div>
    </div>
  );
};

export default MovieList;
