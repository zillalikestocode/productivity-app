//@ts-nocheck
import {useState} from 'react'
import {motion} from 'framer-motion'
import {useAuth} from '../../../contexts/AuthContext'
import Loader from '../../Loader.tsx'
import WeekItem from './WeekItem'

const WeekList = ({day, week}) => {
	const {userInfo} = useAuth()
	const list = userInfo?.events
	const weekEvents = list?.filter(item => week.includes(new Date(item.date).toDateString()))
	const [loader, setLoader] = useState(false)
	return (
		loader ? <Loader unit='10' />:<motion.div className="flex w-full">
			{weekEvents.filter(item => new Date(item.date).toDateString().split(' ')[0] === day  ).length !== 0 && <h4 className="font-medium text-xl text-slate-600 p-3 dark:text-slate-300">{day}</h4>}
			<div className="ml-auto flex flex-col gap-3 item-center">
				{weekEvents?.filter(item=> new Date(item.date).toDateString().split(' ')[0] === day)?.map((item, i)=>{
					return (
						<WeekItem key={i} item={item} setLoader={setLoader}/>
					)
				})}
			</div>
		</motion.div>
	)
}

export default WeekList