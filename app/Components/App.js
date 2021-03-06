import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import Home from './Home';
import Leaderboard from './Leaderboard';
import { ConnectedAddPoll } from './AddPoll';
import { ConnectedVoteOnPoll } from './VoteOnPoll';
import Nav from './Nav';
import { initialDataThunk } from '../actions';
import { getInitialData } from '../utils/api';

class App extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(initialDataThunk({ getInitialData }));
	}

	render() {
		const {
			loading, error, polls, users,
		} = this.props;
		// just to be explicit
		const props = {
			error,
			polls,
			users,
		};
		return (
			<Fragment>
				<LoadingBar />
				<div className="container">
					<Nav />
					{
						loading
							? null
							: (
								<div>
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
											routerProps => <ConnectedVoteOnPoll {...routerProps} />
										}
									/>
								</div>
							)
					}
				</div>
			</Fragment>
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
