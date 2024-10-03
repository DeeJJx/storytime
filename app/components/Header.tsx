"use client"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dl3StudioLogo from '../../public/dl3-studios.svg';
import user from '../../public/user.svg'


export default function Header(){
    const { status } = useSession();
    const router = useRouter();

    const showSession = () => {
    if(status === "authenticated"){
      return (
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 text-center"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            })
          }}
          >
            Sign Out
        </button>
      )
    } else if (status === "loading"){
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      return (
        <Link
          href="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 text-center mb-2"
        >
          Sign In
        </Link>
      )
    }  
  }

    return (
            <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  <li><Link href='/'>Home</Link></li>
                  <li><Link href='/favourites'>Favourites</Link></li>
                </ul>
              </div>
            </div>
            <div className="navbar-center">
              <Link href='/' className="btn btn-ghost text-xl flex items-center space-x-2 w-48">
               <Image
                priority
                src={dl3StudioLogo}
                alt="DL3 Studios // Change to appropriate"
                />
              </Link>
            </div>
            <div className="navbar-end">
              {/* <div className="dropdown">
              {showSession()}
              {status === "authenticated" ? '' : 
                <Link className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 text-center" href="/register">
                    Sign Up
                </Link>
                }
              </div> */}
               <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    {/* <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
                      <Image
                        src={user}
                        priority
                        alt="User Icon"
                      />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow w-44">
                  <li className="w-full">{showSession()}</li>
                  <li className="w-full">              
                    {status === "authenticated" ? '' : 
                      <Link className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 text-center" href="/register">
                          Sign Up
                      </Link>
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
          );
}