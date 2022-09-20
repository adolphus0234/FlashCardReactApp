export default class Backdrop {
	constructor(context = null, width = null, height = null) {
		this.context = context;
		this.width = width;
		this.height = height;

		this.x = 0;
		this.y = 0;

		this.slideSpeed = 10;

		this.firstClick = false;
		this.getAnswer = false;

		this.color = 'white';
	}

	draw() {
		this.context.fillStyle = this.color;
		this.context.fillRect(this.x, this.y, this.width, this.height);

		this.context.fillStyle = 'hsl(119, 85%, 93%)';
		this.context.fillRect(this.x + 600, this.y, this.width, this.height);
	}

	reset() {
		this.x = 0;
		this.y = 0;

		this.firstClick = false;
		this.getAnswer = false;
	}

	update(textIsLoaded) {

		if (this.firstClick) {
			if (!this.getAnswer) {
				if (this.x < 0) {
					this.x += this.slideSpeed;
				}
			}

			if (this.getAnswer) {
				if (this.x > -600) {
					this.x -= this.slideSpeed;
				}
			}
		}

		if (textIsLoaded) {
			this.color = 'white';
		} else {
			this.color = 'rgb(40, 55, 90)';

			this.context.fillStyle = 'white';
			this.context.font = "60px Times New Roman"
			this.context.fillText("Loading...", 180, (this.height / 2) - 80)
		}
	}
}