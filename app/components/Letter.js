import React, { Component } from 'react';

export class Letter extends Component {
	constructor(props) {
		super(props);
	}

	handleClick(evt) {
		let guess = this.refs['letterValue'].value;
		this.props.onClick(guess);
	}

	render() {
		return (
				<input type='button'
					   onClick={this.handleClick.bind(this)}
					   className='btn btn-default'
					   value={this.props.letter}
					   ref='letterValue'>
				</input>
			)
	}


}