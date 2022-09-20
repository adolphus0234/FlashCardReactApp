import React, {Component} from 'react';
import Canvas from './Canvas';
import Button from '../Button';
import Backdrop from './Backdrop';
import FlashCardNumber from './FlashCardNumber';
import './ViewCards.css';

//** Setup Canvas and backdrop to display 'Loading...' if text lags **

class ViewCards extends Component {
	constructor({ flashCardCollection, onClickHome }) {
		super();

		this.state = {
			prevButtonDisabled: true,
			nextButtonDisabled: false,
			selectedIndex: 0
		}

		// passing props to component
		this.flashCardCollection = flashCardCollection;

		let that = this;

		this.btnHome = function() {
			onClickHome();
			window.removeEventListener('keydown', that.handleKeyDown, true);
		}

		// defining other component properties
		this.index = 0;

		this.backdrop = new Backdrop();

		// binding functions to access 'this'
		this.btnNext = this.btnNext.bind(this);
		this.btnPrev = this.btnPrev.bind(this);

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentDidMount() {
		if (this.flashCardCollection.length < 2) {
			this.setState({
				nextButtonDisabled: true
			});
		} else {
			this.setState({
				nextButtonDisabled: false
			});
		}

		window.addEventListener('keydown', this.handleKeyDown, true);
	}

	btnNext() {
		if (this.index < this.flashCardCollection.length - 1) {
			this.index++;
			this.setState({
				selectedIndex: this.index,
				prevButtonDisabled: false
			});
			this.backdrop.reset();
		}

		if (this.index === this.flashCardCollection.length - 1) {
			this.setState({
				nextButtonDisabled: true
			});
		}
	}

	btnPrev() {
		if (this.index > 0) {
			this.index--;
			this.setState({
				selectedIndex: this.index,
				nextButtonDisabled: false
			});
			this.backdrop.reset();
		}

		if (this.index === 0) {
			this.setState({
				prevButtonDisabled: true
			});
		}
	}

	btnHome() {
		// defined by prop in constructor
	}

	handleKeyDown(event) {
		event.preventDefault();

		if (event.code === "ArrowLeft") {
			if (!this.state.prevButtonDisabled) {
				this.btnPrev();
			}
		} else if (event.code === "ArrowRight") {
			if (!this.state.nextButtonDisabled) {
				this.btnNext();
			}	
		} 
	}

	render() {

		const { selectedIndex, prevButtonDisabled, nextButtonDisabled } = this.state;
	
		return (
			<div>			
				<Canvas 
					id={'canvas'} 
					width={600} 
					height={500} 
					flashCardCollection={this.flashCardCollection} 
					selectedIndex={selectedIndex} 
					backdrop={this.backdrop} 
					scrollFlashCard={this.scrollFlashCard}/>
				<FlashCardNumber 
					index={this.state.selectedIndex}
					count={this.flashCardCollection.length}/>		
				<div id="btn-cont">
					<Button 
						id={'btn-prev'} 
						className={""} 
						innerText={'Prev'} 
						isDisabled={prevButtonDisabled} 
						onClick={this.btnPrev}/>
					<Button 
						id={'btn-next'} 
						className={""}
						innerText={'Next'} 
						isDisabled={nextButtonDisabled} 
						onClick={this.btnNext} />
				</div>
				<div className="center">
					<Button 
						id={'btn-home'} 
						className={"nav-btn"} 
						innerText={'Home'} 
						isDisabled={false}
						onClick={this.btnHome} />
				</div>
			</div>
		);
	}
}

export default ViewCards;