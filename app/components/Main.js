import React, { Component } from 'react';
import { Letter } from './Letter';

class Main extends Component {
    constructor(props) {
    	super(props);
    	this.state = { word: [], letters: [], game: false, correct: [], incorrect: [], guesses: 0, status: null };
    	this.gameStatus.bind(this);
    };

    componentWillMount() {
    	let alphabet = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );
    	this.setState({ letters: alphabet });
    }

    startGame() {
    	let word = 'birthday';
    	word = word.split('');
    	this.setState({ game: true, word: word });
    }
    
    gameStatus(guesses) {
    	let statusMsg;
    	if (this.state.correct.length === this.state.word.length) {
    		statusMsg = 'You won in ' + guesses + ' guesses!';
    		this.setState({ status: 'You won!' });
    	}
    	else {
    		statusMsg = 'You have ' + (10 - guesses) + ' guesses left!';
    		this.setState({ status: statusMsg});
    	}
    }

    checkGuess(letter) {
    	if (this.state.word.includes(letter.toLowerCase())) {
    		let currCorrect = this.state.correct;
    		currCorrect.push(letter);
    		this.setState({ correct: currCorrect});
    	}
    	else {
    		let currIncorrect = this.state.incorrect;
    		currIncorrect.push(letter);
    		this.setState({ incorrect: currIncorrect});
    	}
    	let guesses = this.state.guesses + 1;
    	this.setState({ guesses: guesses })
    	this.gameStatus(guesses);
    }





    render() {

    	
    	let letters = this.state.letters.map(( letter, i ) => <Letter onClick={this.checkGuess.bind(this)} letter={letter} key={i}/>);
    	let gameBoard;
    	let correct = this.state.correct.map(( letter, i) => <Letter letter={letter} key={i} />);
    	let incorrect = this.state.incorrect.map(( letter, i) => <Letter letter={letter} key={i} />);
    	let wordState = this.state.word.map(( letter, i ) => {
    		if (this.state.correct.includes(letter.toUpperCase())) {
    			return '  ' + letter + '  ';
    		}
    		else {
    			return '   __  ';
    		}
    	});
    	let status = this.state.status;

    	if (this.state.game) {
    		gameBoard = 
	        		<div className='row'>
	        			<div className='col-xs-3'>
	        				{wordState}
	        				<div>
	        					{status}
	        				</div>
	        				<h3>Guess a letter</h3>
	        				<p>Number of guesses: {this.state.guesses}</p>
	        				{letters}
	        			</div>
	        			<div className='col-xs-3'>
	        				<h3>Correct</h3>
	        				{correct}
	        			</div>
	        			<div className='col-xs-3'>
	        				<h3>Incorrect</h3>
	        				{incorrect}
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