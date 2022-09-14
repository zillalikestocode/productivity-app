import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import Button from '../../Button'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'
import Day from './Day'

export default ()=>{
    const now = new Date()
    const [currentMonth, setCurrent] = useState(now.getMonth())
    const [year, changeYear] = useState(now.getFullYear())
    const [month, changeMonth] = useState(now.getMonth())
    console.log(month)
    const date = new Date(year, month, 1)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const realDate = new Date(year, month, 1)
    const fullDate = realDate.toDateString()
    const firstDate = fullDate.split(" ")[0]
    const firstNo = daysOfWeek.indexOf(firstDate) + 1
    const [dayList, setList] = useState([])
    console.log(firstNo)
    
    const updateDate = ()=>{
        let days = []
        while (date.getMonth() === month){
        days.push(new Date(date).toDateString())
        date.setDate(date.getDate() + 1)
    }
        return days
    }
    async function increaseMonth (){
        if (month === 11){
            await changeMonth(0)
            await setCurrent(0)
            await changeYear(year + 1)
        }else{
            await changeMonth(month + 1)
            await setCurrent(currentMonth + 1)
        }
    }
    async function decreaseMonth (){
       if (month === 0){
            await changeMonth(11)
            await setCurrent(11)
            await changeYear(year - 1)
        }else{
            await changeMonth(month - 1)
            await setCurrent(currentMonth - 1)
        }
    }
    useEffect(()=>{
        async function reset(){
           const res = await updateDate()
            await setList(res)
        }
        reset()
    }, [month])
    return (
        <motion.div className="w-full mt-3">
            <motion.div className="flex w-[80%] m-auto mb-2">
               <Button onClick={decreaseMonth} text={<FiChevronLeft fontSize={25} />} className="mr-auto"/>
               <h4 className="text-xl font-medium">{fullDate.split(' ')[1]} {fullDate.split(' ')[3]}</h4>
               <Button onClick={increaseMonth} text={<FiChevronRight fontSize={25} />} className="ml-auto"/> 
            </motion.div>
            <div className="grid-cols-7 grid text-center text-lg font-medium">
                {daysOfWeek.map((day, i)=>{
                    return (
                        <div key={i}>
                            {day}
                        </div>
                    )
                })}
            </div>
            <motion.div className={`grid text-center grid-cols-7 m-auto`}>
                {dayList?.map((day, i)=> {
                    return (
                        <Day day={day} firstNo={firstNo} key={i}/>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}