import {useState} from 'react'
import {useAuth} from '../../../contexts/AuthContext'
import {motion, AnimatePresence} from 'framer-motion'
import days from '../calendar'
import Calendar from './Calendar'

const Month = ({chosenDay}) => {
    const {userInfo} = useAuth()
    console.log(days)
	return (
		<div>
			<Calendar />
		</div>
	)
}

export default Month