import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Leaderboard from './Leaderboard';
import { ConnectedAddPoll } from './AddPoll';
import VoteOnPoll from './VoteOnPoll';
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
						routerProps => (<Home {...props} {...routerProps} />)
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
						routerProps => (<ConnectedAddPoll {...props} {...routerProps} />)
					}
				/>
				<Route
					path="/polls/:id"
					render={
						routerProps => <VoteOnPoll {...routerProps} />
					}
				/>
			</div>
		);
	}
}

export default App;
// withRouter is what makes switching between Routes. I wonder why. Read.
export const ConnectedApp = withRouter(connect(state => ({
	loading: state.loading,
	error: state.error,
	polls: state.polls,
	users: state.users,
}))(App));
