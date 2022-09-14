export default (state = {}, action) => {
  switch (action.type) {
    case 'AUTH':
      localStorage.setItem('profile', JSON.stringify(action.payload))
      return action.payload;
    default:
      return state
  }

}
