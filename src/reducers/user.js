const defaultState = {
  username: 'xiehuiming'
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'example':
      return { ...state, ...action.payload };
      break;
    default:
      return state;
  }
}

export default reducer;
