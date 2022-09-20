//@ts-nocheck
import {motion, AnimateSharedLayout, AnimatePresence} from 'framer-motion'
import {useState} from 'react'
import {TbX} from 'react-icons/tb'
import Button from '../../Button'
import {MdOutlineDelete} from 'react-icons/md'
import {useAuth} from '../../../contexts/AuthContext'

const WeekItem = ({item, setLoader}) => {
	const [full, showFull] = useState(false)
	const {deleteEvents} = useAuth()

	const deleteEvent = async()=>{
		try{
			setLoader(true)
			await deleteEvents(item)
		}catch(err){
			console.log(err.message)
		}
		setLoader(false)
	}
	return (
		<AnimateSharedLayout>
		<motion.div onClick={()=> showFull(true)} layoutId={item.id} className="bg-white dark:bg-[#332f6c] ml-auto p-3 w-56 rounded-lg">
			<h4 className="font-medium text-lg">{item.title}</h4>
			<p className="max-w-[250px] overflow-x-hidden whitespace-nowrap">{item.note ? item.note : '--'}</p>
			<h4 className="text-sm font-medium">{item.time ? item.time : '--'}</h4>
		</motion.div>
		{full && <div className="fixed top-0 right-0 z-30 bottom-0 left-0" onClick={()=> showFull(false)} />}
		<AnimatePresence>{full && <motion.div layoutId={item.id} className="z-40 text-white absolute rounded-md p-5 min-h-[100px] top-24 left-0 bg-gradient-to-br from-purple-400 to-purple-600 right-0 m-auto w-72">
					<Button className="absolute right-3" text={<TbX fontSize={20}/>} onClick={()=> showFull(false)} />
					<h4 className="text-2xl font-medium ">{item.title}</h4>
					<p className="mt-5">{item.note ? item.note  : '--'}</p>
					<div className="flex mt-6">
						<h4>{item.time ? item.time : '--'}</h4>
						<Button onClick={deleteEvent} text={<MdOutlineDelete fontSize={25} />} className="ml-auto" />
					</div>
				</motion.div>}</AnimatePresence>
		</AnimateSharedLayout>
	)
}

export default WeekItem