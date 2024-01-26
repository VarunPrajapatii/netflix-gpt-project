import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
      <div className='-z-10 fixed'>
        <img src={BG_IMG_URL} alt = "bg-img-login" />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
