import { useRef, useState } from "react"
import Header from "./Header"
import { Validate } from "../utils/Validate";
import {auth} from "../utils/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";




const Login=()=>{

      const [isSignIn,setIsSignIn]= useState(true);
      const [errorMessage,setErrorMessage]= useState(null);
      const name= useRef();
      const email= useRef();
      const password= useRef();
      const navigate= useNavigate();
      const dispath= useDispatch();


      const toggle= ()=>{
        setIsSignIn(!isSignIn);
      };

      const signInButton=()=>{

       
       const message=  Validate(email.current.value, password.current.value);
       setErrorMessage(message);

       if(message)
        {
          return;
        }
        

        if(!isSignIn)
          {
                      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
                  updateProfile(user, {
                    displayName: name.current.value ,email:email.current.value, 
                  }).then(() => {
                    const {email,displayName,uid}= auth.currentUser;
                      dispath(addUser({uid:uid, displayName:displayName,email:email}))
                      navigate("/browse");
                  
                    
                  }).catch((error) => {
                    
                  });
              
                     
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+"- "+ errorMessage);
              // ..
            });
          }
          else{

            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              // navigate("/browse");
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode+"- "+ errorMessage);
            });

          }
        
      }



    return (
        <div className="w-full h-full">
             <Header/>

             <img className="absolute w-full h-full object-cover"
             
              src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
             alt="background" />

             <div className="absolute  bg-black bg-opacity-80 z-20 left-[39%] top-[5.19rem] w-[25rem] h-[38rem] flex flex-col justify-center items-center gap-7 p-10">  

                <h1 className="text-white font-bold text-4xl">{!isSignIn?"Sign Up":"Log In"}</h1>

                 <form onSubmit={(e)=>
                
                   e.preventDefault()} className="flex flex-col gap-6 w-[100%] text-white">              

                        {!isSignIn && <input ref={name} type="text" placeholder="Name" className="rounded-md p-1 bg-gray-800">       
                               
                             </input>}
                         <input  ref={email} type="email" placeholder="Email" className=" rounded-md p-1 bg-gray-800 h-12 " >

                         </input>

                         <input ref={password} type="password" placeholder="Password" className=" rounded-md p-1 bg-gray-800 h-12">
                         
                         </input>

                         <p className="font-bold text-md py-1 text-red-600 " >{errorMessage}</p>

                         <button className="  p-2 rounded-lg   font-semibold text-white " onClick={signInButton} >

                    <a href="" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md ">
<span class="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
<span class="relative px-6 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
<span class="relative text-white"> {isSignIn?"Log In":"Create Account"}</span>
</span>
</a>
                     
                    </button>

                         {/* <button className="bg-red-700 rounded-md my-2 py-1 h-12 text-lg font-semibold" onClick={signInButton}>      
                            
                            {isSignIn?"Log In":"Create Account"}
                            

                         </button> */}

                         <p className="text-white cursor-pointer" onClick={toggle}>{isSignIn?"Not Registered ? Sign Up":"Already customer? Log IN"}</p>



                         
                 </form>

                 
             </div>

             

             


        </div>
    )
}

export default Login