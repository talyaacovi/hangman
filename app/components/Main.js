import React, { Component } from 'react';
import { Letter } from './Letter';

class Main extends Component {
    constructor(props) {
    	super(props);
    	this.state = { word: [], letters: [], game: false, correct: [], incorrect: [] };
    };

    componentWillMount() {
    	let alphabet = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );
    	this.setState({ letters: alphabet });
    }

    startGame() {
    	let word = 'birthday';
    	word = word.split('');
    	this.setState({ game: true, word: word });
    	let correct = <div></div>
    	let incorrect = <div></div>
    }
    
    checkGuess(letter) {
    	let correct = this.state.correct;
    	let incorrect = this.state.incorrect;

    	if (this.state.word.includes(letter.toLowerCase())) {
    		
    		correct.push(letter);
    		this.setState({ correct: correct });
    		correct = this.state.correct.map(( letter, i) => <Letter letter={letter} key={i} />);
    		console.log(correct);
    	}
    	else {
    		console.log('incorrect!');
    		correct = this.state.correct.map(( letter, i) => <Letter letter={letter} key={i} />);
    	}
    }



    render() {

    	
    	let letters = this.state.letters.map(( letter, i ) => <Letter onClick={this.checkGuess.bind(this)} letter={letter} key={i}/>);
    	let gameBoard;
    	let correct = this.state.correct;

    	if (this.state.game) {
    		gameBoard = 
	        		<div className='row'>
	        			<div className='col-xs-3'>
	        				<h3>Guess a letter</h3>
	        				{letters}
	        			</div>
	        			<div className='col-xs-3'>
	        				<h3>Correct</h3>
	        				{correct}
	        			</div>
	        		</div>
    	}

    	else {
    		gameBoard = 
		        	<div className='row'>
		        		<div className='col-xs-12'>
		        			<input type='button' onClick={this.startGame.bind(this)} value='Start Game'></input>
		        		</div>
		        	</div>
    	}



        
        return (
        	<div>
	        	<div className='row'>
	        		<div className='col-xs-12'>
	        			<h2>Welcome to the hangman game!</h2>
	        		</div>
	        	</div>
	        	{gameBoard}
			</div>
            )
    }
}


export default Main;