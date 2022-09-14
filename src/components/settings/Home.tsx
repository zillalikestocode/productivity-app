//@ts-nocheck
import {useState} from 'react'
import {motion} from 'framer-motion'
import {TbUser} from 'react-icons/tb'
import {useAuth} from '../../contexts/AuthContext'
import {BiPencil} from 'react-icons/bi'
import Button from '../Button'
import Loader from '../Loader'
import SignUp from '../auth/SignUp'
import {useNavigate} from 'react-router-dom'

const Home = ({setImg, setName, loading}) => {
	const navigate = useNavigate()
	const {userInfo, setData, leave, setLoading} = useAuth()
	const signOut = async()=>{
		try{
			await setLoading(true)
			await leave()
			setLoading(false)
		}catch(err){
			console.log(err.message)
		}
	}
	const signInToAnother = async()=>{
		try {
			await signOut()
			setTimeout(()=> navigate('/auth'), 200)
		}catch(err){
			console.log(err.message)
		}
	}
	return (
		<motion.div className="text-slate-900 dark:text-slate-200 mt-5">
			{!loading ? <motion.div className="flex flex-col items-center gap-2">
							<div className="relative w-fit">
								<motion.img src={userInfo?.img} className="w-24 rounded-lg" />
								<div onClick={()=> setImg(true)} className='cursor-pointer absolute bottom-1 right-1'><BiPencil fontSize={25} /></div>
							</div>
							<motion.div className="flex gap-3">
								<h4 className="font-medium text-xl">{userInfo?.name}</h4>
								<Button onClick={()=> setName(true)} text={<BiPencil fontSize={25} />} />
							</motion.div>
							<motion.div className="text-xl flex flex-col items-center">
								<Button onClick={signOut} text='Log Out' className="p-2 bg-slate-400 w-full rounded-lg text-white"/>
								<h4>or</h4>
								<Button onClick={signInToAnother} text='Log in to another account' className="shadow-xl dark:shadow-violet-900 shadow-purple-500 p-2 font-medium bg-purple-500 shadow-lg text-white w-full rounded-lg"/>
							</motion.div>
						</motion.div>: <Loader />}
		</motion.div>
	)
}

export default Home