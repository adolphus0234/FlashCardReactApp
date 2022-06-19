import React, {Component} from 'react';
import Text from './Text';
import Canvas from './Canvas';
import Button from '../Button';
import Backdrop from './Backdrop';
import './ViewCards.css';

class ViewCards extends Component {
	constructor({ flashCardCollection }) {
		super();

		this.flashCardCollection = flashCardCollection;
		this.selectedIndex = 0;

		this.prevButtonDisabled = true;
		this.nextButtonDisabled = false;

		this.backdrop = new Backdrop();

		this.btnNext = this.btnNext.bind(this);
		this.btnPrev = this.btnPrev.bind(this);
	}

	componentDidMount() {
		
	}

	btnNext() {
		// if (this.selectedIndex < this.flashCardCollection.length - 1) {
		// 	this.selectedIndex++;
		// 	this.prevButtonDisabled = false;
		// 	this.backdrop.reset();
		// }

		// if (this.selectedIndex === this.flashCardCollection.length - 1) {
		// 	this.nextButtonDisabled = true;
		// }
	}

	btnPrev() {
		// if (this.selectedIndex > 0) {
		// 	this.selectedIndex--;
		// 	this.nextButtonDisabled = false;
		// 	this.backdrop.reset();
		// }

		// if (this.electedIndex === 0) {
		// 	this.prevButtonDisabled = true;
		// }
	}

	btnHome() {

	}

	render() {

		if (this.flashCardCollection.length < 2) {
			this.nextButtonDisabled = true;
		} else {
			this.nextButtonDisabled = false;
		}
	
		return (
			<div>
				<Canvas id={'canvas'} width={600} height={500} 
					flashCardCollection={[]} backdrop={this.backdrop}/>
				<div id="btn-cont">
					<Button 
						id={'btn-prev'} 
						className={""} 
						innerText={'Prev'} 
						isDisabled={this.prevButtonDisabled} 
						onClick={this.btnPrev}/>
					<Button 
						id={'btn-next'} 
						className={""}
						innerText={'Next'} 
						isDisabled={this.nextButtonDisabled} 
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