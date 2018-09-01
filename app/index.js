import { createStore } from 'redux';
import reducers from './reducers';
import middlewares from './middlewares';
import { addPollAction, answerPollAction } from './actions';
import { getInitialData } from './utils/api';

const store = createStore(reducers, middlewares);
getInitialData()
	.then((data) => {
		Object.values(data.polls).forEach(poll => store.dispatch(addPollAction(poll)));
		store.dispatch(answerPollAction(data.polls.xj352vofupe1dqz9emx13r));
		store.dispatch(answerPollAction(data.polls['6ni6ok3ym7mf1p33lnez']));
		const { polls } = store.getState();
		console.log(polls.answered);
		console.log(polls.unanswered);
	});
