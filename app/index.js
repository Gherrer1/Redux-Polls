import { createStore } from 'redux';
import reducers from './reducers';
import middlewares from './middlewares';
import {
	addPollAction, answerPollAction, receivedDataAction, receivedError, savePollThunk,
} from './actions';
import { getInitialData, savePoll } from './utils/api';

const store = createStore(reducers, middlewares);
getInitialData()
	.then((data) => {
		store.dispatch(receivedDataAction(data.users, data.polls));
		store.dispatch(addPollAction({
			...data.polls.vthrdm985a262al8qx3do,
			id: '45',
		}));
		store.dispatch(answerPollAction(store.getState().polls.unanswered.find(poll => poll.id === '45')));
		store.dispatch(receivedError());
		store.dispatch(savePollThunk({
			question: 'how long?',
			a: '6',
			b: '7',
			c: '8',
			d: '9',
		}, { savePoll }));
	});
