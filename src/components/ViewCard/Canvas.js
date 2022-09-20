import React, {Component} from 'react';
import Text from './Text';

class Canvas extends Component {
	constructor({ id, width, height, flashCardCollection, selectedIndex, backdrop }) {
		super();

		// setting state with props	

		this.state = {
			selectedIndex: selectedIndex,
			textIsLoaded: false,
		}

		// passing remaining props to component

		this.id = id;
		this.WIDTH = width;
		this.HEIGHT = height;

		this.flashCardCollection = flashCardCollection;

		this.backdrop = backdrop;

		// creating a reference for canvas context
		this.cardCanvas = React.createRef();

		// binding function to access 'this'
		this.scrollFlashCard = this.scrollFlashCard.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	componentDidMount() {

		// defining canvas properties
		this.CANVAS = document.getElementById(this.id);
		this.CANVAS.width = this.WIDTH;
		this.CANVAS.height = this.HEIGHT;
		
		// creating canvas context
		this.CONTEXT = this.cardCanvas.current.getContext('2d');
		
		// setting properties for backdrop object
		this.backdrop.context = this.CONTEXT;
		this.backdrop.width = this.WIDTH;
		this.backdrop.height = this.HEIGHT;

		this.backdrop.draw();

		// creating all data needed to display flashcards on canvas
		this.createFlashCardPrintData();

		//
		//Need to move function one level up
		window.addEventListener('keydown', this.handleKeyPress, true);

		// creating animation loop for canvas scroll

		const { selectedIndex } = this.state;

		this.lastPrintedLine = this.flashCardCollection[selectedIndex].printedLines[this.flashCardCollection[selectedIndex].printedLines.length-1];

		const update = (time = 0) => {

			if (this.lastPrintedLine.isLoaded) {
				if (!this.state.textIsLoaded) {
					this.setState({
						textIsLoaded: true
					});
				}
			}

			if (this.flashCardCollection.length > 0) {
				this.flashCardCollection[this.state.selectedIndex].printedLines.forEach(line => {
					line.update(this.state.textIsLoaded);
				});
			}		

			this.backdrop.update(this.state.textIsLoaded);

			requestAnimationFrame(update);
		}

		update();
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		if (prevState.textIsLoaded === true) {
			return prevState.textIsLoaded;
		}
		return null; 
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (snapshot !== null) {
			this.setState({
				textIsLoaded: false
			});

			const { selectedIndex } = this.state;

			this.lastPrintedLine = this.flashCardCollection[selectedIndex].printedLines[this.flashCardCollection[selectedIndex].printedLines.length-1];

		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			selectedIndex: props.selectedIndex
		}
	}

	handleKeyPress(event) {
		if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
			event.preventDefault();
			this.scrollFlashCard();
		}
	}

	scrollFlashCard() {
		// move function a level up and pass into Canvas component
		this.backdrop.firstClick = true;
		this.backdrop.getAnswer = !this.backdrop.getAnswer;
	}

	buildFlashCard(context, flashCard) {
		let that = this;

		flashCard.faces.forEach(face => {
			that.printText(face.text, context, face.type, flashCard);
		});
	}

	createFlashCardPrintData() {
		let that = this;

		if (this.flashCardCollection.length > 0) {
			this.flashCardCollection.forEach(flashCard => {				
				that.buildFlashCard(this.CONTEXT, flashCard);						
			});
		}	
	}

	printText(stringArray, context, type, flashCard) {

		const heading = new Text(context, this.backdrop, type + ":", "60px", 25, 75);

		if (type === "A") {		
			heading.offset = 600;	
		}

		flashCard.printedLines.push(heading);

		let textY = 110;

		stringArray.forEach(string => {
			const line = new Text(context, this.backdrop, string);
			line.y = (textY += line.lineSpace);

			if (type === "A") {		
				line.offset = 600;	
			}

			flashCard.printedLines.push(line);
		});		
	}

	render() {
		return (
			<div>
				<div id='canvas-cont'>
					<div className='tooltip center'>
						<canvas id={this.id}
							    ref={this.cardCanvas} 
							    onClick={this.scrollFlashCard}>
						</canvas>
						<span className="tooltiptext">Click or press SHIFT to toggle between question and answer.</span>	
					</div>		
				</div>
			</div>
		);
	}
}

export default Canvas