//@ts-nocheck
import {useState} from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {motion} from 'framer-motion'
import {useAuth} from '../../contexts/AuthContext'

const Statistics = ()=>{
  const {userInfo} = useAuth()
  const completed = userInfo?.completedWeek
  const date = new Date()
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const first = date.getDate() - date.getDay()
  const last = first + 6
  const firstDay = new Date(date.setDate(first))
  // const lastDay = new Date(date.setDate(last))
  // console.log(firstDay.toDateString())
  let week = []
  for(let i = 0; i <=6; i ++){
  	week.push(new Date(date.setDate(first + i)).toDateString())
  }
  const completedThisWeek = completed?.filter(i => week.includes(new Date(i.date).toDateString()))
  const weekStats = week.map(item => ({name: item.split(' ')[0].toUpperCase(), number: completed ? completed.filter(i => new Date(i.date).toDateString() === item).length : 0}))
  const statistics = {
    hidden: {
      opacity: 0,
      y: 100
    }, 
    visible: {
      opacity: 1, 
      y: 0
    }
  }

  return (
    <motion.div variants={statistics} whileHover={{scale: 1.1}} whileTap={{scale: 1.1}} initial="hidden" animate="visible" className="text-white relative h-44 bg-gradient-to-br from-purple-400 dark:from-purple-500 dark:shadow-none dark:to-purple-700 shadow-lg shadow-purple-600 w-full mt-5 to-purple-600 rounded-xl p-3">
    <h4 className="text-sm text-center dark:text-white text-slate-200">You have completed {completedThisWeek ? completedThisWeek.length : '0'} task(s) this week</h4>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={400} data={weekStats}>
          <Line type='monotone' strokeWidth={2} stroke="#fff" dot={false} dataKey="number" />
          <XAxis axisLine={false} interval="preserveStartEnd" tickLine={false}  tick={{fill: 'white', fontSize: 12}} dataKey="name"/>
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
export default Statistics
