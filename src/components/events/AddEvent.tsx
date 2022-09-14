//@ts-nocheck
import {useState} from 'react'
import {motion} from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../Button'

const Prompt = ()=>{
    const initialState= {id: Math.random() * 65392 ,title: '', note: '', date: '', time: ''}
    const {addEvent, setEvent, addToEvents} = useAuth()
    const [eventData, setEventData] = useState(initialState)
    const handleSubmit = async(e)=>{
    	e.preventDefault()
        try{
        	await addToEvents(eventData)
            setEvent(false)
            setEventData(initialState)
        }catch(err){
            console.log(err.message)
        }
    }
    const slide = {
        hidden: {
            y: "100%"
        },
        visible: {
            y: 0,
            transition: {
                ease: 'linear',
                duration: 0.2
            }
        },
        exit: {
            y: '100%',
            transition: {
                ease: 'linear',
                duration: 0.1
            }
        }
    }
    const handleChange= (e)=>{
        setEventData(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    return (
        <motion.div className='fixed h-full w-full z-30'>
        	<div onClick={()=> setEvent(false)} className="fixed bg-slate-600/25 top-0 bottom-0 right-0 left-0"/>
            <motion.form variants={slide} id="form" initial="hidden" animate='visible' exit="exit" className="flex flex-col click gap-3 left-0 right-0 p-6 pb-8 rounded-3xl bg-gradient-to-tr from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800  fixed m-auto bottom-5 w-[90%]" onSubmit={handleSubmit}>
                <motion.span onClick={()=> setEvent(false)} className="cursor-pointer absolute w-16 left-0 dark:bg-slate-600 right-0 m-auto top-4 h-2 bg-white rounded-xl" />
                <div className="flex items-center mt-5">
                    <h4 className="text-2xl font-semibold  text-white dark:text-slate-200">Add an Event</h4>
                </div>
                <div className="flex flex-col gap-1">
                    <input autoFocus required value={eventData.title} placeholder="Title" className=" bg-white/25 p-3 placeholder:text-slate-100 px-4 rounded-2xl focus:outline-none focus:bg-violet-700/75 focus:bg-violet-700/75 dark:focus:bg-violet-800/75 focus:text-white focus:bg-violet-700/75 focus:text-white text-slate-600" onChange={handleChange} type='text' name="title"/>
                </div>
                <div className="flex flex-col gap-1">
                    <input value={eventData.note} placeholder="Extra Notes" className=" bg-white/25 p-3 placeholder:text-slate-100 rounded-xl px-4 focus:outline-none focus:bg-violet-700/75 focus:text-white focus:bg-violet-700/75 dark:focus:bg-violet-800/75 focus:text-white text-slate-600" onChange={handleChange} type="text" name="note"/>
                </div>
                <div className="flex">
                    <div>
                        <h4 className='text-white dark:text-slate-200 ml-2'>Date</h4>
                        <input required value={eventData.date} className=" bg-white/25 w-36 p-3 placeholder:text-slate-300 rounded-2xl focus:outline-none text-slate-600" onChange={handleChange} type="date" name="date"/>
                    </div>
                    <div className="ml-auto">
                        <h4 className='text-white dark:text-slate-200 ml-2'>Time</h4>
                        <input value={eventData.time} className=" bg-white/25 p-3 placeholder:text-slate-300 rounded-xl focus:outline-none text-slate-600 " onChange={handleChange} type="time" name="time"/>
                    </div>
                </div>
                <Button type="submit" whileTap={{scale: 0.8}} text='Add' className="p-2 mt-3 dark:shadow-lg dark:bg-violet-900/75 dark:text-slate-300 bg-violet-700/50 text-2xl rounded-3xl shadow-xl shadow-violet-500 text-white" />
            </motion.form>
        </motion.div>
    )
}

export default Prompt