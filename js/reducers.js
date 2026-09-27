var actions = require('./actions');

var initialState = {
	output: [],
	casino: {},
	tournaments: [],
	error: null
};

var reducer = function(state, action) {
	state = state || initialState;
	if (action.type === actions.NEW_SEARCH) {
		return Object.assign({}, initialState);
	} else if (action.type === actions.ADD_INPUT) {
		return Object.assign({}, state, {
			output: action.tempLib || []
			});
	} else if (action.type === actions.FETCH_CASINO_DETAILS_SUCCESS) {
		return Object.assign({}, state, {
			casino: (action.casino && action.casino[0]) ? action.casino[0] : {}
		});
	} else if (action.type === actions.FETCH_CASINO_DETAILS_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else if (action.type === actions.FETCH_TOURNAMENT_INFO_SUCCESS) {
		return Object.assign({}, state, {
			tournaments: action.tournaments
		});
	} else if (action.type === actions.FETCH_TOURNAMENT_INFO_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else {
		return state;
	}
};

module.exports = reducer;
