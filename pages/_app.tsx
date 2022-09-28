import '../styles/globals.css'
import type { AppProps } from 'next/app';

import {memo, useState, useEffect} from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => { 

    setIsSSR(false);

  }, []);

  
  if(isSSR) return null;

  return <Component {...pageProps} />
}

export default memo(MyApp);
