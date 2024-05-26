import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptSuggestions = () => {

  const {gptMovies, gptMoviesNames}= useSelector(store=>store.gpt);
  if(gptMoviesNames== null)
    {
      return;
    }

  return (
    <div className="  p-4 bg-black  text-white overflow-hidden ">
      <div>
        {gptMoviesNames.map((movie,index)=> <MovieList title={movie} movies={gptMovies[index]} />)}
      </div>
      
    </div>
  )
}

export default GptSuggestions