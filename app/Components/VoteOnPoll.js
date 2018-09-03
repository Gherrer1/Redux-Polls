import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { answerPollThunk } from '../actions';
import { savePollAnswer } from '../utils/api';

function VoteOnPollPresentation({ poll, handleVote }) {
	return (
		<div className="poll-container">
			<h1 className="question">{poll.question}</h1>
			<p className="poll-author">By {poll.author}</p>
			<ul>
				{['aText', 'bText', 'cText', 'dText'].map(key => (
					<li
						key={key}
						className="option"
						onClick={() => handleVote(key, poll.id)}
						onKeyUp={() => handleVote(key, poll.id)}
						role="button"
					>
						{poll[key]}
					</li>
				))}
			</ul>
		</div>
	);
}
VoteOnPollPresentation.propTypes = {
	poll: PropTypes.object.isRequired,
	handleVote: PropTypes.func.isRequired,
};

export default function VoteOnPoll({
	history, loading, error, poll, dispatch,
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

	function handleVote(key, id) {
		dispatch(answerPollThunk({
			authedUser: 'tylermcginnis',
			id,
			answer: key.substring(0, 1),
		}, { savePollAnswer }, { ...poll }));
		history.push('/');
	}

	return <VoteOnPollPresentation poll={poll} handleVote={handleVote} />;
}
VoteOnPoll.propTypes = {
	history: PropTypes.object.isRequired,
	poll: PropTypes.object,
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
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
