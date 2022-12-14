import TheBlog from "../svg's/theBlog"
import NavHam from "../svg's/navHam"
import TheBlogLogo from "../svg's/theBlogLogo"
import SubdirectoryRightArrow from "../svg's/subdirectoryRightArrow"
import Close from "../svg's/close"

// packages
import { useState } from 'react'
import Link from 'next/link'

function Navbar() {
	const [toggle, setToggle] = useState(false)
	return (
		<nav className='p-5 bg-black sm:px-9 sm:pt-9 lg:px-11 lg:pt-11'>
			<div className='flex items-center justify-between gap-5'>
				<Link href='/'>
					<div className='max-w-[35px]'>
						<TheBlog />
					</div>
				</Link>
				<ul className='text-stone-400 font-medium lg:flex justify-between gap-[2vw] hidden'>
					<Link href='/' onClick={() => setToggle((prev) => !prev)}>
						<li>Home</li>
					</Link>
					<Link href='/' onClick={() => setToggle((prev) => !prev)}>
						<li>Blog</li>
					</Link>
					<Link href='/' onClick={() => setToggle((prev) => !prev)}>
						<li>About</li>
					</Link>
				</ul>

				<div className='lg:hidden' onClick={() => setToggle((prev) => !prev)}>
					<NavHam />
				</div>
			</div>

			{/* mobile */}
			<ul
				className={`absolute left-0 right-0 top-0 pt-10 z-50 min-h-screen bg-white lg:hidden ${
					!toggle ? ' duration-300 transition-opacity opacity-0 pointer-events-none ' : 'duration-500 transition-opacity'
				} overflow-hidden`}
			>
				<div className='border-b border-stone-200 text-stone-500 pb-9 pl-[90vw] lg:hidden' onClick={() => setToggle((prev) => !prev)}>
					<Close />
				</div>
				<Link href='/' onClick={() => setToggle((prev) => !prev)}>
					<div className='flex flex-row items-center gap-2 border-b p-9 border-stone-200 text-stone-500'>
						<SubdirectoryRightArrow />
						<li className='text-3xl font-normal tracking-wider text'>Home</li>
					</div>
				</Link>
				<Link href='/' onClick={() => setToggle((prev) => !prev)}>
					<div className='flex flex-row items-center gap-2 border-b p-9 border-stone-200 text-stone-500'>
						<SubdirectoryRightArrow />
						<li className='text-3xl font-normal tracking-wider text'>Blog</li>
					</div>
				</Link>
				<Link href='/' onClick={() => setToggle((prev) => !prev)}>
					<div className='flex flex-row items-center gap-2 border-b p-9 border-stone-200 text-stone-500'>
						<SubdirectoryRightArrow />
						<li className='text-3xl font-normal tracking-wider text'>About</li>
					</div>
				</Link>
			</ul>
		</nav>
	)
}

export default Navbar
