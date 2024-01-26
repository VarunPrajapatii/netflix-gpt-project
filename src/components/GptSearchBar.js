import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  //Search movie in TMDB
  const searchMovieTBDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ 
      movie +
      '&include_adult=false&language=en-US&page=1', API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  }

  const handleGptSearchClick = async () => {
    //Make an API call to GPT API and get Movie Results

    const gptQuery = "Act as a Movie Recommendation and suggest some movies for the query"
      + searchText.current.value + 
      ". only give me names of 5 movies, comma separated. like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });
    if(!gptResults.choices) {
      // TODO: Write Error Handling
    }

    //Andaz Apna Apna, Chupke Chupke, Padosan, Hera Pheri, Chalti Ka Naam Gaadi
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    //["Andaz Apna Apna", " Chupke Chupke", " Padosan", " Hera Pheri", " Chalti Ka Naam Gaadi"]
    
    //For each Movie I will search TMDB API

    const promiseArray = gptMovies.map(movie => searchMovieTBDB(movie));
    //[Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));

  };

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className=' w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
        <input
          className='p-4 m-4 col-span-9'
          ref={searchText}
          type='text'
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button 
          className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
          onClick={handleGptSearchClick}
        >{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar;
