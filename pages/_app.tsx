import '../styles/globals.css'
import type { AppProps } from 'next/app';
import {memo, useState, useEffect} from 'react';
import {  ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/ApolloClient';

function MyApp({ Component, pageProps }: AppProps) {

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => { 

    setIsSSR(false);

  }, []);

  
  if(isSSR) return null;

  return (
    <ApolloProvider client={apolloClient}>

      <div>

        {/* LEFT SIDE BAR */}


        {/* MAIN CONTENT */}
        <Component {...pageProps} />

      </div>
    </ApolloProvider>
  );
}

export default memo(MyApp);
