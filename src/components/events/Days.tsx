import {useState} from 'react'
import {motion} from 'framer-motion'
import days from './calendar.js'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'

const Days = ({chosenDay, setDay}) => {
	const [initialSlide, setInitial] = useState()
	const date = new Date()
	const today = date.getFullYear() + '-' + (String(date.getMonth()).length === 1 ? '0' +(date.getMonth() + 1) : date.getMonth() + 1) + '-' + (String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate())
	return (
		<div>
			<Swiper 
			slidesPerView="auto"
			className="!flex !w-full py-5"
			initialSlide={Number(chosenDay.split(" ")[2]) - 3}>
				{days.map((day, i)=>{
					return (
						<SwiperSlide key={i} className="!flex-shrink-0 !w-auto !mx-1.5">
							<motion.div onClick={()=> setDay(day)} className={`bg-white dark:bg-[#332f6c] dark:text-slate-200 text-slate-600 w-16 py-5 flex flex-col items-center rounded-[30px] ${chosenDay === day && '!bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 !text-white shadow-violet-500 dark:shadow-violet-700 shadow-lg'}`}>
								<h4 className="text-2xl font-medium">{day.split(' ')[2]}</h4>
								<h4 className="text-base font-medium">{day.split(' ')[0]}</h4>
							</motion.div>
						</SwiperSlide>
					)
				})}
			</Swiper>			
		</div>
	)
}

export default Days