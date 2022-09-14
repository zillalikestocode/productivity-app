//@ts-nocheck
import {useState} from 'react'
import {motion} from 'framer-motion'
import {useAuth} from '../../../contexts/AuthContext'
import WeekItem from './WeekItem'
import Loader from '../../Loader'
import WeekList from './WeekList.tsx'
const Week = () => {
	const {userInfo} = useAuth()
	const list = userInfo?.events
	const date = new Date()
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const first = date.getDate() - date.getDay()
    const last = first + 6

    const firstDay = new Date(date.setDate(first))
    // const lastDay = new Date(date.setDate(last))
    // console.log(firstDay.toDateString())
    let week = []
    for(let i = 0; i <=6; i ++){
    	week.push(new Date(date.setDate(first + i)).toDateString())
    }
    const weekEvents = list?.filter(item => week.includes(new Date(item.date).toDateString()))
  
	return (
		<motion.div className="mt-3 px-3 flex flex-col gap-4">
			{daysOfWeek.map((day, i) => (
				<WeekList week={week} key={i} day={day}/>
			))}
		</motion.div>
	)
}

export default Week