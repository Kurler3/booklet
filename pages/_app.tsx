import '../styles/globals.css'
import type { AppProps } from 'next/app';
import {memo, useState, useEffect} from 'react';
import {  ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/ApolloClient';
import LeftSideBar from '../components/HomePage/LeftSideBarComponents/LeftSideBar';
import useAuthStore from '../store/authStore';
import { USER_TOKEN } from '../utils/constants';
import Head from 'next/head';
import jwt from 'jsonwebtoken';

function MyApp({ Component, pageProps }: AppProps) {

  const [isSSR, setIsSSR] = useState(true);

  // GET USER PROFILE FROM ZUSTAND
  const {userProfile, addUser} = useAuthStore();

  useEffect(() => { 
    setIsSSR(false);
  }, []);

  // CHECK IF USER IS LOGGED IN FROM JWT
  useEffect(() => {

    const localJwt = localStorage.getItem(USER_TOKEN);

    // IF THERE'S A JWT AND THE USER IS NOT LOGGED IN THE STATE
    if(localJwt && localJwt.length > 0 && !userProfile) {
      // DECODE JWT
      const userData = jwt.decode(localJwt);
      // IF HASN'T EXPIRED YET, THEN DISPATCH LOG IN STATE ACTION
      addUser(userData);
    }

  }, [addUser, userProfile]);

  // IF IS IN SERVER SIDE, THEN DON'T DISPLAY FRONT-END
  if(isSSR) return null;

  // IN CLIENT SIDE
  return (
    <ApolloProvider client={apolloClient}>

      <Head>
          <title>Booklet</title>
      </Head>

      <div className='w-screen h-screen flex items-center justify-start'>

        {/* LEFT SIDE BAR */}
        <LeftSideBar />

        <div className='flex-1 h-full'>
          {/* MAIN CONTENT */}
          <Component 
                userProfile={userProfile}
                {...pageProps}
          />
        </div>
        

      </div>
    </ApolloProvider>
  );
}

export default memo(MyApp);
