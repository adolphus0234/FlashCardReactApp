import React, {Component} from 'react';

class Canvas extends Component {
	constructor({ id, width, height, flashCardCollection, backdrop }) {
		super();

		this.id = id;
		this.WIDTH = width;
		this.HEIGHT = height;

		this.flashCardCollection = flashCardCollection;

		this.backdrop = backdrop;

		this.cardCanvas = React.createRef();

		this.scrollFlashCard = this.scrollFlashCard.bind(this);
	}

	componentDidMount() {
		this.CANVAS = document.getElementById(this.id);
		this.CANVAS.width = this.WIDTH;
		this.CANVAS.height = this.HEIGHT;
		
		this.CONTEXT = this.cardCanvas.current.getContext('2d');	
		
		
		this.backdrop.context = this.CONTEXT;
		this.backdrop.width = this.WIDTH;
		this.backdrop.height = this.HEIGHT;

		this.backdrop.draw();
		// console.log(this.backdrop)

		const update = (time = 0) => {

			// flashCardCollection[selectedIndex].printedLines.forEach(line => {
			// 	line.update();
			// });

			this.backdrop.update();

			requestAnimationFrame(update);
		}

		update();
	}

	scrollFlashCard() {
		// this.backdrop.firstClick = true;
		// this.backdrop.getAnswer = !backdrop.getAnswer;
	}

	buildFlashCard(context, flashCard) {
		flashCard.faces.forEach(face => {
			this.printText(face.text, context, face.type, flashCard);
		});
	}

	createFlashCardPrintData() {
		let that = this;

		this.flashCardCollection.forEach(flashCard => {
			that.buildFlashCard(this.CONTEXT, flashCard);
		});
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
					<canvas id={this.id} ref={this.cardCanvas} onClick={this.scrollFlashCard}></canvas>
				</div>
			</div>
		);
	}
}

export default Canvas