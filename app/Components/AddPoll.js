import React from 'react';
import PropTypes from 'prop-types';

function AddPoll({ loading, error }) {
	if (loading) {
		return (<div>Loading</div>);
	}
	if (error) {
		return (<div>Something went wrong. Try again</div>);
	}
	return (<div>Done Loading</div>);
}
AddPoll.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
};

export default AddPoll;
