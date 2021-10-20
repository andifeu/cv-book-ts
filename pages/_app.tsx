import type { AppProps } from 'next/app';

import { DataContextProvider } from '../context/DataContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <DataContextProvider>
            <Component {...pageProps} />
        </DataContextProvider>
    );
}
export default MyApp;
