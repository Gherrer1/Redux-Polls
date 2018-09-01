import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Leaderboard from './Leaderboard';
import AddPoll from './AddPoll';
import Nav from './Nav';

class App extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<Route exact path="/" component={Home} />
				<Route path="/leaderboard" component={Leaderboard} />
				<Route path="/add-poll" component={AddPoll} />
			</div>
		);
	}
}

export default App;