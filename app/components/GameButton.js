import React, { Component } from 'react';

export class GameButton extends Component {
	constructor(props) {
		super(props);
		this.state = { length: 2 };
	}

	handleChange(evt) {
		this.setState({ length: parseInt(evt.target.value) });
	}

	handleSubmit(evt) {
		evt.preventDefault();
		this.props.onClick(this.state.length);
	}

	render() {
		return (
        		<div className='col-xs-12'>
        			<form onSubmit={this.handleSubmit.bind(this)}>
        				<div className='form-group'>
	        				<label>
	        				Maximum length:
			        			<select className='form-control' onChange={this.handleChange.bind(this)}>
			        				<option value='5'>5</option>
			        				<option value='8'>8</option>
			        				<option value='10'>10</option>
			        				<option value='12'>12</option>
			        				<option value='15'>15</option>
			        			</select>
	        				</label>
	        			</div>
	        			<input type='submit' value='Start Game'></input>
	        		</form>
        		</div>
			)
	}


}