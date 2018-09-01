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
		api.savePoll(poll)
			.then(data => dispatch(addPollAction(data)))
			.catch(() => alert('Something went wrong'));
	};
}

export function answerPollAction(poll) {
	return {
		type: ANSWER_POLL,
		poll,
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
