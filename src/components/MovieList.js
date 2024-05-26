import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
    if(movies==null)
        {
            return;
        }
  return (
    <div className="mx-9 my-10">

         <h1 className="text-white font-bold text-lg lg:text-3xl ">{title}</h1>
        
        <div className="flex overflow-x-scroll no-scrollbar">
              
            <div className="flex gap-3">
                
                {movies.map((movie)=> <MovieCard key={movie.id} poster_path={movie?.poster_path}/>)}

            </div>

        </div>
        
        
    </div>
  )
}

export default MovieList