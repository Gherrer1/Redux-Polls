import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showingUnanswered: true,
		};

		this.showUnanswered = this.showUnanswered.bind(this);
		this.showAnswered = this.showAnswered.bind(this);
	}

	showUnanswered() {
		this.setState({
			showingUnanswered: true,
		});
	}

	showAnswered() {
		this.setState({
			showingUnanswered: false,
		});
	}

	render() {
		const { error, polls, match } = this.props;
		if (error) {
			return (<div>Something went wrong. Try again</div>);
		}

		const pollToLi = poll => (
			<li key={poll.id}>
				<Link to={`${match.url}polls/${poll.id}`}> {poll.question} </Link>
			</li>
		);
		const { unanswered, answered } = polls;

		const { showingUnanswered: showingUnA } = this.state;
		const list = showingUnA ? unanswered.map(pollToLi) : answered.map(pollToLi);

		return (
			<div>
				<div className="dashboard-toggle">
					<button type="button" style={{ textDecoration: showingUnA ? 'underline' : 'none' }} onClick={this.showUnanswered}>Unanswered</button>
					<span> | </span>
					<button type="button" style={{ textDecoration: showingUnA ? 'none' : 'underline' }} onClick={this.showAnswered}>Answered</button>
				</div>
				<ul>
					{list}
				</ul>
			</div>
		);
	}
}
Home.propTypes = {
	error: PropTypes.bool.isRequired,
	polls: PropTypes.object,
	match: PropTypes.object.isRequired,
};
Home.defaultProps = {
	polls: null,
};

export default Home;
