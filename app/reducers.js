import {
	ANSWER_POLL,
	ADD_POLL,
	RECEIVED_DATA,
} from './actions';
import { iveAnswered } from './utils/helpers';

const initialPollsState = {
	unanswered: [],
	answered: [],
};

const initialAppState = {
	polls: initialPollsState,
	users: [],
};

function answered(state = [], action) {
	switch (action.type) {
	case ANSWER_POLL:
		return state.concat(action.poll);
	case RECEIVED_DATA:
		return Object.values(action.polls).filter(poll => iveAnswered(poll));
	default:
		return state;
	}
}

function unanswered(state = [], action) {
	switch (action.type) {
	case ADD_POLL:
		return state ? state.concat([action.poll]) : [action.poll];
	case ANSWER_POLL:
		return state.filter(poll => poll.id !== action.poll.id);
	case RECEIVED_DATA:
		return Object.values(action.polls).filter(poll => !iveAnswered(poll));
	default:
		return state;
	}
}

function polls(state = initialPollsState, action) {
	switch (action.type) {
	case ADD_POLL:
		return {
			answered: state.answered,
			unanswered: unanswered(state.unanswered, action),
		};
	case ANSWER_POLL:
		return {
			answered: answered(state.answered, action),
			unanswered: unanswered(state.unanswered, action),
		};
	case RECEIVED_DATA:
		return {
			answered: answered(state.answered, action),
			unanswered: unanswered(state.unanswered, action),
		};
	default:
		return state;
	}
}

function users(state, action) {
	switch (action.type) {
	case RECEIVED_DATA:
		return Object.values(action.users);
	default:
		return state;
	}
}

export default function appReducer(state = initialAppState, action) {
	return {
		polls: polls(state.polls, action),
		users: users(state.users, action),
	};
}
