import React, { Component } from 'react';
import { Letter } from './Letter';
import { GameButton } from './GameButton';
var randomWord = require('random-word-by-length');

class Main extends Component {
    constructor(props) {
    	super(props);
    	this.state = { word: [], letters: [], game: false, correct: [], incorrect: [], totGuess: 0, incGuess: 0, status: null };
    	this.gameStatus.bind(this);
    	this.setAlphabet.bind(this);
    };

    setAlphabet() {
    	let alphabet = new Array( 26 ).fill( 1 ).map( ( _, i ) => String.fromCharCode( 65 + i ) );
    	return alphabet;
    }

    startGame(length) {
    	let word = randomWord(length);
    	let alphabet = this.setAlphabet();
    	word = word.split('');
    	this.setState({ game: true, word: word, totGuess: 0, incGuess: 0, correct: [], incorrect: [], letters: alphabet, status: null });
    }
    
    gameStatus(guesses) {
    	let statusMsg;
    	let filled = 0;
    	for (let i = 0; i < this.state.word.length; i++) {
    		if (this.state.correct.includes(this.state.word[i].toUpperCase())) {
    			filled += 1;
    		}
    	}
    	if (filled === this.state.word.length) {
    		statusMsg = 'won';
    	}
    	else if (guesses < 10) {
    		statusMsg = 'active';
    	}
    	else {
    		statusMsg = 'over';
    	}
		this.setState({ status: statusMsg})
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
    		let incGuess = this.state.incGuess + 1;
    		this.setState({ incorrect: currIncorrect, incGuess: incGuess });
    	}
    	let currRemaining = this.state.letters.filter(e => e !== letter);
    	let totGuess = this.state.totGuess + 1;
    	this.setState({ letters: currRemaining, totGuess: totGuess })
    	this.gameStatus(this.state.incGuess);
    }

    render() {

    	let gameBoard;
    	let letters = this.state.letters.map(( letter, i ) => <Letter onClick={this.checkGuess.bind(this)} letter={letter} key={i}/>);
    	let correct = this.state.correct.map(( letter, i) => <Letter letter={letter} key={i} />);
    	let incorrect = this.state.incorrect.map(( letter, i) => <Letter letter={letter} key={i} />);
    	let wordState = this.state.word.map(( letter, i ) => {
    		if (this.state.correct.includes(letter.toUpperCase())) {
    			return '  ' + letter + '  ';
    		}
    		else {
    			return '  __  ';
    		}
    	});

    	let status;
    	if (this.state.status === 'active') {
    		status = 'You have ' + (10 - this.state.incGuess) + ' guesses left!'
    	}
    	else if (this.state.status === 'won') {
    		status = 'You won in ' + this.state.totGuess + ' guesses!'
    	}
    	else if (this.state.status === 'over') {
    		status = 'Game over! You ran out of guesses!'
    	}

    	if (this.state.game && this.state.status === 'won') {
    		gameBoard = 
	        		<div className='row'>
	        			<div className='col-xs-3'>
        					{status}
        					<p>Play again: </p>
    						<GameButton onClick={this.startGame.bind(this)} />
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

    	else if (this.state.game && this.state.status === 'over') {
    		gameBoard = 
	        		<div className='row'>
	        			<div className='col-xs-3'>
        					{status}
        					<p>The word was: {this.state.word}</p>
        					<p>Play again: </p>
        					<GameButton onClick={this.startGame.bind(this)} />
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


    	else if (this.state.game) {
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
		        		<GameButton onClick={this.startGame.bind(this)} />
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