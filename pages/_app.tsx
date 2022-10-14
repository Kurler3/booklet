import type { AppProps } from 'next/app';
import { memo, useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/ApolloClient';
import LeftSideBar from '../components/LeftSideBarComponents/LeftSideBar';
import useAuthStore from '../store/authStore';
import { NORMAL_PURPLE, USER_TOKEN } from '../utils/constants';
import Head from 'next/head';
import jwt from 'jsonwebtoken';
import { CustomJWTPayload } from '../types/authTypes';
import { ToastContainer } from 'react-toastify';

// STYLES
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'
import useAppStore from '../store/appStore';
import { Circles } from 'react-loader-spinner';


function MyApp({ Component, pageProps }: AppProps) {

  const [isSSR, setIsSSR] = useState(true);

  // GET USER PROFILE FROM ZUSTAND
  const { userProfile, addUser } = useAuthStore();

  // GET LOADING FROM APP STORE
  const { appLoading } = useAppStore();

  // CHECK IF IN NOT IN SERVER SIDE
  useEffect(() => {
    setIsSSR(false);
  }, []);

  // CHECK IF USER IS LOGGED IN FROM JWT
  useEffect(() => {

    const localJwt = localStorage.getItem(USER_TOKEN);

    // IF THERE'S A JWT AND THE USER IS NOT LOGGED IN THE STATE
    if (localJwt && localJwt.length > 0 && !userProfile) {
      // DECODE JWT TO GET THE USER DATA
      const userData = jwt.decode(localJwt) as CustomJWTPayload;

      // IF HAS EXPIRED
      if (userData.exp < (new Date().getTime() + 1) / 1000) {
        // SET LOCAL STORAGE TO EMPTY
        localStorage.setItem(USER_TOKEN, '');
      }
      else {
        // IF HASN'T EXPIRED YET, THEN DISPATCH LOG IN STATE ACTION
        addUser({ ...userData, token: localJwt });
      }

    }

  }, [addUser, userProfile]);

  // IF IS IN SERVER SIDE, THEN DON'T DISPLAY FRONT-END
  if (isSSR) return null;

  // IN CLIENT SIDE
  return (
    <ApolloProvider client={apolloClient}>

      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Booklet</title>
      </Head>

      <div className='relative w-screen h-screen flex items-center justify-start'>

        {/* LEFT SIDE BAR */}
        <LeftSideBar />

        <div className='flex-1 h-full'>
          {/* MAIN CONTENT */}
          <Component
            userProfile={userProfile}
            {...pageProps}
          />
        </div>


        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />

        {
          appLoading &&
          <div className="top-0 left-0 absolute backdrop-blur-[2px] flex justify-center items-center w-full h-full">

            {/* SPINNER */}
            <Circles
              color={NORMAL_PURPLE}
              height={150}
              width={150}
            />

          </div>
        }
      </div>
    </ApolloProvider>
  );
}

export default memo(MyApp);
