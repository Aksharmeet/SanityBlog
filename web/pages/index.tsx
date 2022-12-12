import React, { ReactElement } from "react"
import Head from "next/head"
import sanityClient from "../sanity"

import { GetServerSideProps } from "next"
import { NextPage } from "next"

// interfaces
import {Post} from "../typings"

interface Props {
  posts: Post[],
  
}


const Index: NextPage = ({posts}: Props) => {
  console.log(posts)

  
  return (
    <div className='font-Poppins font-bold'>
      <Head>
          <title>The Blog</title>
        
      </Head>
      <main>
          <div>
              {posts.length > 0 ? posts.map(post => {
               if(post.categories.find(element => element === 'Trending')){
                return (
                  <div key={post._id}>
                    {post.title}
                  </div>
                )
               }
              }) : ""}
          </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {

  const postQuery = `*[_type == "post"] {
    _id,
    title,
    slug,
    author -> {
      name,
      image
    },
      description,
      mainImage,
      "categories": categories[]-> title
  }
  `
  const posts = await sanityClient.fetch(postQuery)

  return {
    props: {
      posts,
    }
  }
}

export default Index