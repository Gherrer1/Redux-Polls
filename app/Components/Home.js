import React from 'react';
import PropTypes from 'prop-types';

function Home({ loading, error, polls }) {
	if (loading) {
		return (<div>Loading</div>);
	}
	if (error) {
		return (<div>Something went wrong. Try again</div>);
	}

	const pollToLi = poll => <li key={poll.id}>{poll.question}</li>;
	const { unanswered, answered } = polls;
	const unansweredListItems = unanswered.map(pollToLi);
	const answeredListItems = answered.map(pollToLi);

	return (
		<div>
			<h1>Unanswered</h1>
			<ul>
				{unansweredListItems}
			</ul>
			<h1>Answered</h1>
			<ul>
				{answeredListItems}
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
