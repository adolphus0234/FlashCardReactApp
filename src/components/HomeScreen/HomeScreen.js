import React, { Component } from 'react';
import FlashCardCount from './FlashCardCount';
import Button from '../Button';
import './HomeScreen.css';

class HomeScreen extends Component {
	constructor({ flashCardCollection, onClickStart, onClickSetup }) {
		super();

		this.state = {
			startButtonDisabled: true,
			flashCardCount: 0
		}

		//passing props to component

		this.flashCardCollection = flashCardCollection;

		let that = this;

		this.btnStart = function() {
			onClickStart();
			window.removeEventListener('keypress', that.handleKeyPress, true);
		}

		this.btnSetup = function() {
			onClickSetup();
			window.removeEventListener('keypress', that.handleKeyPress, true);
		}

		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {

		if (this.flashCardCollection.length > 0) {
			this.setState({
				startButtonDisabled: false,
				flashCardCount: this.flashCardCollection.length
			});
		}

		window.addEventListener('keypress', this.handleKeyPress, true);
	}

	btnStart() {
		// defined by prop in constructor
	}

	btnSetup() {
		// defined by prop in constructor
	}

	handleKeyPress(event) {
		if (event.code === 'Enter') {
			
			event.preventDefault();
			this.btnStart();
		}
	}

	render() {

		return (
			<div>
				<div className="center">
					<h1 className="heading">Flash Card App</h1>
				</div>
				<div className="center">
					<Button 
						id={'btn-start'} 
						className={"nav-btn"} 
						innerText={'Start'} 
						isDisabled={this.state.startButtonDisabled} 
						onClick={this.btnStart} />
					</div>
				<div className="center">
					<Button 
						id={'btn-add'} 
						className={"nav-btn"} 
						innerText={'Setup Cards'} 
						isDisabled={false} 
						onClick={this.btnSetup} />
				</div>
				<div className="center">
					<FlashCardCount count={this.state.flashCardCount} />
				</div>
			</div>
		);
	}
}

export default HomeScreen;