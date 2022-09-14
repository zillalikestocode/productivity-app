//@ts-nocheck
import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useAuth} from '../../../contexts/AuthContext'
import TodayItem from './TodayItem'

const Today = ({chosenDay}) => {
	const [disablePrompt, setDisable] = useState(true)
	const variants = {
		hidden: {
			x: 0
		}, 
		visible: {
			x: 0,
			transition: {
				staggerChildren: 0.3
			}
		},
		exit: {
			x: 0
		}
	}
	const [selected, setSelected] = useState()
	const {userInfo} = useAuth()
	const date = new Date(chosenDay)
	const today = date.getFullYear() + '-' + (String(date.getMonth()).length === 1 ? '0' +(date.getMonth() + 1) : date.getMonth() + 1) + '-' + (String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate())
	let events = userInfo?.events.filter(item => item.date === today)
	const todayEvents = events.sort((a, b)=> (a.time.split(':').concat() > b.time.split(':').concat()) ? 1 : -1)
	
	useEffect(()=>{
		setDisable(true)
	}, [selected])
	return (
		<motion.div className="p-3">
			<motion.div variants={variants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-4 relative">
			<div className="absolute left-1.5 top-0 bg-slate-300 bottom-0 w-1" />
				{
					todayEvents?.map((item, i)=>{
						return (
							<AnimatePresence><TodayItem disable={disablePrompt} setDisable={setDisable} key={i} item={item} selected={selected} setSelected={setSelected} /></AnimatePresence>
						)
					})
				}
			</motion.div>
		</motion.div>
	)
}

export default Today