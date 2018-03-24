import React, { Component } from 'react';
import { Letter } from './Letter';

class Main extends Component {
    constructor(props) {
    	super(props);
    	this.state = { word: ['b', 'i', 'r', 't', 'h', 'd', 'a', 'y'] };
    };

    




    render() {

    	let letters;
    	letters = <Letter letter='A'/>;

        
        return (
        	<div>
	        	<div className='row'>
	        		<div className='col-xs-12'>
	        			<h2>Welcome to the hangman game!</h2>
	        		</div>
	        	</div>
        		<div className='row'>
        			<div className='col-xs-12'>
        				<h3>Guess a letter</h3>
        				{letters}
        			</div>
        		</div>
			</div>
            )
    }
}


export default Main;