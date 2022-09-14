//@ts-nocheck
import {useState} from 'react'
import Days from './Days'
import Schedule from './Schedule'
import AddEvent from './AddEvent'

const Events = () => {
	const [chosenDay, setDay] = useState(new Date().toDateString())

	return (
		<div className="dark:text-slate-200">
			<div className="px-5 text-2xl dark:text-slate-200 text-slate-600">
				<h4>Schedule</h4>
			</div>
			<Days chosenDay={chosenDay} setDay={setDay}/>
			<Schedule chosenDay={chosenDay} />
		</div>
	)
}

export default Events