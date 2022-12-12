import Head from "next/head"
import Navbar from "../components/layout/navbar"


function Index() {
  return (
    <div className='font-Poppins font-bold'>
      <Head>
          <title>The Blog</title>
        
      </Head>
      <main>
          <Navbar/>
      </main>
    </div>
  )
}

export default Index