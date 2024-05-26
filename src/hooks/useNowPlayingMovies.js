import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { options } from "../utils/constants";




    const useNowPlayingMovies= ()=>{
        const dispath= useDispatch();
        const getNowPlayingMovies= async ()=>{
            const data= await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',options);
    
            const response= await data.json();
            dispath(addNowPlayingMovies(response?.results));
            
           
    
    
        }
    
        useEffect(()=>{
            getNowPlayingMovies();
        },[]);
    }

    export default useNowPlayingMovies;

    