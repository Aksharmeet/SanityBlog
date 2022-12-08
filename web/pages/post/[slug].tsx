// post.js
import type { NextPage } from 'next'
import { useRouter } from 'next/router'


const Slug: NextPage = () => {
  const router = useRouter()
  
  return (
    <article>
      <h1>{router.query.slug}</h1>
    </article>
  )
  }

export default Slug