import {useState} from 'react'
import {motion} from 'framer-motion'
import {TbPoint, TbClock, TbCalendar, TbX} from 'react-icons/tb'
import {useAuth} from '../../contexts/AuthContext'
import Loader from '../Loader'

const CompletedItem = ({todo}) => {
	const {deleteCompleted} = useAuth()
	const [loading, setLoading] = useState(false)
	const remove = async()=>{
	try{
		await setLoading(true)
		await deleteCompleted(todo)
	}catch(err){
		console.log(err.message)
	}
	setLoading(false)
	}
	return (
		<motion.div layoutId={todo.id} className="dark:text-slate-500 text-slate-600 dark:bg-[#332f6c] flex relative w-[95%] bg-slate-300 m-auto rounded-xl shadow-xl p-3">
			<div onClick={remove} className="absolute cursor-pointer text-red-700/50 right-4"><TbX fontSize={25}/></div>
			{loading && <div className="absolute left-0 right-0 m-auto"><Loader unit='10' extra="mt-4" /></div>}
			<div className={`absolute top-3 left-[19px] bottom-2 w-0.5 bg-purple-500 ${loading && 'opacity-0'}`} />
				<div className={`flex flex-col gap-2 ml-7 ${loading && 'opacity-0'}`}>
					<div>
					<div className="absolute dark:bg-[#332f6c] bg-slate-300 top-4 left-2 text-purple-500"><TbPoint fontSize={25}/></div>
				<div>
					<h4 className="text-lg font-medium">{todo.title}</h4>
					<p className="dark:text-slate-300 text-slate-700 text-sm">{todo.note}</p>
				</div>
				</div>
				<div>
					<div className="absolute dark:bg-[#332f6c] bg-slate-300 left-2.5 text-purple-500"><TbClock fontSize={20}/></div>
					<h4>{todo.time ? todo.time : '--'}</h4>
				</div>
				<div className="">
					<div className="absolute left-2.5 dark:bg-[#332f6c] bg-slate-300 text-purple-500"><TbCalendar fontSize={20}/></div>
					<h4>{todo.date ? todo.date : '--'}</h4>
				</div>
					<h4 className="absolute bottom-2 right-3 font-semibold">COMPLETED</h4>
			</div>
		</motion.div>
	)
}

export default CompletedItem