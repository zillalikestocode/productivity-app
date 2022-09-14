import {useState} from 'react'
import {motion, AnimatePresence, AnimateSharedLayout, LayoutGroup} from 'framer-motion'
import {TbCalendar, TbClock, TbPoint, TbX} from 'react-icons/tb'
import Button from '../Button'
import {useAuth} from '../../contexts/AuthContext'

const TodoItem = ({todo, setLoading}) => {
	const [open, setOpen] = useState(null)
	const {deleteTodo,userInfo, addToCompleted} = useAuth()
	const date = new Date()
	const today = date.getFullYear() + '-' + (String(date.getMonth()).length === 1 ? '0' +(date.getMonth() + 1) : date.getMonth() + 1) + '-' + (String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate())
	const remove = async(data)=>{
		await setOpen(null)
		try{
			await setLoading(true)
			await deleteTodo(data)
		}catch(err){
			console.log(err.message)
		}
		setLoading(false)
	}
	const complete = async(data)=>{
		try{
			await addToCompleted(data)
			remove(todo)
		}catch(err){
			console.log(err.message)
		}
	}
	const item = {
		initial: {
			y: 100,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 0.3,
			}
		}
	}
	return (
		<LayoutGroup >
		{open && <div onClick={()=> setOpen(null)} className="absolute bg-slate-400/25 z-10 top-0 bottom-0 left-0 right-0" />}
		<motion.div variants={item} layoutId={todo.id} onClick={()=> setOpen(todo.id)} className="dark:text-slate-200 dark:bg-[#332f6c] flex relative cursor-pointer w-[95%] bg-white m-auto rounded-xl shadow-xl p-3">
			<div className="absolute top-3 left-[19px] bottom-2 w-0.5 bg-purple-500" />
				<div className="flex flex-col gap-2 ml-7">
					<div>
					<div className="absolute dark:bg-[#332f6c] bg-white top-4 left-2 text-purple-500"><TbPoint fontSize={25}/></div>
				<div>
					<h4 className="text-lg font-medium">{todo.title}</h4>
					<p className="dark:text-slate-300 text-slate-700 text-sm">{todo.note}</p>
				</div>
				</div>
				<div>
					<div className="absolute dark:bg-[#332f6c] bg-white left-2.5 text-purple-500"><TbClock fontSize={20}/></div>
					<h4>{todo.time ? todo.time : '--'}</h4>
				</div>
				<div>
					<div className="absolute left-2.5 dark:bg-[#332f6c] bg-white text-purple-500"><TbCalendar fontSize={20}/></div>
					<h4>{todo.date ? todo.date : '--'}</h4>
				</div>
			</div>
		</motion.div>
		<AnimatePresence>{open && <motion.div layoutId={todo.id} initial={{x: 0, y:0}} className="fixed top-[200px] z-30 dark:text-slate-200 dark:bg-[#332f6c] md:cursor-pointer w-[95%] bg-white m-auto rounded-xl shadow-xl p-3">
					<div className="flex relative p-2">
					<div onClick={()=> setOpen(null)} className="rounded-full absolute w-6 flex items-center justify-center h-6 font-medium right-1 bg-gray-400 text-white dark:text-[#332f6c]"><TbX fontSize={20} /></div>
					<div  className="absolute top-3 left-[19px] bottom-2 w-0.5 bg-purple-500" />
						<div className="flex flex-col gap-2 ml-7">
							<div>
							<div className="absolute dark:bg-[#332f6c] bg-white top-4 left-2 text-purple-500"><TbPoint fontSize={25}/></div>
						<div>
							<h4 className="text-lg font-medium">{todo.title}</h4>
							<p className="dark:text-slate-300 text-slate-700 text-sm">{todo.note}</p>
						</div>
						</div>
						<div>
							<div className="absolute dark:bg-[#332f6c] bg-white left-2.5 text-purple-500"><TbClock fontSize={20}/></div>
							<h4>{todo.time ? todo.time : '--'}</h4>
						</div>
						<div>
							<div className="absolute left-2.5 dark:bg-[#332f6c] bg-white text-purple-500"><TbCalendar fontSize={20}/></div>
							<h4>{todo.date ? todo.date : '--'}</h4>
						</div>
					</div>
					</div>
					<div className="flex gap-3">
						<Button onClick={()=> complete({...todo, date: today})} text='COMPLETE' className="bg-gradient-to-r from-green-500 to-green-600 text-center w-24 p-2 rounded-3xl px-3 text-sm text-white" />
						<Button text='DELETE' onClick={()=> remove(todo)} className="bg-gradient-to-r from-red-500 to-fuchsia-700 text-center w-24 p-2 rounded-3xl px-3 text-sm text-white" />
					</div>
				</motion.div>}</AnimatePresence>
		</LayoutGroup>
	)
}

export default TodoItem