//@ts-nocheck
import React from 'react'
import {motion, AnimateSharedLayout} from 'framer-motion'
import {Link} from 'react-router-dom'

const ScheduleHeader = ({tab, setTab}) => {
	const header = ['Today', 'Week', 'Month']
	return (
		<motion.div className="flex justify-center gap-5 w-full">
		<AnimateSharedLayout>
			{header.map((item, i)=>{
				return (
					<motion.div key={i} onClick={()=> setTab(item)} className="cursor-pointer">
					<Link to={`/events/${item.toLowerCase()}`}>
						<h4 className="mb-1 dark:text-slate-300 text-slate-700 font-medium">{item}</h4>
						{tab === item && <motion.div layoutId='outline' className="rounded-lg w-full h-2 bg-gradient-to-r from-purple-500 to-purple-600" />}
					</Link>
					</motion.div>
				)
			})}
		</AnimateSharedLayout>
		</motion.div>
	)
}

export default ScheduleHeader