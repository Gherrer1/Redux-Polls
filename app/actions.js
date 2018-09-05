import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVED_DATA = 'RECEIVED_DATA';
export const RECEIVED_ERROR = 'RECEIVED_ERROR';
export const ADD_POLL = 'ADD_POLL';
export const ANSWER_POLL = 'ANSWER_POLL';

export function addPollAction(poll) {
	return {
		type: ADD_POLL,
		poll,
	};
}

export function savePollThunk(poll, api) {
	return function spThunk(dispatch) {
		dispatch(showLoading());
		api.savePoll(poll)
			.then(data => dispatch(addPollAction(data)))
			.catch(() => alert('Something went wrong'))
			.finally(() => dispatch(hideLoading()));
	};
}

export function answerPollAction(poll, answer) {
	return {
		type: ANSWER_POLL,
		poll,
		answer,
	};
}

export function answerPollThunk(payload, api, poll) {
	return function apThunk(dispatch) {
		dispatch(showLoading());
		api.savePollAnswer(payload)
			.then(() => dispatch(answerPollAction(poll, payload.answer)))
			.finally(() => dispatch(hideLoading()));
	};
}

export function receivedDataAction(users, polls) {
	return {
		type: RECEIVED_DATA,
		users,
		polls,
	};
}

export function receivedError() {
	return {
		type: RECEIVED_ERROR,
	};
}

export function initialDataThunk(api) {
	return function idThunk(dispatch) {
		dispatch(showLoading());
		api.getInitialData()
			.then(data => dispatch(receivedDataAction(data.users, data.polls)))
			.catch(() => dispatch(receivedError()))
			.finally(() => dispatch(hideLoading()));
	};
}
