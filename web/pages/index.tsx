import React, { ReactElement } from 'react'
import Head from 'next/head'
import sanityClient from '../sanity'
import { urlFor } from '../sanity'
import Image from 'next/image'

import { GetServerSideProps } from 'next'
import { NextPage } from 'next'

// interfaces
import { Post } from '../typings'

// func
import { ConvertToDate } from '../func'
interface Props {
	posts: Post[]
	trendingPosts: Post[]
}

const Index: NextPage = ({ posts, trendingPosts }: Props) => {
	console.log(trendingPosts)

	return (
		<div className='font-bold font-Poppins'>
			<Head>
				<title>The Blog</title>
			</Head>
			<main>
				<div>
					<section className='bg-black px-[5vw] relative top-[-1px] lg:flex lg:gap-5 pb-10'>
						<div className='md:flex md:gap-5 md:items-center lg:flex-col lg:w-[50%]'>
							<div>
								<Image src={urlFor(trendingPosts[0].mainImage.asset._ref).url()!} width='800' height='514' alt='trending' />
							</div>
							<div>
								<p className='pt-2 pb-1 text-sm font-normal text-stone-600'>{ConvertToDate(trendingPosts[0]._createdAt)}</p>
								<p className='pb-3 text-2xl font-semibold text-stone-300'>{trendingPosts[0].title}</p>
								<p className='pb-2 font-normal text-stone-400'>{trendingPosts[0].description}</p>
							</div>
						</div>
						<div className='lg:w-[50%]'>
							{trendingPosts.length > 0
								? trendingPosts.map((post, i) => {
										return (
											<div key={post._id}>
												{i > 0 ? (
													<div className='gap-2 mt-10 sm:flex sm:flex-row-reverse sm:gap-5 lg:flex-row lg:mt-0 lg:mb-5'>
														<div className='sm:w-[50%]'>
															<Image src={urlFor(post.mainImage.asset._ref).url()!} width='800' height='514' alt='trending' />
														</div>
														<div className='sm:w-[50%]'>
															<p className='pt-2 pb-1 text-sm font-normal text-stone-600'>{ConvertToDate(post._createdAt)}</p>
															<p className='pb-3 text-2xl font-semibold text-stone-300 lg:text-xl'>{post.title}</p>
														</div>
													</div>
												) : (
													''
												)}
											</div>
										)
								  })
								: ''}
						</div>
					</section>
					<section className='px-[5vw] py-10 md:grid md:grid-cols-2 gap-4 xl:px-0'>
						<h2 className='block pl-2 mb-5 text-2xl font-normal border-l-2 text-stone-500 border-stone-500 md:text-7xl md:font-light'>SPORTS</h2>
						{posts.length > 0
							? posts.map((post) => {
									if (post.categories.find((element) => element === 'Sports')) {
										return (
											<div className='mb-7'>
												<div className='xl:h-[400px] h-[200px] overflow-hidden'>
													<Image src={urlFor(post.mainImage.asset._ref).url()!} width='800' height='514' alt='trending' />
												</div>
												<div className=''>
													<p className='pt-2 pb-1 text-sm font-normal text-stone-600'>{ConvertToDate(post._createdAt)}</p>
													<p className='pb-3 text-xl font-semibold md:text-2xl lg:text-xl'>{post.title}</p>
													<p className='font-light'>{post.description}</p>
												</div>
											</div>
										)
									}
							  })
							: ''}
					</section>
					<section className='bg-black px-[5vw] py-10'>
						<h2 className='block pl-2 mb-5 text-2xl font-normal border-l-2 text-stone-500 border-stone-500'>All</h2>
						{posts.length
							? posts.map((post) => {
									return (
										<div className='mb-7 md:mb-10 md:flex md:flex-row-reverse md:gap-6'>
											<div className=' md:h-[200px] object-cover md:overflow-clip w-auto md:w-[40%] lg:w-[50%] lg:h-[300px]'>
												<Image src={urlFor(post.mainImage.asset._ref).url()!} width='800' height='514' alt='trending' />
											</div>
											<div className='md:w-[60%] lg:w-[50%]'>
												<p className='pt-2 pb-1 text-sm font-normal text-stone-600'>{ConvertToDate(post._createdAt)}</p>
												<p className='pb-3 text-2xl font-semibold lg:text-xl text-stone-300'>{post.title}</p>
												<p className='font-light text-stone-400'>{post.description}</p>
											</div>
										</div>
									)
							  })
							: ''}
					</section>
				</div>
			</main>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
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
      "categories": categories[]-> title,
      _createdAt,
  }
  `
	const trendingPostsQuery = `*[_type == "post" &&  "Trending" in categories[]->title] {
    _id,
    title,
    slug,
    author -> {
      name,
      image
    },
      description,
      mainImage,
      "categories": categories[]-> title,
      _createdAt,
  }
  `
	const posts = await sanityClient.fetch(postQuery)
	const trendingPosts = await sanityClient.fetch(trendingPostsQuery)
	return {
		props: {
			posts,
			trendingPosts,
		},
	}
}

export default Index
