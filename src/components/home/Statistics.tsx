//@ts-nocheck
import {useState} from 'react'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import {motion} from 'framer-motion'
import {useAuth} from '../../contexts/AuthContext'

const Statistics = ()=>{
  const {userInfo} = useAuth()
  const completed = userInfo?.completed
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
    const weekStats = week.map(item => ({name: item.split(' ')[0].toUpperCase(), number: completed?.filter(i => new Date(i.date).toDateString() === item).length}))
  return (
    <motion.div className="text-white bg-gradient-to-br from-purple-400 shadow-xl w-full h-36 to-purple-600 rounded-xl p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={400} data={weekStats}>
          <Line type='monotone' strokeWidth={2} stroke="#fff" dot={false} dataKey="number" />
          <XAxis axisLine={false} interval="preserveStartEnd" tickLine={false} height={20} tick={{fill: 'white', fontSize: 12}} className="!text-white" dataKey="name"/>
          <YAxis hide />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
export default Statistics
