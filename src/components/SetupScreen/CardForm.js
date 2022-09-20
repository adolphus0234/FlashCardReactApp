import React, { Component } from 'react';
import Button from '../Button';

class CardForm extends Component {
	constructor({ formType, currentIndex, formQuestionText, formAnswerText, formImageUrlText,
		formImageUrlInputDisabled, formCheckboxIsChecked, onClickCancel, generateFlashCard, 
		updateFlashCard, saveFlashCardCollection }) {
		super();

		this.state = {
			imageUrlInputDisabled: formImageUrlInputDisabled,
			checkboxIsChecked: formCheckboxIsChecked,
			formType: formType,
			currentIndex: currentIndex,
			questionText: formQuestionText,
			questionTarget: null,
			answerText: formAnswerText,
			answerTarget: null,
			imageUrlText: formImageUrlText,
			imageUrlTarget: null,
			defaultAddButtonText: 'Add Card'
		}

		const { questionText, answerText, imageUrlText } = this.state;

		//passing props to component

		this.btnCancel = function(event) {
			onClickCancel();

			// gets rid of form submission console warning
			if (event) {
				event.preventDefault();
			}
			
		}

		this.generateFlashCard = generateFlashCard;
		
		this.updateFlashCard = updateFlashCard;

		this.saveFlashCardCollection = function() {
			saveFlashCardCollection();
		}

		// binding functions to access 'this'

		this.btnClear = this.btnClear.bind(this);
		this.btnAdd = this.btnAdd.bind(this);

		this.toggleDisableImageUrl = this.toggleDisableImageUrl.bind(this);
		this.onQuestionChange = this.onQuestionChange.bind(this);
		this.onAnswerChange = this.onAnswerChange.bind(this);
	}

	componentDidMount() {
		if (this.state.formType !== 'add') {
			this.setState({
				defaultAddButtonText: 'Update Card'
			});
		}
	}

	btnAdd(event) {
		this.addFlashCardEntry(this.state.formType);

		// gets rid of form submission console warning
		event.preventDefault();
	}

	btnClear() {
		this.setState({
			questionText: "",
			answerText: "",
			imageUrlText: ""
		});	
	}

	btnCancel() {
		// added in constructor
	}

	onQuestionChange(event) {
		this.setState({
			questionText: event.target.value
		});

		if (this.state.questionTarget === null) {
			this.setState({
				questionTarget: event.target
			});
		}
	}

	onAnswerChange(event) {
		this.setState({
			answerText: event.target.value
		});

		if (this.state.answerTarget === null) {
			this.setState({
				answerTarget: event.target
			});
		}
	}

	onImageUrlChange(event) {

	}

	toggleDisableImageUrl() {
		// this.setState({
		// 	imageUrlInputDisabled: !this.state.imageUrlInputDisabled,
		// 	checkboxIsChecked: !this.state.checkboxIsChecked
		// });

		alert("Including images will be a feature in a later update.")
	}

	addFlashCardEntry(formType) {
		const { 
				questionText, 
				questionTarget, 
				answerText, 
				answerTarget, 
				imageUrlText, 
				imageUrlTarget,
				currentIndex,
				imageUrlInputDisabled } = this.state;

		let msg = "Flash card has been added";

		if (questionText === "") {
			alert("Please type in a question.");
			if (questionTarget !== null)
				questionTarget.focus();
			return;
		}

		if (answerText === "") {
			alert("Please type in an answer.");
			if (answerTarget !== null)
				answerTarget.focus();
			return;
		}

		if (!imageUrlInputDisabled) { //check box is checked

			if (imageUrlText === "") {
				alert("Please enter an image url");
				return;
			}

			if (formType === 'add') {
				this.generateFlashCard(questionText, answerText, imageUrlText);
				window.scrollTo(0, 0);
			} else {
				this.updateFlashCard(currentIndex, questionText, answerText, imageUrlText);
				window.scrollTo(0, 0);
				msg = "Flash card has been updated";
			}
			

		} else {
			if (formType === 'add') {
				this.generateFlashCard(questionText, answerText);
				window.scrollTo(0, 0);
			} else {
				this.updateFlashCard(currentIndex, questionText, answerText);
				msg = "Flash card has been updated";
				window.scrollTo(0, 0);
			}
			
		}

		window.scrollTo(0, 0);

		// clearControls();
		// hideForm();
		this.btnCancel();

		// updateFlashCardDisplay(flashCardCollection);
		this.saveFlashCardCollection();
	}

	generateFlashCard() {
		// defined by prop in constructor
	}

	updateFlashCard() {
		// defined by prop in constructor
	}

	updateFlashCardDisplay(flashCardCollection) {
			
	}

	saveFlashCardCollection(flashCardCollection) {
		// defined by prop in constructor
	}

	render() {

		const { imageUrlInputDisabled, 
				checkboxIsChecked, 
				questionText, 
				answerText, 
				imageUrlText,
				defaultAddButtonText } = this.state;

		return (
			<div>
				<form id="entry-fields" className="center">
					<div>
						<div className="form-group">
							<p>Question:</p>
							<textarea id="ta-question" rows="5" cols="50" 
								onChange={this.onQuestionChange} value={questionText}></textarea>
						</div>
						<div className="form-group">
							<p>Answer:</p>
							<textarea id="ta-answer" rows="5" cols="50" 
								onChange={this.onAnswerChange} value={answerText}></textarea>
						</div>
						<div className="form-group">
							<label>Include Image?</label>
							<input id="checkbox" type="checkbox" checked={checkboxIsChecked}
								onChange={this.toggleDisableImageUrl}></input>
						</div>
						<div className="form-group">
							<label>Image Url:</label>
							<input id="image-url" type="text" onChange={this.onImageUrlChange} 
								value={imageUrlText} disabled={imageUrlInputDisabled}></input>
						</div>
						<div className="form-group center">
							<Button 
								id={'btn-add'} 
								className={""} 
								innerText={defaultAddButtonText} 
								isDisabled={false} 
								onClick={this.btnAdd}/>
							<Button 
								id={'btn-clear'} 
								className={""} 
								innerText={'Clear fields'} 
								isDisabled={false} 
								onClick={this.btnClear}/>
							<Button 
								id={'btn-cancel'} 
								className={""} 
								innerText={'Cancel'} 
								isDisabled={false} 
								onClick={this.btnCancel}/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default CardForm;