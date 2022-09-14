//@ts-nocheck
import {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {TbUser} from 'react-icons/tb'
import Home from './Home'
import Name from './Name'
import Img from './Img'

const Settings = () => {
	const [changeName, setName] = useState(false)
	const [changeImg, setImg] = useState(false)
	const [loading, setLoad] = useState(false)
	return (
		<div className="px-5">
			<h4 className="text-3xl font-medium dark:text-slate-200">Settings</h4>
			<Home loading={loading} setImg={setImg} setName={setName} />
			<AnimatePresence>{changeName && <Name setLoad={setLoad} setName={setName}/>}</AnimatePresence>
			<AnimatePresence>{changeImg && <Img setLoad={setLoad} setImg={setImg} />}</AnimatePresence>
		</div>
	)
}

export default Settings