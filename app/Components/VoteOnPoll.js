import React from 'react';
import PropTypes from 'prop-types';

export default function VoteOnPoll({ match }) {
	return (
		<div>{JSON.stringify(match.params)}</div>
	);
}
VoteOnPoll.propTypes = {
	match: PropTypes.object.isRequired,
};
