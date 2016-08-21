var actions = require('./actions');
var store = require('./store');

var reducer = function(state, action) {
	state = state || {};
	if (action.type === actions.NEW_SEARCH) {
		return Object.assign({}, {
			output: [],
			casino: {},
			tournaments: [],
			error: null
		});
	} else if (action.type === actions.ADD_INPUT) {
		return Object.assign({}, state, {
			output: action.tempLib
			});
	} else if (action.type === actions.FETCH_CASINO_DETAILS_SUCCESS) {
		console.log(action.casino[0])
		return Object.assign({}, state, {
			casino: action.casino[0]
		});
	} else if (action.type === actions.FETCH_CASINO_DETAILS_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else if (action.type === actions.FETCH_TOURNAMENT_INFO_SUCCESS) {
		return Object.assign({}, state, {
			tournaments: action.tournaments
		});
	} else if (action.type === actions.FETCH_CASINO_DETAILS_ERROR) {
		return Object.assign({}, state, {
			error: action.error
		});
	} else {
		return state;
	}
};

module.exports = reducer;
