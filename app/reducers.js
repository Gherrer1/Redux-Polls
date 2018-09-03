import {
	ANSWER_POLL,
	ADD_POLL,
	RECEIVED_DATA,
	RECEIVED_ERROR,
} from './actions';
import { iveAnswered, isMe, isNotMe } from './utils/helpers';

const initialPollsState = {
	unanswered: [],
	answered: [],
};

const initialAppState = {
	polls: initialPollsState,
	users: [],
	loading: true,
	error: false,
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
		return state.concat([action.poll]);
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

function users(state = [], action) {
	switch (action.type) {
	case RECEIVED_DATA:
		return Object.values(action.users);
	case ADD_POLL:
		return state.filter(isNotMe).concat({
			...state.find(isMe),
			polls: state.find(isMe).polls.concat(action.poll.id),
		});
	case ANSWER_POLL:
		return state.filter(isNotMe).concat({
			...state.find(isMe),
			answers: state.find(isMe).answers.concat(action.poll.id),
		});
	default:
		return state;
	}
}

function loading(state = true, action) {
	switch (action.type) {
	case RECEIVED_ERROR:
		return false;
	case RECEIVED_DATA:
		return false;
	default:
		return state;
	}
}

function error(state = false, action) {
	switch (action.type) {
	case RECEIVED_ERROR:
		return true;
	default:
		return state;
	}
}

export default function appReducer(state = initialAppState, action) {
	return {
		polls: polls(state.polls, action),
		users: users(state.users, action),
		loading: loading(state.loading, action),
		error: error(state.error, action),
	};
}
