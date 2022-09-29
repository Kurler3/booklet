import '../styles/globals.css'
import type { AppProps } from 'next/app';
import {memo, useState, useEffect} from 'react';
import {  ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/ApolloClient';
import LeftSideBar from '../components/HomePage/LeftSideBarComponents/LeftSideBar';
import useAuthStore from '../store/authStore';
import { USER_TOKEN } from '../utils/constants';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {

  const [isSSR, setIsSSR] = useState(true);

  // GET USER PROFILE FROM ZUSTAND
  const {userProfile} = useAuthStore();



  useEffect(() => { 
    setIsSSR(false);
  }, []);

  // CHECK IF USER IS LOGGED IN FROM JWT
  useEffect(() => {

    const localJwt = localStorage.getItem(USER_TOKEN);

    // IF THERE'S A JWT AND THE USER IS NOT LOGGED IN THE STATE
    if(localJwt && localJwt.length > 0 && !userProfile) {
      // DECODE JWT

      // IF HASN'T EXPIRED YET, THEN DISPATCH LOG IN STATE ACTION

    }

  }, [userProfile]);

  // IF IS IN SERVER SIDE, THEN DON'T DISPLAY FRONT-END
  if(isSSR) return null;

  // IN CLIENT SIDE
  return (
    <ApolloProvider client={apolloClient}>

      <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta charSet="utf-8" />
          <title>Booklet</title>
          <meta name="description" content="The best library management app." />
      </Head>

      <div className='w-screen h-screen flex items-center justify-start'>

        {/* LEFT SIDE BAR */}
        <LeftSideBar 
          userProfile={userProfile}
        />


        {/* MAIN CONTENT */}
        <Component 
          userProfile={userProfile}
          {...pageProps}
        />

      </div>
    </ApolloProvider>
  );
}

export default memo(MyApp);
