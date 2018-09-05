import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePoll } from '../utils/api';
import { savePollThunk } from '../actions';

class AddPoll extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			question: '',
			a: '',
			b: '',
			c: '',
			d: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.isDisabled = this.isDisabled.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event, stateField) {
		const { value } = event.target;
		this.setState({
			[stateField]: value,
		});
	}

	isDisabled() {
		const {
			question, a, b, c, d,
		} = this.state;
		return question.length === 0 || a.length === 0 || b.length === 0
			|| c.length === 0 || d.length === 0;
	}

	handleSubmit(e) {
		e.preventDefault();
		const newPoll = Object.assign({}, this.state);
		const { history, dispatch } = this.props;
		history.push('/');
		dispatch(savePollThunk(newPoll, { savePoll }));
	}

	render() {
		const {
			question, a, b, c, d,
		} = this.state;
		const { error } = this.props;
		if (error) {
			return (<div>Something went wrong. Try again</div>);
		}
		return (
			<div>
				<form className="add-form" onSubmit={e => this.handleSubmit(e)}>
					<label htmlFor="question">
						<h3>What is your question?</h3>
						<input value={question} id="question" type="text" className="input" onChange={e => this.handleChange(e, 'question')} />
					</label>
					<h3>What are the options?</h3>
					<label htmlFor="a">
						A.
						<input value={a} id="a" type="text" className="input" onChange={e => this.handleChange(e, 'a')} />
					</label>
					<label htmlFor="b">
						B.
						<input value={b} id="b" type="text" className="input" onChange={e => this.handleChange(e, 'b')} />
					</label>
					<label htmlFor="c">
						C.
						<input value={c} id="c" type="text" className="input" onChange={e => this.handleChange(e, 'c')} />
					</label>
					<label htmlFor="d">
						D.
						<input value={d} id="d" type="text" className="input" onChange={e => this.handleChange(e, 'd')} />
					</label>
					<button disabled={this.isDisabled()} className="btn" type="submit">Submit</button>
				</form>
			</div>
		);
	}
}
AddPoll.propTypes = {
	error: PropTypes.bool.isRequired,
	history: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default AddPoll;

export const ConnectedAddPoll = connect(state => ({
	error: state.error,
}))(AddPoll);
