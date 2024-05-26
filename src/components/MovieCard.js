import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({poster_path}) => {
  if(poster_path==null)
    {
      return;
    }
  return (
    <div className="w-24  lg:w-40" >
       
        <img className="rounded-lg" src={IMG_CDN_URL+ poster_path} alt="movie"/>

    </div>
  )
}

export default MovieCard