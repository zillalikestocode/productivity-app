import {useState} from 'react';
import {motion} from 'framer-motion'
import ScheduleHeader from './ScheduleHeader'
import Button from '../Button'
import {HiPlus} from 'react-icons/hi'
import {useAuth} from '../../contexts/AuthContext'
import {Routes, Route} from 'react-router-dom'
import Today from './today/Today'
import Week from './week/Week'
import Month from './month/Month'

const Schedule = ({chosenDay}) => {
	const [tab, setTab] = useState('Today')
	const {userInfo, setEvent} = useAuth()
	return (
		<motion.div className="px-5">
			<ScheduleHeader setTab={setTab} tab={tab} />
			<motion.div>
				<Routes>
					<Route element={<Today chosenDay={chosenDay} />} path="today"/>
					<Route element={<Week chosenDay={chosenDay} />} path="week" />
					<Route element={<Month chosenDay={chosenDay} />} path="month" />
				</Routes>
			</motion.div>
			<Button onClick={()=> setEvent(true)} className="fixed bottom-5 right-5 rounded-full bg-gradient-to-br shadow-lg dark:shadow-violet-500/75 shadow-violet-500 from-purple-400 to-purple-600 w-16 h-16 text-white flex items-center justify-center" text={<HiPlus fontSize={30}/>} />
		</motion.div>
	)
}

export default Schedule