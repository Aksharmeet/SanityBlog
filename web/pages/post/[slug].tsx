// post.js
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import sanityClient from '../../sanity'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface Props {
	post: Post
}

interface IFormInput {
	_id: string
	name: string
	email: string
	comment: string
}

const Slug: NextPage = ({ post }: Props) => {
	const router = useRouter()
	const [submitted, setSubmitted] = useState<boolean>(false)

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		fetch('/api/createComment', {
			method: 'POST',
			body: JSON.stringify(data),
		})
			.then(() => {
				console.log(data)
				setSubmitted(true)
			})
			.catch((err) => {
				console.error(err)
				setSubmitted(false)
			})
	}
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>()

	return (
		<article>
			<h1>{router.query.slug}</h1>

			{/* <PortableText
				dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
				projectId={process.env.NEXT_PUBLIC_SANITY_PRODUCTION}
				content={post.body}
				serializers={{
					h1: (props: any) => {
						;<h1 className='my-5 text-2xl font-bold'>{props}</h1>
					},
					h2: (props: any) => {
						;<h2 className='my-5 text-xl font-bold'>{props}</h2>
					},
					l1: (props: any) => {
						;<li className='ml-4 list-disc'>{props}</li>
					},
					link: ({ href, children }: any) => {
						;<a href={href} className='text-blue-500 hover:underline'>
							{children}
						</a>
					},
				}}
			/>
			<hr className='max-w-lg mx-auto my-5 border border-yellow-500' /> */}
			{submitted ? (
				<div className='flex flex-col max-w-2xl gap-1 p-10 mx-auto my-10 text-white bg-yellow-500'>
					<h3 className='text-3xl font-bold'>Thank you for submitting your comment</h3>
					<p>Once it is approved it will appear below</p>
				</div>
			) : (
				<form className='flex flex-col max-w-2xl p-10 mx-auto my-10 mb-10' onSubmit={handleSubmit(onSubmit)}>
					<h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
					<h4 className='text-3xl font0bolf'>Leave a comment below!</h4>
					<hr className='py-3 mt-2' />
					<input {...register('_id')} type='hidden' name='_id' value={post._id} />

					<label htmlFor='' className='block mb-5'>
						<span className='text-gray-700'>Name</span>
						<input
							{...register('name', { required: true })}
							className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-yellow-500 focus:ring-1'
							placeholder='John Apple'
							type='text'
						/>
					</label>
					<label htmlFor='' className='block mb-5'>
						<span className='text-gray-700'>Email</span>
						<input
							{...register('email', { required: true })}
							className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-input ring-yellow-500 focus:ring-1'
							placeholder='John Apple'
							type='text'
						/>
					</label>
					<label htmlFor='' className='block mb-5'>
						<span className='text-gray-700'>Comment</span>
						<textarea
							{...register('comment', { required: true })}
							className='block w-full px-3 py-2 mt-1 border rounded shadow outline-none form-textarea ring-yellow-500 focus:ring-1'
							placeholder='John Apple'
							rows={8}
						/>
					</label>

					{/* {erros will return when field validation fails} */}
					<div className='flex flex-col p-5 text-red-500'>
						{errors.name && <span>The Name Field is required</span>}
						{errors.email && <span>The Email Field is required</span>}
						{errors.comment && <span>The Comment Field is required</span>}

						<input
							className='px-4 py-2 font-bold text-white bg-yellow-500 shadow cursor-pointer hover:bg-yellow-400 focus:shadow-outline focus:outline-none rounder'
							type='submit'
						/>
					</div>
				</form>
			)}
			{/* {Comments} */}

			<div className='flex flex-col max-w-2xl p-10 mx-auto my-10 space-y-2 shadow shadow-yellow-500'>
				<h3>Comments</h3>
				<hr />

				{/* {post.comments.map((comment) => (
					<div key={comment._id}>
						<p>
							<span className='text-yellow-500'>{comment.name}: </span>
							{comment.comment}
						</p>
					</div>
				))} */}
			</div>
		</article>
	)
}

export default Slug

export const getStaticPaths: GetStaticPaths = async () => {
	const query = `*[_type == "post"] {
    _id,
    slug {
      current
    }
  }`

	const posts = await sanityClient.fetch(query)

	const paths = posts.map((post) => ({
		params: {
			slug: post.slug.current,
		},
	}))

	return {
		paths,
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
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

	const post = await sanityClient.fetch(query, { slug: params?.slug })

	if (!post) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			post,
		},
		revalidate: 60, // by using revalidate we are enabling ISR
	}
}
