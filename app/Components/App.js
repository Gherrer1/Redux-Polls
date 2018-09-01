import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './Home';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Nav from './Nav';
import { getInitialData } from '../utils/api';
import { receivedDataAction, receivedErrorAction } from '../Actions';

class App extends React.Component {
	componentDidMount() {
		const { store } = this.props;
		store.subscribe(() => this.forceUpdate());

		getInitialData()
			.then(data => console.log(data) || store.dispatch(receivedDataAction(data)))
			.catch(err => console.log(err) || store.dispatch(receivedErrorAction()));
	}

	render() {
		const { store } = this.props;
		const { loading, error } = store.getState();


		return (
			<div>
				<Nav />
				<Route
					exact
					path="/"
					render={
						() => (<Home loading={loading} error={error} />)
					}
				/>
				<Route path="/leaderboard" component={Leaderboard} />
				<Route path="/add-poll" component={AddPoll} />
			</div>
		);
	}
}
App.propTypes = {
	store: PropTypes.object.isRequired,
};

export default App;
