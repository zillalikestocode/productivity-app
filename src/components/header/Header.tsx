import DarkToggle from './DarkToggle'
import {useState} from 'react'
import { motion } from 'framer-motion'
import Button from '../Button'
import MenuToggle from './MenuToggle'
import {useAuth} from '../../contexts/AuthContext'
import {useLocation} from 'react-router-dom'

const Header = ({ dark, setDark }) => {
  const {currentUser} = useAuth()

  
  return (
    <header>
      <nav className='flex w-screen gap-2 p-3 items-center'>
        {currentUser?.email && <div className='flex items-center gap-3'>
          <MenuToggle/>
        </div>}
        <DarkToggle dark={dark} setDark={setDark} />
      </nav>
    </header>
  )
}

export default Header
