//@ts-nocheck
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'

const Quote = ()=>{
	const [fullQuote, setQuote] = useState()
	useEffect(() => {
		fetch('https://type.fit/api/quotes')
		.then(res => res.json())
		.then(res => setQuote(res))
	}, [])
	const random = fullQuote ? Math.floor(Math.random() * fullQuote?.length) : null
	const quote = fullQuote ? fullQuote[random - 1] : null
	return (
		<motion.div className="my-5 rounded-lg p-5">
			<p className="font-['Alex_Brush'] text-center text-3xl">{quote?.text}</p>
			<h4 className="float-right">- {quote?.author}</h4>
		</motion.div>
	)
} 
export default Quote