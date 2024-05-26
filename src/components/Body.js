import { RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom"
import Browse from "./Browse"
import Login from "./Login"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useDispatch } from "react-redux"
import { addUser, removeUser } from "../utils/userSlice"

const Body=()=>{
    const dispath= useDispatch();
    // const navigate= useNavigate();

const appRouter= createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "/browse",
        element: <Browse/>
    }
])


   

    return (

        <RouterProvider router={appRouter}>

        </RouterProvider>
    )
}

export default Body