import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import genAI from '../utils/openai'
import { options } from '../utils/constants'
import { addGptMovies } from '../utils/gptSlice'








const GptSearchBar = () => {

  const langKey= useSelector((store)=>store.config.lang);
  const searchText= useRef(null);
  const dispatch= useDispatch();

  const searchMovieTMDB= async (movie)=>{
   const data= await fetch('https://api.themoviedb.org/3/search/movie?query='+movie, options)
   const response=await data.json();
  //  console.log(response.results);
   return response.results;
  }
  const handleGptSearchClick= async ()=> {


    const modified_query= "please act as a movie recomendation system and give me 6 names of " +searchText.current.value+" Plese only provide the names of the movie and nothing else and the movies name should be comma separated and dont provide the link";
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

    
  
    const result = await model.generateContent(modified_query);
    
    const response =   result.response;
    // console.log(response);
    const text = response.text();
    console.log(text);
    const gptMovies= text.split(",");

    console.log(gptMovies);

    const promiseArray=  gptMovies.map((movie)=>searchMovieTMDB(movie));

    const tmdbMovies= await  Promise.all(promiseArray);
    console.log(tmdbMovies);
    dispatch(addGptMovies({moviesNames:gptMovies, moviesResults:tmdbMovies}));


    
    



  }
  return (
    <div className="pt-[8%] flex justify-center mb-4 rounded-3xl " >
        <form className=" grid grid-cols-12 bg-black w-1/2" onSubmit={(e)=>{
          e.preventDefault();
        }}>
            <input ref={searchText} type="text" className="p-4 m-4 col-span-9 rounded-lg" placeholder={lang[langKey].gptPlaceholder}/>
            <button className="col-span-3 m-4 py-2 px-4 bg-red-700 rounded-lg" onClick={handleGptSearchClick}>
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar