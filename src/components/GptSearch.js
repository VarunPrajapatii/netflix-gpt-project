import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
      <div className='-z-10 fixed'>
        <img className='h-screen object-cover  md:h-fit' src={BG_IMG_URL} alt = "bg-img-login" />
      </div >
      <div className=''>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
