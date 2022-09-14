import {useState} from 'react'
import {motion} from 'framer-motion'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../contexts/AuthContext'

const Input = ({type, name, placeholder, extra, onChange})=>{
	const [showPass, setShow] = useState(false)
	const show = ()=>{
		setShow(!showPass)		
	}
	return (
		<div className="relative">
		<motion.input whileFocus={{scale: 1.1}} required onChange={onChange} type={!showPass ? type : 'text'} name={name} placeholder={placeholder} className={`focus:outline-none bg-violet-50 focus:dark:shadow-violet-900 focus:shadow-xl focus:shadow-purple-400 rounded-md dark:bg-slate-900/75 dark:text-slate-500 p-2 ${extra}`}/>
			{type === 'password' && <span onClick={show} className="cursor-pointer text-xs font-medium text-slate-500 absolute top-3 right-3">{!showPass ? 'SHOW': 'HIDE'}</span>}
		</div>
	)
}

const SignUp = () => {
	const {signUp, signIn, setLoading, userInfo, error, setError} = useAuth()

	const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
	const [userData, setData] = useState(initialState)
	const navigate = useNavigate()
	const [isSignUp, setSignUp] = useState(true)
	const handleSubmit = async(e)=>{
		e.preventDefault()
			await setLoading(true)
		if(isSignUp){
			await signUp(userData)
		}else{
			await signIn(userData)
		}
			setLoading(false)
	}
	const variants = {
		initial: {
			y: '100%'
		},
		animate: {
			y: 0,
		}
	}
	const handleChange = (e)=>{
		setData((prev)=> {return {...prev, [e.target.name]: e.target.value}})
	}
	const disabled = userData.password !== userData.confirmPassword || userData.password.length < 8
    const doNotMatch = userData.password !== '' && isSignUp && userData.password !== userData.confirmPassword
    const tooShort = userData.password !== '' && isSignUp && userData.password.length < 8
	return (
		<motion.div className="px-3 mt-20 w-fit rounded-xl m-auto" variants={variants} initial="initial" animate="animate">
			<form action="" onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
				<h4 className="text-xl dark:text-white text-slate-900 font-medium">{isSignUp ? 'Sign Up':'Sign In'}</h4>
				{isSignUp && <div className="flex gap-2">
					<Input onChange={handleChange} placeholder="First Name" type="text" name="firstName" extra='w-32' />
					<Input onChange={handleChange} placeholder="Last Name" type="text" name="lastName" extra='w-32'/>
				</div>}
				<Input onChange={handleChange} type="email" placeholder="Email" name="email" />
				<Input onChange={handleChange} type="password" placeholder="Password" name="password" />
				{isSignUp && <Input onChange={handleChange} type="password" placeholder="Confirm Password" name="confirmPassword" />}
				{error && <p className="text-red-500">{error}</p>}
                {doNotMatch && <p className="text-red-500">Passwords do not match</p>}
                {tooShort && <p className="text-red-500">Password too short</p>}
				<Button text={isSignUp ? 'Already have an account? Sign In':"Don't have an account? Sign up"} onClick={(e)=>{
					e.preventDefault()
					setSignUp(!isSignUp)
                    setError(false)}} 
					className="text-purple-600 dark:text-purple-400/75"/>
				<Button disabled={isSignUp && disabled} text={isSignUp ? 'Sign Up':'Sign In'} type="submit" className={`w-full p-2 rounded-md text-slate-100  ${isSignUp && disabled ? 'bg-slate-500 dark:bg-slate-900/75  dark:text-slate-500 text-slate-200': 'bg-violet-400 dark:bg-purple-700 shadow-xl dark:shadow-violet-900 shadow-purple-500'}`}/>
			</form>
		</motion.div>
	)
}


export default SignUp