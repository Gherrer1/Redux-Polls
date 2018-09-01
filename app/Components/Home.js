import React from 'react';
import PropTypes from 'prop-types';

function iveVotedOn(poll) {
	const name = 'tylermcginnis';
	const {
		aVotes,
		bVotes,
		cVotes,
		dVotes,
	} = poll;
	return aVotes.includes(name)
		|| bVotes.includes(name) || cVotes.includes(name)
		|| dVotes.includes(name);
}

function Home({ loading, error, polls }) {
	if (loading) {
		return (<div>Loading</div>);
	}
	if (error) {
		return (<div>Something went wrong. Try again</div>);
	}

	const unanswered = Object.values(polls)
		.filter(poll => !iveVotedOn(poll))
		.map(poll => (
			<li key={poll.id}>{poll.question}</li>
		));
	const answered = Object.values(polls)
		.filter(poll => iveVotedOn(poll))
		.map(poll => (
			<li key={poll.id}>{poll.question}</li>
		));

	return (
		<div>
			<h1>Unanswered</h1>
			<ul>
				{unanswered}
			</ul>
			<h1>Answered</h1>
			<ul>
				{answered}
			</ul>
		</div>
	);
}
Home.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	polls: PropTypes.object,
};
Home.defaultProps = {
	polls: null,
};

export default Home;
