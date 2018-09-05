import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { answerPollThunk } from '../actions';
import { savePollAnswer } from '../utils/api';
import { iveAnswered, getTotalVotes, getPercentage } from '../utils/helpers';

function VoteOnPollPresentation({ poll, handleVote }) {
	const answered = iveAnswered(poll);
	const totalVotes = getTotalVotes(poll);
	return (
		<div className="poll-container">
			{/* <p>{JSON.stringify(poll)} {totalVotes}</p> */}
			<h1 className="question">{poll.question}</h1>
			<p className="poll-author">By {poll.author}</p>
			<ul>
				{['a', 'b', 'c', 'd'].map(key => (
					<li
						key={key}
						className="option"
						onClick={() => handleVote(key, poll.id)}
						onKeyUp={() => handleVote(key, poll.id)}
						role="button"
					>
						{poll[`${key}Text`]} {answered && `${getPercentage(poll[`${key}Votes`].length, totalVotes)}%`}
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
	loading, error, poll, dispatch,
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

	function _handleVote(key, id) {
		dispatch(answerPollThunk({
			authedUser: 'tylermcginnis',
			id,
			answer: key,
		}, { savePollAnswer }, { ...poll }));
	}

	const handleVote = iveAnswered(poll) ? () => {} : _handleVote;

	return <VoteOnPollPresentation poll={poll} handleVote={handleVote} />;
}
VoteOnPoll.propTypes = {
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
