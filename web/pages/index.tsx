// index.js
import type { NextPage } from 'next'
import Head from 'next/head'


const Home : NextPage = () => {
  return (
    <div>
    <Head>
    <title>The Blog.</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>

    <div><p className='text-green-600'>Index</p></div>
    </div>
  )
}

export default Home