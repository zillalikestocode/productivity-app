import React from 'react'
import {motion} from 'framer-motion'

const Loader = ({unit, extra}) => {
	const spin = {
		loop: Infinity,
		duration: 1,
		ease: "linear"
	}
	return (
		<motion.div className={`mt-24 ${extra}`}>
			<motion.span className={`absolute rounded-full w-16 h-16 border-[10px] left-0 right-0 m-auto border-t-purple-600 border-slate-400 dark:border-slate-500 dark:border-t-purple-500 ${unit && `w-${unit} h-${unit}`} `} animate={{rotate: 360}} transition={spin}/>
		</motion.div>
	)
}

export default Loader