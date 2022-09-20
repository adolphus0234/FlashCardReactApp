import React, { Component } from 'react';
import DisplayComponent from './DisplayComponent';
import Button from '../Button';

class CardDisplay extends Component {
	constructor({ flashCardCollection, deleteCardsButtonDisabled, onClickEdit, 
		onClickDelete, onClickDeleteAll, onClickArrowUp, onClickArrowDown }) {
		super();

		// setting state with props

		this.state = {
			deleteCardsButtonDisabled: deleteCardsButtonDisabled,
			flashCardCollection: flashCardCollection
		}

		// passing remaining props to component

		this.editCardEntry = onClickEdit;
		this.deleteCardEntry = onClickDelete;
		this.deleteAllCards = onClickDeleteAll;
		this.shiftCardBack = onClickArrowUp;
		this.shiftCardForward = onClickArrowDown;
	}

	static getDerivedStateFromProps(props, state) {
		return {
			deleteCardsButtonDisabled: props.deleteCardsButtonDisabled,
			flashCardCollection: props.flashCardCollection
		}
	}

	editCardEntry() {
		// defined by prop in constructor
	}

	deleteCardEntry() {
		// defined by prop in constructor
	}

	deleteAllCards() {
		// defined by prop in constructor
	}

	shiftCardBack() {
		// defined by prop in constructor
	}

	shiftCardForward() {
		// defined by prop in constructor
	}

	render() {

		let displayComponents = this.state.flashCardCollection.map((flashCard, i) => {

			let isFirstCard = false;
			let isLastCard = false;

		 	if (i === 0) {
		 		isFirstCard = true;
		 	}

		 	if (i === this.state.flashCardCollection.length - 1) {
		 		isLastCard = true;
		 	}

		 	return <DisplayComponent 
 						key={i}
 						index={i}
 						questionText={flashCard.faces[0].text}
 						answerText={flashCard.faces[1].text}
 						onClickEdit={this.editCardEntry}
 						onClickDelete={this.deleteCardEntry}
 						isFirstCard={isFirstCard}
 						isLastCard={isLastCard}
 						onClickArrowUp={this.shiftCardBack}
 						onClickArrowDown={this.shiftCardForward}
 					/>
		});

		return (
			<div>
				<div id="card-display">
					<h2 style={{textAlign: 'center', fontSize: '2em'}}>Your Flash Cards:</h2>

					<div id="display-container">					
					 		<div>
					 			{displayComponents}
					 		</div>
					</div>
				</div>

				<div className="form-group center">
					<Button 
						id={'btn-delete-cards'} 
						className={""} 
						innerText={'Delete Flash Cards'} 
						isDisabled={this.state.deleteCardsButtonDisabled} 
						onClick={this.deleteAllCards}/>
				</div>
			</div>
		);
	}
}

export default CardDisplay;