import React, { Component } from 'react';
import CardDisplay from './CardDisplay';
import CardForm from './CardForm';
import FlashCard from './FlashCard';
import Button from '../Button';
import './SetupScreen.css';

// add button to create demo cards if there are no cards in memory

class SetupScreen extends Component {
	constructor({ flashCardCollection, onClickHome, onClickDeleteAllCards }) {
		super();

		this.state = {
			deleteCardsButtonDisabled: true,
			flashCardFormHidden: true,
			demoCardButtonHidden: false,
			formType: 'add',
			currentIndex: 0,
			formQuestionText: "",
			formAnswerText: "",
			formImageUrlText: undefined,
			formImageUrlInputDisabled: true,
			formCheckboxIsChecked: false,
			flashCardCollection: flashCardCollection
		}

		// passing props to component

		this.btnHome = function() {
			onClickHome();
		}

		let that = this;

		this.deleteAllCards = function() {
			onClickDeleteAllCards();		
		}

		// binding functions to access 'this'

		this.btnCreate = this.btnCreate.bind(this);
		this.editCardEntry = this.editCardEntry.bind(this);
		this.deleteCardEntry = this.deleteCardEntry.bind(this);
		this.shiftCardBack = this.shiftCardBack.bind(this);
		this.shiftCardForward = this.shiftCardForward.bind(this);

		this.btnCancelForm = this.btnCancelForm.bind(this);
		this.generateFlashCard = this.generateFlashCard.bind(this);
		this.generateDemoCards = this.generateDemoCards.bind(this);
		this.updateFlashCard = this.updateFlashCard.bind(this);
		this.saveFlashCardCollection = this.saveFlashCardCollection.bind(this);
		this.enableDeleteCardsButton = this.enableDeleteCardsButton.bind(this);
		this.disableDeleteCardsButton = this.disableDeleteCardsButton.bind(this);
		
	}

