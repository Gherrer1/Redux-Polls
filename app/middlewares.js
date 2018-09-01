import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const logger = store => next => (action) => {
	console.group(`${action.type}`);
	console.log(`The action: ${JSON.stringify(action)}`);
	next(action);
	console.log(`The new state: ${JSON.stringify(store.getState())}`);
	console.groupEnd();
};

export default applyMiddleware(ReduxThunk, logger);
