// post.js
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import sanityClient from "../../sanity"
import { GetStaticPaths, GetStaticProps } from 'next'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
interface Props {
  post : Post;
}
const Slug: NextPage = ({post}: Props) => {
  const router = useRouter()

  return (
    <article>
      <h1>{router.query.slug}</h1>

      <PortableText dataset={process.env.NEXT_PUBLIC_SANITY_DATASET} projectId={process.env.NEXT_PUBLIC_SANITY_PRODUCTION} content={post.body}
      serializers={
        {
          h1: (props: any) => {
            <h1 className='text-2xl font-bold my-5'>{props}</h1>
          },
          h2: (props: any) => {
            <h2 className='text-xl font-bold my-5'>{props}</h2>
          },
          l1: (props: any) => {
            <li className='ml-4 list-disc'>{props}</li>
          },
          link: ({href, children}: any) => {
            <a href={href} className='text-blue-500 hover:underline'>{children}</a>
          }
        }
      }
      />
      <hr className='max-w-lg my-5 mx-auto border border-yellow-500'/>

      <form className='flex flex-col p-10 my-10 max-w-2xl mx-auto mb-10'>
        <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
        <h4 className='text-3xl font0bolf'>Leave a comment below!</h4>
        <hr className='py-3 mt-2'/>
        <label htmlFor="" className='block mb-5'>
          <span className='text-gray-700'>Name</span>
          <input className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1' placeholder='John Apple' type='text'/>
        </label>
        <label htmlFor="" className='block mb-5'>
          <span className='text-gray-700'>Email</span>
          <input className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1' placeholder='John Apple' type='text'/>
        </label>
        <label htmlFor="" className='block mb-5'>
          <span className='text-gray-700'>Comment</span> 
          <textarea className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring-1' placeholder='John Apple' rows={8}/>
        </label>
       
      </form>
    </article>
  )
  }

export default Slug

export const getStaticPaths: GetStaticPaths = async() => {
  const query = `*[_type == "post"] {
    _id,
    slug {
      current
    }
  }`

  const posts = await sanityClient.fetch(query)
  
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }))

  
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async({params}) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    _createdAt,
    slug,
    author -> {
      name,
      image
    },
      description,
      mainImage,
      slug,
      body
  }`

  const post = await sanityClient.fetch(query, {slug: params?.slug})

  if(!post) {
    return {
      notFound: true
    }
  } 

  return{
      props: {
        post

      },
      revalidate: 60 // by using revalidate we are enabling ISR
    }
}