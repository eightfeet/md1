const defaultState = {
	username: 'xiehuiming'
};
const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'example':
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default reducer;
