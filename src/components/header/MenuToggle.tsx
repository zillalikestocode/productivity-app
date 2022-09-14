//@ts-nocheck
import React from 'react'
import Button from '../Button'
import {HiMenuAlt2, HiX} from 'react-icons/hi'
import { useAuth } from '../../contexts/AuthContext'

const MenuToggle = () => {
  const {sidebar, setSidebar} = useAuth()
  const icon = sidebar ? <HiX fontSize={25} /> : <HiMenuAlt2 fontSize={25}/>
  return (
    <div>
        <Button onClick={()=>setSidebar(!sidebar)} text={icon} className="dark:text-slate-300 p-2 rounded-xl text-slate-900" />
    </div>
  )
}

export default MenuToggle