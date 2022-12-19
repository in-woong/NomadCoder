import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import LoginCheck from '@components/LoginCheck';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className='mx-auto w-full min-w-max max-w-xl'>
        <LoginCheck />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
