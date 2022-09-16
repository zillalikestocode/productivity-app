//@ts-nocheck
import {useEffect, useState} from 'react'
import {AnimatePresence, AnimateSharedLayout, motion} from 'framer-motion'
import {useAuth} from '../../contexts/AuthContext'
import Button from '../Button'
import { FiSearch} from 'react-icons/fi'
import {HiPlus} from 'react-icons/hi'
import {TbCalendar} from 'react-icons/tb'
import TodoItem from './TodoItem'
import CompletedItem from './CompletedItem'
import Loader from '../Loader'

const Todo = () => {
	const {userInfo, setAdd, deleteAllCompleted} = useAuth()
	const [todayLoading, setToday] = useState(false);
	const [dayLoading, setDay] = useState(false);
	const date = new Date();
	console.log(userInfo);
	const list = userInfo?.todos
	const completed = userInfo?.completed
	const today = date.getFullYear() + '-' + (String(date.getMonth()).length === 1 ? '0' +(date.getMonth() + 1) : date.getMonth() + 1) + '-' + (String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate())
	const yesterday = date.getFullYear() + '-' + (String(date.getMonth()).length === 1 ? '0' +(date.getMonth() + 1) : date.getMonth() + 1) + '-' + (String(date.getDate()).length === 1 ? '0' + (date.getDate() - 1) : (date.getDate() - 1))
    const todayList = userInfo?.todos?.filter((todo) => todo.date === today)
	const otherDays = userInfo?.todos?.filter((todo)=> todo.date !== today)
	const container = {
		initial: {
			x: 0,
		},
		animate: {
			x: 0,
			transition: {
				staggerChildren: 0.3,
				delayChildren: 0.8
			}
		},
		exit: {
			x: 0
		}
	}
	// useEffect(()=>{
	// 	async function removeCompleted(){
	// 		await deleteAllCompleted()
	// 	}
	// 	if (userInfo?.completed[0]?.date !== today){
	// 		removeCompleted()
	// 	}
	// }, [])
	return (
		<AnimateSharedLayout>
		<motion.div className="px-5 text-slate-900">
			<motion.div className="flex items-center">
                 <div className="ml-5 relative flex items-center">
                 <span className="text-slate-900 dark:text-slate-400"><FiSearch fontSize={25}/></span>
			     <motion.input placeholder="Search" className="font-medium text-slate-900 dark:text-slate-400 text-lg p-2 max-w-[55vw] bg-transparent focus:outline-none" />
                 </div>
			    <Button onClick={()=> setAdd(true)} className="ml-auto mr-5 w-10 h-10 flex dark:shadow-violet-500/75 justify-center items-center rounded-full dark:bg-purple-700 shadow-lg shadow-violet-500 bg-gradient-to-br from-purple-400 to-purple-600 text-slate-200" text={<HiPlus fontSize={20}/>}/>
			</motion.div>
			<div>

			{/*Todays task*/}

				<motion.div className="mt-2">
				<h4 className="dark:text-slate-300 text-slate-600 font-medium text-lg mb-2">TODAY</h4>
					{!todayLoading ? <motion.div variants={container} initial="initial" exit="exit" animate="animate" className="flex flex-col items-center gap-3">
											{todayList?.length !== 0 ?
												todayList?.map((todo, i) => {
													return (
														<AnimatePresence>
														<TodoItem setLoading={setToday} key={i} todo={todo} />
														</AnimatePresence>
													)
												})
											: <h4 className="text-lg text-slate-500">You have no tasks for today</h4>}
						{
							completed?.map((todo, i) => {
								return (
									<CompletedItem key={i} todo={todo} />
								)
							})
						}
					</motion.div>: <Loader unit="10" extra="mt-3" />}
				</motion.div>

				{/*Other days*/}
				{otherDays?.length !== 0 && <motion.div className="mt-4">
								<h4 className="dark:text-slate-300 text-slate-600 font-medium text-lg mb-2">OTHER TASKS</h4>
								{!dayLoading ? <motion.div variants={container} initial="initial" animate="animate" exit="exit" className="flex flex-col gap-4 items-center">
																	{
																			otherDays?.map((todo, i) => {
																				return (
																					<AnimatePresence>
																					<TodoItem setLoading={setDay} key={i} todo={todo} />
																					</AnimatePresence>

																				)
																			})
																		}
																</motion.div>: <Loader unit="10" extra="mt-3" />}
								</motion.div>}
			</div>
			<Button className="fixed bottom-5 right-5 rounded-full bg-gradient-to-br shadow-lg dark:shadow-violet-500/75 shadow-violet-500 from-purple-400 to-purple-600 w-16 h-16 text-slate-200 flex items-center justify-center" text={<TbCalendar fontSize={30}/>} />

		</motion.div>
		</AnimateSharedLayout>
	)
}

export default Todo
