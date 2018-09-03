import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function VoteOnPollPresentation({ poll }) {
	return (
		<div className="poll-container">
			<h1 className="question">{poll.question}</h1>
			<p className="poll-author">By {poll.author}</p>
			<ul>
				{['aText', 'bText', 'cText', 'dText'].map(key => (
					<li key={key} className="option">
						{poll[key]}
					</li>
				))}
			</ul>
		</div>
	);
}
VoteOnPollPresentation.propTypes = {
	poll: PropTypes.object.isRequired,
};

export default function VoteOnPoll({
	match, loading, error, poll,
}) {
	if (loading) {
		return (<p>Loading...</p>);
	}

	if (error) {
		return (<p>Something went wrong. Try again.</p>);
	}

	if (!poll) {
		return (<p>No such poll exists</p>);
	}

	return <VoteOnPollPresentation poll={poll} />;
}
VoteOnPoll.propTypes = {
	match: PropTypes.object.isRequired,
	poll: PropTypes.object,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
};
VoteOnPoll.defaultProps = {
	poll: null,
};

const mapStateToProps = (state, ownProps) => ({
	poll: state.polls.unanswered.find(
		p => p.id === ownProps.match.params.id
	)
	|| state.polls.answered.find(
		p => p.id === ownProps.match.params.id
	),
	loading: state.loading,
	error: state.error,
});

export const ConnectedVoteOnPoll = connect(mapStateToProps)(VoteOnPoll);
