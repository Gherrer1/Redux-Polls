import { combineReducers } from 'redux';
import { RECEIVED_DATA, RECEIVED_ERROR } from './actionTypes';

function loading(state = true, action) {
	switch (action.type) {
	case RECEIVED_DATA:
		return false;
	case RECEIVED_ERROR:
		return false;
	default:
		return state;
	}
}

function error(state = false, action) {
	switch (action.type) {
	case RECEIVED_ERROR:
		return true;
	case RECEIVED_DATA:
		return false;
	default:
		return state;
	}
}

function users(state = null, action) {
	switch (action.type) {
	case RECEIVED_DATA:
		return action.data.users;
	default:
		return state;
	}
}

function polls(state = null, action) {
	switch (action.type) {
	case RECEIVED_DATA:
		return action.data.polls;
	default:
		return state;
	}
}

export default combineReducers({
	loading,
	error,
	users,
	polls,
});
