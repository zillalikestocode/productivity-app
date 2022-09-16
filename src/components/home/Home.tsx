//@ts-nocheck
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'
import Statistics from './Statistics'

const Home = ()=>{
	const {userInfo} = useAuth()
	return (
		<div className="px-5 dark:text-slate-200">
			<div><h4 className="text-2xl">Hello {userInfo?.name.split(" ")[0]}</h4></div>
			<div>
				<Statistics />
			</div>
		</div>
	)
}

export default Home
