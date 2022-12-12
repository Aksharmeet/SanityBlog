import TheBlog from "../svg's/theBlog"
import NavHam from "../svg's/navHam";
import TheBlogLogo from "../svg's/theBlogLogo";


function Navbar() {
  return (
    <nav className="p-5 bg-black">
        <div className="flex justify-between">
            <div className='max-w-[35px]'>
                <TheBlog/>
            </div>
            <div>
                <NavHam />
            </div>
        </div>

        <div className="mt-7 py-3 border-y border-stone-700">
            <TheBlogLogo/>
        </div>

    </nav>
  )
}

export default Navbar