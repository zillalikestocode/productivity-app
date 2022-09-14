//@ts-nocheck
import {motion} from 'framer-motion'

const Button = (props) => {
	return (
		<motion.button {...props}>
			{props.text}
		</motion.button>
	)
}

export default Button