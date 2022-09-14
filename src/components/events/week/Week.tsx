//@ts-nocheck
import {useState} from 'react'
import {motion} from 'framer-motion'
import {useAuth} from '../../../contexts/AuthContext'

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
    console.log(weekEvents)
	return (
		<motion.div className="mt-3 px-3">
			{daysOfWeek.map((day, i) => (
				<motion.div key={i} className="flex ">
					{weekEvents.filter(item => new Date(item.date).toDateString().split(' ')[0] === day  ).length !== 0 && <h4 className="font-medium text-xl text-slate-600">{day}</h4>}
					{weekEvents?.filter(item=> new Date(item.date).toDateString().split(' ')[0] === day)?.map((item, i)=>{
						return (
							<div key={i} className="ml-auto">{item.title}</div>
						)
					})}
				</motion.div>
			))}
		</motion.div>
	)
}

export default Week