import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Nav from './Nav';
import { initialDataThunk } from '../actions';
import { getInitialData } from '../utils/api';

class App extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(initialDataThunk({ getInitialData }));
	}

	render() {
		console.log('App rendering');
		const {
			loading, error, polls, users,
		} = this.props;
		// just to be explicit
		const props = {
			loading,
			error,
			polls,
			users,
		};
		return (
			<div>
				<Nav />
				<Route
					exact
					path="/"
					render={
						() => (<Home {...props} />)
					}
				/>
				<Route
					path="/leaderboard"
					render={
						() => (<Leaderboard {...props} />)
					}
				/>
				<Route
					path="/add-poll"
					render={
						() => (<AddPoll {...props} />)
					}
				/>
			</div>
		);
	}
}

export default App;

export const ConnectedApp = connect(state => ({
	loading: state.loading,
	error: state.error,
	polls: state.polls,
	users: state.users,
}))(App);
