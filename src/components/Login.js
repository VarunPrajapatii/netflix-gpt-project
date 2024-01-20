import React, { useState } from 'react'
import Header from './Header';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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
      <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {
          !isSignInForm && (
          <input 
            className='p-4 my-4 w-full bg-gray-600'
            type='text'
            placeholder='Full Name'
          />
        )}
        <input 
          className='p-4 my-4 w-full bg-gray-600'
          type='text'
          placeholder='Email Address'
        />

        <input 
          className='p-4 my-4 w-full bg-gray-600'
          type='password'
          placeholder='Password'
        />
        <button className='p-4 my-7 bg-red-700 w-full rounded-lg font-semibold'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
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