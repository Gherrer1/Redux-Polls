import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import middlewares from './middlewares';
import { ConnectedApp } from './Components/App';
import './style.css';

const store = createStore(reducers, middlewares);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ConnectedApp />
		</Router>
	</Provider>,
	document.getElementById('app')
);
