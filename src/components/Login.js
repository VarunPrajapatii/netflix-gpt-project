import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value, name?.current?.value);
    setErrorMsg(message);
    if(message) return;

    //signin / signup
    if(!isSignInForm) {
      //Sign Up Logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: "https://avatars.githubusercontent.com/u/135434571?v=4"
          })
            .then(() => {
              const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid, 
                  email: email, 
                  displayName: displayName, 
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " - " + errorMessage);
        });
    } 
    else {
      //SignIn Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorCode + " - " + errorMessage);
      });
    }
  };

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img 
          src='https://assets.nflxext.com/ffe/siteui/vlv3/16006346-87f9-4226-bc25-a1fb346a2b0c/9662d0fd-0547-4665-b887-771617268815/IN-en-20240115-popsignuptwoweeks-perspective_alpha_website_large.jpg' 
          alt = "bg-img-login"
        />
      </div>
      <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80' onSubmit={(e) => e.preventDefault()}>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {
          !isSignInForm && (
          <input 
            className='p-4 my-4 w-full bg-gray-600'
            ref={name}
            type='text'
            placeholder='Full Name'
          />
        )}
        <input 
          className='p-4 my-4 w-full bg-gray-600'
          ref={email}
          type='text'
          placeholder='Email Address'
        />

        <input 
          className='p-4 my-4 w-full bg-gray-600'
          ref={password}
          type='password'
          placeholder='Password'
        />
        <p className='text-red-600 font-bold text-xl p-2 m-2'>{errorMsg}</p>
        <button 
          className='p-4 my-7 bg-red-700 w-full rounded-lg font-semibold'
          onClick={handleButtonClick}
        >{isSignInForm ? "Sign In" : "Sign Up"}</button>
        
        {isSignInForm ?
          <p className=' text-gray-500 pt-7'>New to Netflix? <span className='text-white cursor-pointer hover:underline' onClick={toggleSignInForm}>Sign up now</span>.</p>
        :
          <p className=' text-gray-500 pt-7'>Already Have Account? <span className='text-white cursor-pointer hover:underline' onClick={toggleSignInForm}>Sign In</span>.</p>
        }
      </form>
    </div>
  );
};

export default Login;
