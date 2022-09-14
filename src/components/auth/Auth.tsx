import {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import Button from '../Button'
import SignUp from './SignUp'
import {IoChevronForward} from 'react-icons/io5'
import { useNavigate, Link } from 'react-router-dom'

const Auth = ({dark}) => {
  const navigate = useNavigate()
  return (
    <div className={`text-slate-900 px-3 dark:text-white text-center`}>
      <div className='mx-auto w-[80%] mt-20'>
              <h4 className='text-2xl font-medium'>Need to put your life in order and stay productive? We are here to do just that!</h4>
            	<Link to="/auth"><Button whileTap={{scale: 0.95}} whileHover={{scale: 1.05}} text={<span className=" flex gap-1 items-center">Get Started <IoChevronForward /></span>} className="mt-3 p-2 shadow-xl shadow-purple-500 dark:shadow-violet-900 bg-violet-400 dark:bg-purple-800 rounded-md text-white text-xl" /></Link>
            	<div className="mt-24 ">
            		<h4 className="credits text-5xl dark:text-slate-300">Made with love by Emmanuel Ngoka.</h4>
            	</div>
            </div>
    </div>
  )
}

export default Auth
