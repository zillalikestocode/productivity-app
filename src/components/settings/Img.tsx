import {useState} from 'react'
import {motion} from 'framer-motion'
import {useAuth} from '../../contexts/AuthContext'
import Button from '../Button'

export default ({setImg, setLoad})=>{
	const {avatars, userInfo, changeImg} = useAuth()
	const [newImg, setNewImg] = useState(userInfo?.img) 
	const change = async ()=>{
		try{
			await setLoad(true)
			setImg(false)
			await changeImg(newImg)
			setLoad(false)
		}catch(err){
			console.log(err.message)
			setLoad(false)
		}
	}
	const pop = {
		hidden: {
			opacity: 0,
			scale: 0.8
		},
		visible: {
			opacity: 1,
			scale: 1
		},
		exit: {
			opacity: 0,
			scale: 0.8
		}
	}
    return (
        <motion.div className="absolute w-full left-0 top-0 bottom-0 bg-slate-700/25 text-center">
            <motion.div variants={pop} initial='hidden' animate="visible" exit="exit" className="dark:bg-[#332f6c] mt-16 p-3 bg-white w-[90%] rounded-xl m-auto shadow-xl">
            	<h4 className="dark:text-slate-300 text-lg text-slate-500 font-medium mb-5">CHANGE YOUR AVATAR</h4>
            	<motion.div className="flex flex-wrap justify-center gap-3">
	            	{avatars?.map((item, i)=>{
	            		return (
	            			<img src={item} onClick={()=> setNewImg(item)} className={`w-16 rounded-xl ${newImg === item && 'border-[3px] border-purple-500'}`} key={i} alt=""/>
	            		)
	            	})}
            	</motion.div>
            	<Button onClick={change} text="Change avatar" className=" mt-5 text-white bg-gradient-to-tr from-purple-500 to-fuchsia-500 rounded-3xl text-lg p-3 py-2"/>
            </motion.div>
        </motion.div>
    )
}