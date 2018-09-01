import {
	ANSWER_POLL,
	ADD_POLL,
} from './actions';

function answered(state = null, action) {
	switch (action.type) {
	case ANSWER_POLL:
		return state ? state.concat(action.poll) : [action.poll];
	default:
		return state;
	}
}

function unanswered(state = null, action) {
	switch (action.type) {
	case ADD_POLL:
		return state ? state.concat(action.poll) : [action.poll];
	case ANSWER_POLL:
		return state.filter(poll => poll.id !== action.poll.id);
	default:
		return state;
	}
}

function polls(state = null, action) {
	switch (action.type) {
	case ADD_POLL:
		return {
			...state,
			unanswered: unanswered((state && state.unanswered) || [], action),
		};
	case ANSWER_POLL:
		return {
			answered: answered(state.answered, action),
			unanswered: unanswered(state.unanswered, action),
		};
	default:
		return state;
	}
}

const initialAppState = {
	polls: null,
};

export default function appReducer(state = initialAppState, action) {
	return {
		polls: polls(state.polls, action),
	};
}
