export default class FlashCard {
	constructor() {
		this.faces = [
			{
				text: this.question,
				type: "Q"
			},
			{
				text: this.answer,
				type: "A"
			}
		];

		this.imageUrl = "";

		this.lineCharLimit = 50;

		this.printedLines = [];

		this.includeImage = false;
	}

	processTextInput(text) {
		let splitText = text.split(" ");

		let newString = "";
		let processedText = [];

		for (let i = 0; i < splitText.length; i++) {
			let nextTextLen = 0;

			if (splitText[i + 1]) {
				nextTextLen = splitText[i + 1].length;
			}
			
			if (newString.length < this.lineCharLimit - nextTextLen) {
				newString += splitText[i] + " ";
			} else {
				processedText.push(newString);
				newString = "";
				newString += splitText[i] + " ";
			}
		}

		processedText.push(newString);

		return processedText;
	}

	setQuestion(text) {
		this.faces[0].text = this.processTextInput(text);
	}

	setAnswer(text) {
		this.faces[1].text = this.processTextInput(text);
	}

	setImage(url) {
		this.imageUrl = url;
	}
}