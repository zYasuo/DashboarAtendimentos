import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import setAuthToken from './services/Firebase/Token/TokenFirebase';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setAuthToken();
  }, []);


  return (
    <Component {...pageProps} />

  );
}
