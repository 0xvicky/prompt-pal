"use client";

import React, {useState, useEffect} from "react";
import {signIn, getProviders} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [providers, setProviders] = useState();

  useEffect(() => {
    const handleProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    handleProvider();
  }, []);

  //   console.log(providers);
  const handleSubmit = () => {
    return;
  };
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='mt-2 font-extrabold text-5xl sm:text-6xl bg-gradient-to-r from-purple-800 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent'>
        Authentication
      </h1>
      <form
        onSubmit={handleSubmit}
        className='mt-8 w-full max-w-2xl flex flex-col gap-5 glassmorphism'>
        {isSignUp && (
          <div className='flex justify-between gap-4'>
            <label className='w-1/2'>
              <span className='font-satoshi font-semibold text-base text-gray-700 '>
                First Name
              </span>
              <input
                placeholder='First Name'
                required
                className='form_input'
              />
            </label>
            <label className='w-1/2'>
              <span className='font-satoshi font-semibold text-base text-gray-700'>
                Last Name
              </span>
              <input
                placeholder='Last Name'
                required
                className='form_input'
              />
            </label>
          </div>
        )}
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Email
          </span>
          <input
            placeholder='Enter Email'
            required
            className='form_input'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Password
          </span>
          <input
            placeholder='Enter Password'
            required
            className='form_input'
          />
        </label>
        {isSignUp && (
          <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
              Confirm Password
            </span>
            <input
              placeholder='Confirm Password'
              required
              className='form_input'
            />
          </label>
        )}
        <div className='flex-between mx-3 mb-5 gap-4'>
          <button
            type='button'
            className='text-gray-600'
            onClick={e => {
              e.preventDefault();
              setIsSignUp(prev => !prev);
            }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <span className='pl-2 py-1.5 text-base bg-gradient-to-br from-purple-800 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent font-bold rounded-full '>
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </button>
          <button
            type='submit'
            className='px-5 py-1.5 text-sm bg-gradient-to-br from-purple-800 via-fuchsia-500 to-violet-500 rounded-md text-white'>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </div>
        {providers &&
          Object.values(providers).map(provider => (
            <button
              type='button'
              key={provider.name}
              onClick={() => {
                signIn(provider.id);
              }}
              className='flex justify-center items-center gap-4 text-gray-600 bg-white py-1 rounded-md shadow-xl shadow-gray-200'>
              {`Sign In with ${provider.name}`}{" "}
              {provider.name === "GitHub" ? (
                <FaGithub fontSize={25} />
              ) : (
                <FcGoogle fontSize={25} />
              )}
            </button>
          ))}
      </form>
    </section>
  );
};

export default Auth;
