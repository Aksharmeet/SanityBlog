// index.js
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import sanityClient from "../sanity"

import { Post } from "../typings"

interface Props {
  posts: Post[]
}
const Home : NextPage = ({posts}: Props) => {

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



export const getServerSideProps: GetServerSideProps = async() =>  {
  const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    author -> {
      name,
      image
    },
      description,
      mainImage,
      slug
  }
  `
  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}