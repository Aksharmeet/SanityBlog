import TheBlog from "../svg's/theBlog"
import NavHam from "../svg's/navHam";
import TheBlogLogo from "../svg's/theBlogLogo";
import SubdirectoryRightArrow from "../svg's/subdirectoryRightArrow";
import Close from "../svg's/close";

// packages
import { useState } from "react";
import Link from "next/link";

function Navbar() {
   const [toggle,setToggle] = useState(false);
  return (
    <nav className="p-5 sm:px-9 sm:pt-9 lg:px-11 lg:pt-11 bg-black">
        <div className="flex justify-between gap-5 items-center">
            <div className='max-w-[35px]'>
                <TheBlog/>
            </div>
            <ul className="text-stone-400 font-medium lg:flex justify-between gap-[2vw] hidden">
                <Link href='/' onClick={() => setToggle(prev => !prev)}><li>Home</li></Link>
                <Link href='/' onClick={() => setToggle(prev => !prev)}><li>Blog</li></Link>
                <Link href='/' onClick={() => setToggle(prev => !prev)}><li>About</li></Link>
            </ul>

            <div className='lg:hidden' onClick={() => setToggle(prev => !prev)}>
                <NavHam />
            </div>
        </div>
       
        <div className="mt-6 sm:mt-8 lg:mt-10 py-3 border-y border-stone-700">
            <TheBlogLogo/>
        </div>
      

        {/* mobile */}
        <ul className={`absolute left-0 right-0 top-0 pt-10 z-50 min-h-screen bg-white lg:hidden  ${!toggle ? ' duration-300 transition-opacity opacity-0 pointer-events-none ': 'duration-500 transition-opacity'}`}>
            <div className="border-b border-stone-200 text-stone-500 pb-9 pl-[95vw] lg:hidden" onClick={() => setToggle(prev => !prev)}>
                <Close/>
            </div>
            <div  className="p-9 border-b border-stone-200 text-stone-500 flex flex-row items-center gap-2">
                <SubdirectoryRightArrow/>
                <Link href='/' onClick={() => setToggle(prev => !prev)}><li className=' text-3xl font-normal text tracking-wider'>Home</li></Link>
            </div>
            <div className="p-9 border-b border-stone-200 text-stone-500 flex flex-row items-center gap-2">
                <SubdirectoryRightArrow/>
                <Link href="/" onClick={() => setToggle(prev => !prev)}><li className='text-3xl font-normal text tracking-wider'>Blog</li></Link>
            </div>
            <div className="p-9 border-b border-stone-200 text-stone-500 flex flex-row items-center gap-2">
                <SubdirectoryRightArrow/>
                <Link href="/" onClick={() => setToggle(prev => !prev)}><li className='text-3xl font-normal text tracking-wider'>About</li></Link>
            </div>
        </ul>
        


    </nav>
  )
}

export default Navbar