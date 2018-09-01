import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Nav from './Nav';
import { initialDataThunk, savePollThunk } from '../actions';
import { getInitialData, savePoll } from '../utils/api';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.addPoll = this.addPoll.bind(this);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(initialDataThunk({ getInitialData }));
	}

	addPoll(e, poll) {
		e.preventDefault();
		const { history, dispatch } = this.props;
		history.push('/');
		dispatch(savePollThunk(poll, { savePoll }));
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
						() => (<AddPoll {...props} handleSubmit={this.addPoll} />)
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
