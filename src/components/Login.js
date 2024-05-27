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

             <img className="absolute w-full h-full object-cover contrast-125 brightness-105 "
             
              src="https://deeplor.s3.us-west-2.amazonaws.com/upload/2024/05/27/5bb0d519b4714b9c8de1e61b3eca9e68.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240527T185909Z&X-Amz-SignedHeaders=host&X-Amz-Expires=10800&X-Amz-Credential=AKIAROYXHKZUSZONTWIG%2F20240527%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=911c525972878532ebf74e30547f721d81b06040deb9c609ed68f9c83efe5a17"
             alt="background" />

             <div className="absolute  bg-black bg-opacity-60 z-20 left-[39%] top-[5.19rem] w-[25rem] h-[38rem] flex flex-col justify-center items-center gap-7 p-10 pt-1  shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]  ">  

                <h1 className="text-white font-bold text-4xl">{!isSignIn?"Sign Up":"Log In"}</h1>

                 <form onSubmit={(e)=>
                
                   e.preventDefault()} className="flex flex-col gap-6 w-[100%] text-white">              

                        {!isSignIn && <input ref={name} type="text" placeholder="Name" className="rounded-md p-1 bg-gray-800 h-12 ">       
                               
                             </input>}
                         <input  ref={email} type="email" placeholder="Email" className=" rounded-md p-1 bg-gray-800 h-12 " >

                         </input>

                         <input ref={password} type="password" placeholder="Password" className=" rounded-md p-1 bg-gray-800 h-12 ">
                         
                         </input>

                         <p className="font-bold text-md py-1 text-red-600 " >{errorMessage}</p>

                         <button className=" w-[10rem]  rounded-lg    font-semibold text-white mx-auto " onClick={signInButton} >

                                <a href="" className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md w-[100%] ">
                                    <span class="w-[100%] h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                                    <span class="w-[100%] relative px-6 py-2 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                                          <span class="relative text-white">
                                             {isSignIn?"Log In":"Create Account"}
                                          </span>
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