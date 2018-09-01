import React from 'react';
import PropTypes from 'prop-types';

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

	render() {
		const {
			question, a, b, c, d,
		} = this.state;
		const { loading, error, handleSubmit } = this.props;
		if (loading) {
			return (<div>Loading</div>);
		}
		if (error) {
			return (<div>Something went wrong. Try again</div>);
		}
		return (
			<div>
				<form className="add-form" onSubmit={e => handleSubmit(e, Object.assign({}, this.state))}>
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
	loading: PropTypes.bool.isRequired,
	error: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default AddPoll;
