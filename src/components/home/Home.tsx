//@ts-nocheck
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import Statistics from './Statistics'
import Widget from './Widget'
import Quote from './Quote'
import {TbCopyright} from 'react-icons/tb'

const Home = ()=>{
	const {userInfo} = useAuth()
	return (
		<div className="px-5 dark:text-slate-200">
			<div><h4 className="text-xl font-medium text-slate-600 dark:text-slate-200">Hello {userInfo?.name?.split(" ")[0]}</h4></div>
			<div>
				<Statistics />
				<Widget />
			</div>
			<Quote />
			<footer className="w-full text-center flex items-center justify-center mb-3 mt-3"><TbCopyright fontSize={25}/>&nbsp;Emmanuel Ngoka</footer>
		</div>
	)
}

export default Home
