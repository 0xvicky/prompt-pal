"use client";
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {signIn, signOut, useSession, getProviders} from "next-auth/react";

const Navbar = () => {
  // const isUserLoggedIn = true;
  const {data: session} = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleSignOut = () => {
    signOut();
  };
  useEffect(() => {
    console.log(session);
    if (!session) return router.push("/auth");
    else if (session) return router.push("/");
  }, [session]);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link
        href='/'
        className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo2.png'
          alt='Prompt Pal Logo'
          className=''
          width={70}
          height={70}
        />
        <p className='logo_text'>Promptioner</p>
      </Link>
      {/*Desktop Navigation*/}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link
              href='/create-prompt'
              className='black_btn'>
              Create Prompt
            </Link>
            <button
              type='button'
              className='outline_btn'
              onClick={handleSignOut}>
              Sign Out
            </button>
            <Link href='/profile'>
              <Image
                className='rounded-full'
                src={session?.user?.image}
                alt='Profile'
                width={40}
                height={40}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  type='button'
                  className='black_btn'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/*Mobile Navigation*/}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user?.image}
              width={40}
              height={40}
              className='rounded-full'
              onClick={() => {
                setToggleDropDown(prev => !prev);
              }}
              alt='profile'
            />
            {toggleDropDown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => {
                    setToggleDropDown(false);
                  }}>
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => {
                    setToggleDropDown(false);
                  }}>
                  Create Prompt
                </Link>
                <button
                  type='button'
                  className='mt-5 w-full black_btn'
                  onClick={() => {
                    setToggleDropDown(false);
                    handleSignOut();
                  }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(prov => {
                <button
                  type='button'
                  className='black_btn'
                  key={prov.name}
                  onClick={() => handleSignIn(prov.id)}>
                  Sign In
                </button>;
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