	componentDidMount() {
		if (this.state.flashCardCollection.length > 0) {
			this.setState({
				deleteCardsButtonDisabled: false,
				demoCardButtonHidden: true
			});	
		}
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevProps.flashCardCollection.length > 0) {
			return prevProps.flashCardCollection.length
		}
		return null; 
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot !== null) {
			
			if (this.state.flashCardCollection.length === 0) {
				this.disableDeleteCardsButton();
			}
 		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			flashCardCollection: props.flashCardCollection
		}
	}

	btnCreate() {
		this.setState({
			flashCardFormHidden: false,
			formType: 'add'
		});
	}

	btnCancelForm() {
		this.setState({
			flashCardFormHidden: true
		});
	}

	btnHome() {
		// defined by prop in constructor
	}

	editCardEntry(index) {
		this.setState({
			flashCardFormHidden: false,
			formType: 'edit',
			formQuestionText: this.state.flashCardCollection[index].faces[0].text.join("").trim(),
			formAnswerText: this.state.flashCardCollection[index].faces[1].text.join("").trim()
		});

		if (this.state.flashCardCollection[index].imageUrl !== "") {
			this.setState({
				formImageUrlText: this.state.flashCardCollection[index].imageUrl,
				formCheckboxIsChecked: true,
				formImageUrlInputDisabled: false
			});
		}
	}

	deleteCardEntry(index) {
		let result = window.confirm("Are you sure?");

		let collectionCopy = this.state.flashCardCollection;

		if (result) {
			collectionCopy.splice(index, 1);

			if (collectionCopy.length === 0) {
				this.disableDeleteCardsButton();
			}

			this.setState({
				flashCardCollection: collectionCopy
			});

			this.saveFlashCardCollection();
		}
	}

	deleteAllCards() {
		// defined by prop in constructor
	}	

	enableDeleteCardsButton() {
		this.setState({
			deleteCardsButtonDisabled: false,
			demoCardButtonHidden: true
		});
	}

	disableDeleteCardsButton() {
		this.setState({
			deleteCardsButtonDisabled: true,
			demoCardButtonHidden: false
		});
	}

	generateFlashCard(question, answer, imageUrl = null) {
		const flashCard = new FlashCard();
		flashCard.setQuestion(question);
		flashCard.setAnswer(answer);

		if (flashCard.includeImage) {
			flashCard.setImage(imageUrl);
		}

		this.state.flashCardCollection.push(flashCard);

		this.enableDeleteCardsButton();		
	}

	generateDemoCards() {
		const demoCardText = [
			{
				question: "What is asynchronous programming?",
				answer: "Asynchronous programming is a form of parallel programming that allows a unit of work to run separately from the primary application thread. When the work is complete, it notifies the main thread (as well as whether the work was completed or failed)."
			},
			{
				question: "What is the difference between 'pass by value' and 'pass by reference'?",
				answer: "Pass by value refers to a mechanism of copying the function parameter value to another variable while the pass by reference refers to a mechanism of passing the actual parameters to the function."
			},
			{
				question: "How does a linear data structure differ from a non-linear data structure?",
				answer: "If the elements of a data structure form a sequence or a linear list then it is called a linear data structure. Non-linear data structures are those in which the traversal of nodes is done non-linearly. Arrays, linked lists, stacks, and queues are examples of linear data structures, while graphs and trees are examples of non-linear data structures."
			},

		];

		demoCardText.forEach(demoCard => {
			this.generateFlashCard(demoCard.question, demoCard.answer);
		});

		this.saveFlashCardCollection();
	}

	updateFlashCard(index, question, answer, imageUrl = null) {
		const flashCard = new FlashCard();
		flashCard.setQuestion(question);
		flashCard.setAnswer(answer);

		if (flashCard.includeImage) {
			flashCard.setImage(imageUrl);
		}

		// Using flashCard object to update current index in flashCardCollection

		this.state.flashCardCollection[index].faces[0].text = flashCard.faces[0].text;
		this.state.flashCardCollection[index].faces[1].text = flashCard.faces[1].text;
		this.state.flashCardCollection[index].imageUrl = flashCard.imageUrl;
	}

	saveFlashCardCollection() {
		localStorage.clear();
		localStorage.setItem('_flashCards', JSON.stringify(this.state.flashCardCollection));
	}

	shiftCardBack(index) {
		// Card Display Component 'Up' Button

		if (index > 0) {
			let collectionCopy = this.state.flashCardCollection;

			let currentEntry = collectionCopy.splice(index, 1);
			collectionCopy.splice(index - 1, 0, currentEntry[0]);

			this.setState({
				flashCardCollection: collectionCopy
			});

			this.saveFlashCardCollection();
		}

	}

	shiftCardForward(index) {
		// Card Display Component 'Down' Button

		if (index < this.state.flashCardCollection.length - 1) {
			let collectionCopy = this.state.flashCardCollection;

			let currentEntry = collectionCopy.splice(index, 1);
			collectionCopy.splice(index + 1, 0, currentEntry[0]);

			this.setState({
				flashCardCollection: collectionCopy
			});

			this.saveFlashCardCollection();
		}
	}

	render() {

		const { formType, 
				currentIndex, 
				formQuestionText, 
				formAnswerText,
				formImageUrlInputDisabled,
				formCheckboxIsChecked,
				flashCardCollection, 
				deleteCardsButtonDisabled,
				flashCardFormHidden,
				demoCardButtonHidden } = this.state;

		return (

			<div>
				<div className="center">
					<h1 className="heading">Flash Card App</h1>
				</div>

				{
					flashCardFormHidden === false ?
						<div>
							<CardForm 
								formType={formType}
								currentIndex={currentIndex}
								formQuestionText={formQuestionText}
								formAnswerText={formAnswerText}
								formImageUrlInputDisabled={formImageUrlInputDisabled}
								formCheckboxIsChecked={formCheckboxIsChecked}
								onClickCancel={this.btnCancelForm}
								generateFlashCard={this.generateFlashCard}
								updateFlashCard={this.updateFlashCard}
								saveFlashCardCollection={this.saveFlashCardCollection}
							/>
						</div>
					:	
						<div>
							{
								demoCardButtonHidden === false ?
									<div>
										<div className="center">
											<Button 
												id={'btn-create'} 
												className={"setup-btn"} 
												innerText={'Create Card'}
												isDisabled={false} 
												onClick={this.btnCreate}/>
										</div>

										<div className="center">
											<Button 
												id={'btn-demo'} 
												className={"demo-btn"} 
												innerText={'Create Demo Cards'}
												isDisabled={false} 
												onClick={this.generateDemoCards}/>
										</div>
									</div>
								:
									<div>
										<div className="center">
											<Button 
												id={'btn-create'} 
												className={"setup-btn"} 
												innerText={'Create Card'}
												isDisabled={false} 
												onClick={this.btnCreate}/>
										</div>
									</div>
							}

							<CardDisplay
								flashCardCollection={flashCardCollection}
								deleteCardsButtonDisabled={deleteCardsButtonDisabled}
								onClickEdit={this.editCardEntry}
								onClickDelete={this.deleteCardEntry}
								onClickDeleteAll={this.deleteAllCards}
								onClickArrowUp={this.shiftCardBack}
								onClickArrowDown={this.shiftCardForward}
							/>
						</div>
				}

				<div className="center">
					<Button 
						id={'btn-home'} 
						className={"nav-btn default-margin"} 
						innerText={'Home'} 
						isDisabled={false} 
						onClick={this.btnHome}/>
				</div>
			</div>
		);
	}
}

export default SetupScreen;