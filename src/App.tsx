//@ts-nocheck
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import Auth from './components/auth/Auth'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Home from './components/home/Home';
import Sidebar from './components/sidebar/Sidebar';
import { AnimatePresence } from 'framer-motion';
import {useAuth} from './contexts/AuthContext'
import Loader from './components/Loader'
import Todo from './components/todo/Todo'
import SignUp from './components/auth/SignUp'
import AddPrompt from './components/todo/AddPrompt'
import Settings from './components/settings/Settings'
import Events from './components/events/Events'
import AddEvent from './components/events/AddEvent'

function App() {
  const {currentUser, loading, setLoading,addEvent, setSidebar, sidebar, addPrompt} = useAuth()
  const [dark, setDark] = useState(false);
  const location = useLocation()

  const navigate = useNavigate()
  useEffect(()=>{
    setLoading(true)
    if(currentUser?.email){
      navigate('/dashboard')
    }else{
      navigate('/welcome')
    }
    setLoading(false)
  }, [currentUser])


  return (
    <div className={`${dark && 'dark'} min-h-screen overflow-hidden ${sidebar && 'fixed'} flex`}>
    <AnimatePresence>{sidebar && <Sidebar/>}</AnimatePresence>
    <div className='relative w-screen'>
      <div className={`fixed w-full -z-10 h-screen ${dark ? 'bg-[#16213e]':'bg-gray-200'} transition-colors ease-in-out duration-300`}/>
      <AnimatePresence>{addPrompt && <AddPrompt />}</AnimatePresence>
      <AnimatePresence>{addEvent && <AddEvent />}</AnimatePresence>
      <Header dark={dark} setDark={setDark} />
        {loading ? <Loader /> : <div className="">
        <Routes>
            <Route path="/welcome" element={<Auth dark={dark} />}/>
          <Route path='/' element={<Navigate to={currentUser?.email ? '/dashboard' : '/welcome'} />} />
          <Route path='/auth' element={<SignUp />} />
          <Route path='/dashboard' element={<Home />}/>
          <Route path='/todo' element={<Todo />}/>
          <Route path='/settings' element={<Settings />}/>
          <Route path="/events/*" element={<Events />} />
        </Routes></div>}
      </div>
    </div>
  )
}

export default App
