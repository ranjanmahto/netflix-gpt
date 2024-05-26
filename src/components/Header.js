import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/languageConstants";
import { changeLanguage } from "../utils/configSlice";

const Header= ()=>{

    const dispath = useDispatch();
    const navigate= useNavigate();
    

    const user= useSelector((appStore)=>appStore.user)

   

    const handleSignOut= ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            dispath(removeUser());
            // navigate("/");


          }).catch((error) => {
            // An error happened.
          });
    };

    const handleGptSearchClick= ()=>{
      dispath(toggleGptSearchView());
      

    }
    const handleLanguageChange=(e)=>{
      
      dispath(changeLanguage(e.target.value));
    }

    


    useEffect(()=>{


       const unsubscribe= onAuthStateChanged(auth, (user) => {
            if (user) {
              
              const {uid,email,displayName} = user;
    
              dispath(addUser({uid:uid, email:email, displayName:displayName}));
              navigate("/browse");
    
    
              
            } else {
    
                dispath(removeUser())
                navigate("/");
              
            }
          });

          

          return ()=> unsubscribe();
                 
              
       },[]);
    return (
        <div className=" absolute  w-screen bg-gradient-to-b from-black z-10 flex justify-between px-4">
            <div className="w-44">
                    <img className="w-48"
                    src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
                    alt="logo"/>

            
            </div>

           {user && <div className=" z-10 mx-5 my-3 flex flex-col lg:flex-row  justify-between gap-2 cursor-pointer" >


              <select className=" w-15 h-5 md:w-20 md:h-8 rounded-md" onChange={handleLanguageChange}>
                 {SUPPORTED_LANGUAGES.map((lang)=>  <option value={lang.identifier} key={lang.identifier}>{lang.name}</option>)}
              </select>

                 <button className=" w-14   md:w-40 md:h-10 p-2 rounded-lg bg-purple-600 mr-5 " onClick={handleGptSearchClick} >
                   GPT Search
                 </button>

           
                    <img className="w-9 h-9" onClick={handleSignOut} 
                    src="https://cdn-icons-png.flaticon.com/512/1053/1053210.png" 
                    alt="logout icon"/>

                    <p className="text-white font-bold" onClick={handleSignOut} >Sign Out</p>

            </div>}
        

        </div>
    )
}

export default Header