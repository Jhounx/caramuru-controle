import type {AppProps} from 'next/app'
import Head from 'next/head'
import {ChakraProvider} from '@chakra-ui/react'
import {MainProvider} from '../components/MainProvider'
import '../styles/globals.css'

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <ChakraProvider>
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
      <MainProvider>
        <Component {...pageProps} />
      </MainProvider>
    </ChakraProvider>
  )
};

export default MyApp