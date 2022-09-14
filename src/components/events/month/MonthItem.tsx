import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import Button from '../../Button'
import {MdOutlineDelete} from 'react-icons/md'
import {BsCircleFill, BsThreeDots} from 'react-icons/bs'
import {useAuth} from '../../../contexts/AuthContext'

const Prompt = ({item})=>{
	const {deleteEvents} = useAuth()
	const deleteEvent = async()=>{
		try{
			deleteEvents(item)
		}catch(err){
			console.log(err.message)
		}
	}
	return (
		<motion.div className="right-1.5 absolute items-center flex-col flex bottom-7">
			<Button onClick={deleteEvent} text={<MdOutlineDelete fontSize={20}/>} className="rounded text-slate-900 bg-white z-50 dark:bg-[#332f6c] p-2"/>
			<div className='bg-white rotate-45 absolute -bottom-1 w-4 h-4' />
		</motion.div>
	)
}

const MonthItem = ({item, selected, setSelected, setDisable, disable}) => {
	const [delPrompt, setPrompt] = useState(false)
	const handleClick = (e)=>{
		setSelected(item.id)		
	}
	const handlePrompt = (e)=>{
		setPrompt(!delPrompt)
		setDisable(false)
	}
	const variants = {
		hidden: {
			opacity: 0,
			y: 100
		},
		visible: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0
		}
	}
	const fill = {
		hidden : {
			x: 0
		},
		drop: {
			whiteSpace: 'normal',
		},
		visible: {
			whiteSpace: 'nowrap',
		}
	}
	return (
		<motion.div variants={variants} className="flex w-full gap-5 relative text-slate-700">
			<motion.div onClick={handleClick} className={`cursor-pointer rounded-lg bg-white transition-colors duration-150 ease-in-out shadow-lg p-3 relative w-full ${selected === item.id && 'bg-gradient-to-br from-violet-500 to-violet-600 text-white'}`}>
				{delPrompt && !disable && selected === item.id && <Prompt item={item}/>}
				<div className="flex">
					<h4 className="font-medium text-lg ">{item.title}</h4>
					<h4 className={`font-medium ml-auto text-sm  text-slate-500 ${selected === item.id && 'text-slate-200'}`}>{item.time ? item.time : '--'}</h4>
				</div>
				<div>
					<motion.p variants={fill} initial="hidden" animate={selected === item.id ? 'drop' : 'visible'} className={` max-w-[90%] overflow-x-hidden text-left`}>{item.note ? item.note : '--'}</motion.p> </div>
				<Button onClick={handlePrompt} text={<BsThreeDots fontSize={20} />} className={`absolute click bottom-1 right-3 text-slate-500 ${selected === item.id && 'text-slate-200'}`} />
			</motion.div>
		</motion.div>			
	)
}

export default MonthItem