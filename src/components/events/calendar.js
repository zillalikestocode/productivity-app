const now = new Date()

const date = new Date(now.getFullYear(), now.getMonth(), 1)
const days = []

while (date.getMonth() === now.getMonth()){
	days.push(new Date(date).toDateString())
	date.setDate(date.getDate() + 1)
}

export default days
