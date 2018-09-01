import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './Components/App';
import reducer from './reducers';
import './style.css';

const store = createStore(reducer);

ReactDOM.render(
	<Router>
		<App store={store} />
	</Router>,
	document.getElementById('app')
);
