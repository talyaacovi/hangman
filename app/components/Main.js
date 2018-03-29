import React, { Component } from 'react';
import { Letter } from './Letter';
import { GameButton } from './GameButton';

var randomWord = require('random-word-by-length');

let shapes = {
	'1': 'circle',
	'2': 'line',
	'3': 'diagonal',
	'4': 'diagonalTwo',
	'5': 'diagonalThree',
	'6': 'diagonalFour',
	'7': 'ellipse',
	'8': 'ellipseTwo',
	'9': 'ellipseThree',
	'10': 'ellipseFour'
}

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
    	resetHangman();
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
    	else if (guesses === 10) {
    		statusMsg = 'over';
    		drawShapes('dead');
    	}
		this.setState({ status: statusMsg})
    }

    checkGuess(letter) {
    	let currCorrect = this.state.correct;
    	let currIncorrect = this.state.incorrect;
    	let incGuess = this.state.incGuess;
    	let totGuess = this.state.totGuess;

    	if (this.state.word.includes(letter.toLowerCase())) {
    		currCorrect.push(letter);
    		this.setState({ correct: currCorrect});
    	}
    	else {
    		currIncorrect.push(letter);
    		incGuess += 1;
    		let shapeStr = incGuess.toString();
    		let draw = shapes[shapeStr];
    		drawShapes(draw);
    	}

    	let currRemaining = this.state.letters.filter(e => e !== letter);
    	totGuess += 1;
    	this.setState({ letters: currRemaining, totGuess: totGuess, incorrect: currIncorrect, incGuess: incGuess });
    	this.gameStatus(incGuess);
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
        					<p>{this.state.word}</p>
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
			        	<div className='col-xs-3' id='draw-shapes'>
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
			        	<div className='col-xs-3' id='draw-shapes'>
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
			        	<div className='col-xs-3' id='draw-shapes'>
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


let two;
let params;
let group;

function resetHangman() {
	console.log('resetting');
	if (typeof two !== 'undefined') {
		console.log('in if');
		$('#draw-shapes').empty();
	}
	params = { width: 500, height: 600 };
	two = new Two(params);
	group = two.makeGroup();
}
	
// var params = { width: 500, height: 600 };
// var two = new Two(params);
// var group = two.makeGroup();

function drawShapes(shape) {	
	var elem = document.getElementById('draw-shapes');
	if (shape === 'circle') {
		var circle = two.makeCircle(100, 100, 50);
		circle.fill = '#FF8000';
		circle.stroke = 'orangered';
		circle.linewidth = 5;
		group.add(circle);
	}
	else if (shape === 'line') {
		var line = two.makeLine(98, 150, 98, 300);
		line.fill = '#FF8000';
		line.stroke = 'orangered';
		line.linewidth = 4;
		group.add(line);
	}
	else if (shape === 'diagonal') {
		var diagonal = two.makeLine(98, 300, 68, 500);
		diagonal.fill = '#FF8000';
		diagonal.stroke = 'orangered';
		diagonal.linewidth = 4;
		group.add(diagonal);
	}
	else if (shape === 'diagonalTwo') {
		var diagonalTwo = two.makeLine(98, 300, 128, 500);
		diagonalTwo.fill = '#FF8000';
		diagonalTwo.stroke = 'orangered';
		diagonalTwo.linewidth = 4;
		group.add(diagonalTwo);
	}
	else if (shape === 'diagonalThree') {
		var diagonalThree = two.makeLine(38, 200, 98, 250);
		diagonalThree.fill = '#FF8000';
		diagonalThree.stroke = 'orangered';
		diagonalThree.linewidth = 4;
		group.add(diagonalThree);
	}
	else if (shape === 'diagonalFour') {
		var diagonalFour = two.makeLine(98, 250, 158, 200);
		diagonalFour.fill = '#FF8000';
		diagonalFour.stroke = 'orangered';
		diagonalFour.linewidth = 4;
		group.add(diagonalFour);
	}
	if (shape === 'ellipse') {
		var ellipse = two.makeEllipse(68, 500, 25, 15);
		ellipse.fill = '#FF8000';
		ellipse.stroke = 'orangered';
		ellipse.linewidth = 5;
		group.add(ellipse);
	}	
	if (shape === 'ellipseTwo') {
		var ellipseTwo = two.makeEllipse(128, 500, 25, 15);
		ellipseTwo.fill = '#FF8000';
		ellipseTwo.stroke = 'orangered';
		ellipseTwo.linewidth = 5;
		group.add(ellipseTwo);
	}
	if (shape === 'ellipseThree') {
		var ellipseThree = two.makeEllipse(38, 200, 20, 10);
		ellipseThree.fill = '#FF8000';
		ellipseThree.stroke = 'orangered';
		ellipseThree.linewidth = 5;
		group.add(ellipseThree);
	}
	if (shape === 'ellipseFour') {
		var ellipseFour = two.makeEllipse(158, 200, 20, 10);
		ellipseFour.fill = '#FF8000';
		ellipseFour.stroke = 'orangered';
		ellipseFour.linewidth = 5;
		group.add(ellipseFour);
	}
	if (shape === 'dead') {
		var line = two.makeLine(80, 100, 90, 110);
		line.fill = 'black';
		line.stroke = 'black';
		line.linewidth = 2;
		group.add(line);
		var line2 = two.makeLine(90, 100, 80, 110);
		line2.fill = 'black';
		line2.stroke = 'black';
		line2.linewidth = 2;
		group.add(line2);
		var line3 = two.makeLine(120, 100, 110, 110);
		line3.fill = 'black';
		line3.stroke = 'black';
		line3.linewidth = 2;
		group.add(line3);
		var line4 = two.makeLine(110, 100, 120, 110);
		line4.fill = 'black';
		line4.stroke = 'black';
		line4.linewidth = 2;
		group.add(line4);
	}

	two.appendTo(elem);
	two.update();
}

export default Main;