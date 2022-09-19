import {useState} from 'react'
import {motion} from 'framer-motion'
import {useAuth} from '../../contexts/AuthContext'
import Button from '../Button'
import {TbChevronRight} from 'react-icons/tb'

function TodoWidget(){
	return(
		<motion.div className="text-slate-200 dark:text-white bg-violet-600 rounded-xl p-3">
			<div className="flex"><h4 className="font-medium text-2xl">Tasks</h4>
				<Button text={<TbChevronRight fontSize={25} />} className="p-1 bg-white/25 rounded-md ml-auto" />
			</div>
			<p className="text-sm text-slate-300 mt-2 w-32">You have tasks today</p>
			
		</motion.div>
	)
}

function EventWidget() {
	return (
		<motion.div className="">
			
		</motion.div>
	)
}

const Widget = () => {
	return (
		<div className="flex w-full mt-7">
			<TodoWidget />
			<EventWidget />
		</div>
	)
}

export default Widget