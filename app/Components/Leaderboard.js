import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
	return (
		<div className="poll-author">
			<img src={user.avatarURL} alt={`for ${user.id}`} />
			<h1>{user.name}</h1>
			<ul>
				<li>{user.polls.length} Polls</li>
				<li>{user.answers.length} Answers</li>
			</ul>
		</div>
	);
}
User.propTypes = {
	user: PropTypes.object.isRequired,
};

function Leaderboard({ loading, error, users }) {
	if (loading) {
		return (<div>Loading</div>);
	}
	if (error) {
		return (<div>Something went wrong. Try again</div>);
	}
	const sortedUsers = [...users].sort(
		(u1, u2) => (u1.answers.length + u1.polls.length) < (u2.answers.length + u2.polls.length)
	);
	return (
		<div>
			{console.log(users) || sortedUsers.map(user => <User user={user} key={user.id} />)}
		</div>
	);
}
Leaderboard.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	users: PropTypes.array.isRequired,
};

export default Leaderboard;
