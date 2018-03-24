import React, { Component } from 'react';

export class Letter extends Component {
	constructor(props) {
		super(props);
	}

	handleClick(evt) {
		console.log(this.refs['letterValue'].value);
	}

	render() {
		return (
				<div>
					<input type='button'
						   onClick={this.handleClick.bind(this)}
						   className='btn btn-default'
						   value={this.props.letter}
						   ref='letterValue'>
					</input>
				</div>
			)
	}


}