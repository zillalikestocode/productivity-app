//@ts-nocheck
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

const Home = ()=>{
	const {userInfo} = useAuth()
	return (
		<div className="px-5">
			<div><h4 className="text-3xl">Hello {userInfo?.name.split(" ")[0]},</h4></div>
		</div>
	)
}

export default Home