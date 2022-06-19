export default class Backdrop {
	constructor(context = null, width = null, height = null) {
		this.context = context;
		this.width = width;
		this.height = height;

		this.x = 0;
		this.y = 0;

		this.slideSpeed = 20;

		this.firstClick = false;
		this.getAnswer = false;
	}

	draw() {
		this.context.fillStyle = 'white';
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

	update() {

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
	}
}