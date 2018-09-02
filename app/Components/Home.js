import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Home({
	loading, error, polls, match,
}) {
	if (loading) {
		return (<div>Loading</div>);
	}
	if (error) {
		return (<div>Something went wrong. Try again</div>);
	}

	const pollToLi = poll => (
		<li key={poll.id}>
			<Link to={`${match.url}polls/${poll.id}`}> {poll.question} </Link>
		</li>
	);
	const { unanswered, answered } = polls;
	const unansweredListItems = unanswered.map(pollToLi);
	const answeredListItems = answered.map(pollToLi);

	return (
		<div>
			<h1>Unanswered</h1>
			<ul className="dashboard-list">
				{unansweredListItems}
			</ul>
			<h1>Answered</h1>
			<ul className="dashboard-list">
				{answeredListItems}
			</ul>
		</div>
	);
}
Home.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	polls: PropTypes.object,
	match: PropTypes.object.isRequired,
};
Home.defaultProps = {
	polls: null,
};

export default Home;
