import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {    //This function returns an unsubscribe function 
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(
          addUser({
            uid: uid, 
            email: email, 
            displayName: displayName, 
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe when component unmounts
    return () => unsubscribe();

  }, []);



  return (
    <div className='w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img 
        className='w-44'
        alt="logo" 
        src= {LOGO} 
      />
      {user && (
        <div className='flex p-2'>
          <img 
            className='w-12 h-12'
            alt='usericon'
            src= {user?.photoURL}
          />
          <button 
            className='font-bold text-white'
            onClick={handleSignOut}
          >(Sign Out)</button>
        </div>
      )}
    </div>
  );
};

export default Header;
