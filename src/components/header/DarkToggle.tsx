import { motion } from 'framer-motion';
import { BiMoon, BiSun } from 'react-icons/bi'

const DarkToggle = ({ dark, setDark }) => {
  const variants = {
    initial: {
      x: 0
    },
    dark: {
      x: 0
    },
    light: {
      x: 0
    }
  }

  const toggle = {
    initial: {
      x: 0
    },
    dark: {
      x: 0,
    },
    light: {
      x: '100%',
      background: 'white'
    }
  }
  return (
    <motion.div variants={variants} initial='initial' animate={`${dark ? 'dark' : 'light'}`} onClick={() => setDark(!dark)} className={`cursor-pointer rounded-3xl p-1 ml-auto h-9 ${dark ? 'bg-slate-500' : 'bg-gray-300'} w-16`}>
      <motion.span variants={toggle} className=" h-full flex items-center justify-center w-fit bg-slate-900 rounded-full p-1">
        {dark ? <BiMoon style={{ fill: 'white' }} fontSize={20} /> : <BiSun fontSize={20} />}
      </motion.span>
    </motion.div>
  )
}

export default DarkToggle
