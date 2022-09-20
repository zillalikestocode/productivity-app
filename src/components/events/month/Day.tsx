//@ts-nocheck
import {useState} from 'react'
import {motion, AnimateSharedLayout, AnimatePresence} from 'framer-motion'
import {useAuth} from '../../../contexts/AuthContext'
import MonthList from './MonthList'

export default ({day, firstNo})=>{
	const [more, setMore] = useState(false)
	const {userInfo} = useAuth()
	// const thisDay = date.getFullYear() + '-' + (String(date.getMonth()).length === 1 ? '0' +(date.getMonth() + 1) : date.getMonth() + 1) + '-' + (String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate())
	// const daysList = userInfo?.events.filter(item => item.date === thisDay)
	const fullDay = day?.split(' ')
	const firstDay = day && fullDay[2] === '01'
	const style = {
		gridColumnStart: firstNo
	}
	const today = new Date().toDateString()
	return (
		<AnimateSharedLayout>
		<motion.div layoutId={day} onClick={()=>setMore(true)} style={firstDay && style} className={`w-8 m-auto rounded-md py-1 ${today === day ? 'bg-purple-500 text-white' : ''}`}>
		  {day?.split(' ')[2]}
		</motion.div>
		{more && <div className="absolute top-0 bottom-0 right-0 left-0 bg-slate-800/25 z-40" onClick={()=> setMore(false)} />}
		<AnimatePresence>{more && <motion.div layoutId={day} className="absolute top-16 w-[80%] rounded-xl left-0 m-auto right-0 bg-gradient-to-tr  z-50 from-purple-400 to-purple-600">
					<MonthList setMore={setMore} chosenDay={day} />
				</motion.div>}</AnimatePresence>
		</AnimateSharedLayout>
	)
}