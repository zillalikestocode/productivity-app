//@ts-nocheck
import {useState} from 'react'
import {motion} from 'framer-motion'
import {useAuth} from '../../contexts/AuthContext'
import Button from '../Button'
import {TbChevronRight} from 'react-icons/tb'
import {Link} from 'react-router-dom'

const variants = {
	hidden: {
		opacity: 0,
		y: 150
	},
	visible: {
		opacity: 1, 
		y: 0
	}
}
function TodoWidget(){
	const {userInfo} = useAuth()
	return(
		<Link to="/todo"><motion.div whileTap={{scale: 0.85}} className="text-white dark:text-white bg-violet-600 rounded-xl p-4">
			<div className="flex"><h4 className="font-medium text-2xl">Tasks</h4>
				<Button text={<TbChevronRight fontSize={25} />} className="p-1 bg-white/25 rounded-lg ml-auto" />
			</div>
			<p className="text-sm text-slate-200 mt-2 w-32">You have tasks today</p>
			
		</motion.div>
		</Link>
	)
}

function EventWidget() {
	return (
		<Link to="/events"><motion.div whileTap={{scale: 0.85}} className="text-white dark:text-white ml-auto bg-purple-500 dark:bg-[#332f6c] rounded-xl p-4">
			<div className="flex"><h4 className="font-medium text-2xl">Events</h4>
				<Button text={<TbChevronRight fontSize={25} />} className="p-1 bg-white/25 rounded-lg ml-auto" />
			</div>
			<p className="text-sm text-slate-200 mt-2 w-32">You have events today</p>
			
		</motion.div>
		</Link>
	)
}

const Widget = () => {
	return (
		<motion.div variants={variants} initial="hidden" animate="visible" className="flex justify-between mt-7">
			<TodoWidget />
			<EventWidget />
		</motion.div>
	)
}

export default Widget