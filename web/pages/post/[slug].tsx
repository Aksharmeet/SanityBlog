// post.js
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import sanityClient from "../../sanity"
import { GetStaticPaths, GetStaticProps } from 'next'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import {useForm, SubmitHandler} from "react-hook-form"
import { useState } from 'react'

interface Props {
  post : Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Slug: NextPage = ({post}: Props) => {
  const router = useRouter()
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
       fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then(() => {
        console.log(data)
        setSubmitted(true)
      }).catch((err) =>{
        console.error(err)
        setSubmitted(false)
      })
   }
  const {
     register,
     handleSubmit,
     formState: {errors},
    } = useForm<IFormInput>()
 
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
      {submitted ? (
        <div  className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto gap-1'>
          <h3 className='text-3xl font-bold'>Thank you for submitting your comment</h3>
          <p>Once it is approved it will appear below</p>
        </div>
      ): (<form className='flex flex-col p-10 my-10 max-w-2xl mx-auto mb-10' onSubmit={handleSubmit(onSubmit)}>
      <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
      <h4 className='text-3xl font0bolf'>Leave a comment below!</h4>
      <hr className='py-3 mt-2'/>
      <input
      {...register('_id')}
      type='hidden'
      name='_id'
      value={post._id}
      />
      
      <label htmlFor="" className='block mb-5'>
        <span className='text-gray-700'>Name</span>
        <input {...register('name', {required: true})}className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1' placeholder='John Apple' type='text'/>
      </label>
      <label htmlFor="" className='block mb-5'>
        <span className='text-gray-700'>Email</span>
        <input  {...register('email', {required: true})} className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1' placeholder='John Apple' type='text'/>
      </label>
      <label htmlFor="" className='block mb-5'>
        <span className='text-gray-700'>Comment</span> 
        <textarea {...register('comment', {required: true})}  className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring-1' placeholder='John Apple' rows={8}/>
      </label>
     
     {/* {erros will return when field validation fails} */}
     <div className='text-red-500 flex flex-col p-5'>
      {errors.name && (
        <span>The Name Field is required</span>
      )}
       {errors.email && (
        <span>The Email Field is required</span>
      )}
       {errors.comment && (
        <span>The Comment Field is required</span>
      )}

      <input className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounder cursor-pointer' type='submit'/>
     </div>
    </form>)}
     {/* {Comments} */}

     <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
      <h3>Comments</h3>
      <hr/>

      {post.comments.map((comment) =>(
        <div key={comment._id} >
          <p><span className='text-yellow-500'>{comment.name}: </span>{comment.comment}</p>
        </div>
        ))}
     </div>
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
  const query = `*[_type == "post" && slug.current == 'what-is-a-blog-and-why-should-you-create-one'][0] {
    _id,
    title,
    _createdAt,
    slug,
    author -> {
      name,
      image
    },
      'comments': *[
        _type == 'comment' && post._ref == ^._id && approved == true
      ],
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