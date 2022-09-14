import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../Button'
import { Link } from 'react-router-dom'
import {TbLayoutDashboard, TbListDetails, TbSettings, TbCalendar, TbLogout} from 'react-icons/tb'
import {useLocation} from 'react-router-dom'

const Sidebar = () => {
    const location = useLocation()
    const variants = {
        initial: {
            minWidth: 0,
        },
        animate: {
            minWidth: '230px',
            transition:{
                duration: 0.2,
            }
        },
        exit: {
            minWidth: 0,
            transition: {
                delay: 0.8
            }
        }
    }

    const {userInfo, leave, setSidebar, loading, setLoading} = useAuth()
    const out = async()=>{
        await setLoading(true)
        await setSidebar(false)
        await leave()
        setLoading(false)
    }
    const list = {
        hidden: {
            x: 0,
        },
        visible: {
            x:0,
            transition: {
                staggerChildren: 0.2
            }
        },
        exit: {
            x: 0,
            transition: {
                staggerChildren: 0.2,
                staggerDirection: -1
            }
        }
    }
    const item = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: 100
        }
    }
    const info = {
        hidden: {
            opacity: 0,
            scale: 0.6
        },
        visible: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: 0.6,
            transition: {
                delay: 0.4
            }
        }
    }
    const path = location.pathname
  return (
    <motion.div variants={variants} initial="initial" exit="exit" animate="animate" className="w-0 h-screen relative dark:bg-slate-900 bg-slate-100">
        <motion.img variants={info} initial="hidden" animate="visible" exit="exit" src={userInfo?.img} className="rounded-lg w-[130px] m-auto mt-10" />
        <motion.h4 variants={info} initial="hidden" animate="visible" exit="exit" className="dark:text-slate-200 text-xl text-center mt-2 font-medium w-full">{userInfo?.name}</motion.h4>
        <motion.ul className="mt-7" variants={list} initial='hidden' animate="visible" exit="exit">
            <motion.li variants={item} className=' p-3 pl-7 dark:text-slate-400 relative font-medium text-slate-900'><Link to='/dashboard' onClick={()=> setSidebar(false)} className="flex gap-2 items-center" ><span className="dark:bg-purple-700/75 rounded-md bg-violet-300 shadow-lg dark:shadow-indigo-900 shadow-purple-500/50 p-1.5 dark:text-slate-300"><TbLayoutDashboard fontSize={25} /></span><h4 className='text-lg'>Dashboard</h4> {path === '/dashboard' && <div className="top-2 bottom-2 absolute w-2 rounded-md bg-purple-500 right-0"/>}</Link></motion.li>
            <motion.li variants={item} className=' p-3 pl-7 dark:text-slate-400 relative font-medium text-slate-900'><Link to='/todo' onClick={()=> setSidebar(false)} className="flex gap-2 items-center" ><span className="dark:bg-purple-700/75 rounded-md bg-violet-300 shadow-lg dark:shadow-indigo-900 shadow-purple-500/50 p-1.5 dark:text-slate-300"><TbListDetails fontSize={25} /></span><h4 className='text-lg'>To-do List</h4>{path === '/todo' && <div className="top-2 bottom-2 absolute w-2 rounded-md bg-purple-500 right-0"/>}</Link></motion.li>
            <motion.li variants={item} className=' p-3 pl-7 dark:text-slate-400 relative font-medium text-slate-900'><Link to='/events/today' onClick={()=> setSidebar(false)} className="flex gap-2 items-center" ><span className="dark:bg-purple-700/75 rounded-md bg-violet-300 shadow-lg dark:shadow-indigo-900 shadow-purple-500/50 p-1.5 dark:text-slate-300"><TbCalendar fontSize={25} /></span><h4 className='text-lg'>Schedule</h4>{path.includes('/events') && <div className="top-2 bottom-2 absolute w-2 rounded-md bg-purple-500 right-0"/>}</Link></motion.li>
            <motion.li variants={item} className=' p-3 pl-7 dark:text-slate-400 relative font-medium text-slate-900'><Link to='/settings' onClick={()=> setSidebar(false)} className="flex gap-2 items-center" ><span className="dark:bg-purple-700/75 rounded-md bg-violet-300 shadow-lg dark:shadow-indigo-900 shadow-purple-500/50 p-1.5 dark:text-slate-300"><TbSettings fontSize={25} /></span><h4 className='text-lg'>Settings</h4>{path === '/settings' && <div className="top-2 bottom-2 absolute w-2 rounded-md bg-purple-500 right-0"/>}</Link></motion.li>
        </motion.ul>
        <Button variants={info} initial="hidden" animate="visible" exit="exit" text={<div className="flex gap-2 items-center justify-center m-auto w-full text-center"><h4>Sign Out</h4><TbLogout fontSize={25}/></div>} onClick={out} className="absolute bottom-10 p-2 bg-purple-500 left-0 right-0 m-auto mx-5 rounded-md text-slate-200 dark:bg-purple-700/75"/>
    </motion.div>
  )
}

export default Sidebar