// post.js
import type { NextPage } from 'next'
import sanityClient, { urlFor } from '../../sanity'
import { GetStaticPaths, GetStaticProps } from 'next'
import { SinglePost } from '../../typings'
import PortableText from 'react-portable-text'
import Image from 'next/image'
import { ConvertToDate } from '../../func'
import styles from './styles.module.css'
interface Props {
	post: SinglePost
}

const Slug: NextPage = ({ post }: Props) => {
	post = post[0]
	return (
		<article className=''>
			<div className='bg-black relative top-[-1px] p-5 md:p-[5vw] lg:px-[7vw] lg:pb-[100px]'>
				<p className='my-2 text-sm text-stone-400 xl:text-lg'>{ConvertToDate(post._createdAt)}</p>
				<h1 className='mb-8 text-3xl font-bold leading-10 text-stone-100 md:text-4xl md:leading-[3rem] md:mb-10 lg:text-5xl lg:leading-[4.2rem]'>
					{post.title}
				</h1>
				<Image src={urlFor(post.mainImage.asset._ref).url()!} width='1278' height='1278' alt='hero' className='m-auto' />
			</div>
			{post.body ? (
				<PortableText
					dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
					projectId={process.env.NEXT_PUBLIC_SANITY_PRODUCTION}
					content={post.body}
					className={`flex flex-col items-center justify-center p-5 mt-8 leading-relaxing gap-7 xl:gap-10 text-stone-700 md:text-lg md:px-[5vw] xl:px-[0] xl:text-xl xl:leading-8 ${styles.tags}`}
				/>
			) : (
				''
			)}
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

	const paths = posts.map((post: SinglePost) => ({
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
	const query = `*[_type == "post" && slug.current == $slug] {
    _id,
    title,
    _createdAt,
    slug,
    author -> {
      name,
      image
    },
      mainImage,
      slug,
      body,
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
