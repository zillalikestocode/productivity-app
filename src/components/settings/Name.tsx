import {useState} from 'react'
import {motion} from 'framer-motion'
import {useAuth} from '../../contexts/AuthContext'
import Button from '../Button'

const Name = ({setName, setLoad})=>{
	const {userInfo, changeName} = useAuth()

	const [newName, setUsername] = useState(userInfo?.name)
	const oldName = newName === userInfo?.name
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
	const change = async ()=>{
		try{
			await setLoad(true)
			setName(false)
			await changeName(newName)
			setUsername('')
			setLoad(false)
		}catch(err){
			console.log(err.message)
			setLoad(false)
		}
	}
    return (
        <motion.div className="absolute w-full left-0 top-0 bottom-0 bg-slate-700/25 text-center">
            <motion.div variants={pop} initial='hidden' animate="visible" exit="exit" className="dark:bg-[#332f6c] mt-16 p-5 bg-white w-[90%] rounded-xl m-auto shadow-xl">
            	<h4 className="text-lg dark:text-slate-300 text-slate-500 font-medium mb-5">CHANGE YOUR NAME</h4>
            	<motion.div className="flex flex-wrap justify-center gap-3">
	            	<input placeholder="Input your new name" onChange={(e)=> setUsername(e.target.value)} className="bg-slate-300 shadow-lg rounded-lg focus:outline-none focus:bg-purple-500 focus:text-white p-2" value={newName} />
            	</motion.div>
            	<Button onClick={change} text={oldName ? 'Cancel' : 'Change Name'} className=" mt-5 text-white bg-gradient-to-tr from-purple-500 to-fuchsia-500 rounded-3xl p-3 py-2"/>
            </motion.div>
        </motion.div>
    )
}
export default Name