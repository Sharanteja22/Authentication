import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
/**
 * @function Header
 * @description A simple header component with a light blue background
 * @returns {ReactElement} A JSX Element
 */
export default function Header() {
  const  {currentUser}= useSelector((state) => state.user);
  // console.log(currentUser.profilePicture)
  return (
    <div className='bg-slate-200'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
          <Link to="/"><h1 className="font-bold">Auth App</h1></Link>
          <ul className='flex gap-4'>
            <Link to="/"><li>Home</li></Link>
            <Link to="/about"><li>About</li></Link>
            <Link to="/profile">
              {currentUser ? (
                <img src={currentUser.profilePicture} alt="NotFound" className="w-8 h-8 rounded-full object-cover"/>
                
              ):( 
                <li>Sign In</li>
                )
              }
            </Link>
          </ul>
        </div>
    </div>
  )
}
