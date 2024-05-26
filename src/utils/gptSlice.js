import { createSlice } from "@reduxjs/toolkit";


const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        gptMovies:null,
        gptMoviesNames:null,
    },
    reducers:{
        toggleGptSearchView:(state)=>{
            state.showGptSearch= !state.showGptSearch;
        },
        addGptMovies:(state,action)=>{
            const {moviesNames, moviesResults}= action.payload;
            state.gptMovies= moviesResults;
            state.gptMoviesNames= moviesNames;
        },
        
    }
});

export default gptSlice.reducer
export const {toggleGptSearchView,addGptMovies,addGptMoviesNames}= gptSlice.actions;