export default class Text {
	constructor(context, backdrop, text, fontSize = "20px", x = 25, y = 110) {
		this.context = context;
		this.backdrop = backdrop;
		this.text = text;

		this.font = new FontFace('OpenSans', "url(fonts/OpenSans-Bold.ttf)");

		this.fontSize = fontSize;
		this.x = x;
		this.y = y;

		this.offset = 0;

		this.lineSpace = 30;

		this.isLoaded = false;
	}

	draw(allTextIsLoad) {
		this.context.clearRect(this.x, this.y, 400, 50);
		this.backdrop.draw();

		let that = this;

		this.font.load().then(function() {
			document.fonts.add(that.font);
			that.isLoaded = true;

			if (allTextIsLoad) {
				that.context.fillStyle = "black";
				that.context.font = `${that.fontSize} ${that.font.family}`;

				that.context.fillText(that.text, that.x, that.y);	
			}
			
		});	
	}

	update(allTextIsLoad) {
		this.draw(allTextIsLoad);
		this.x = (this.backdrop.x + 25) + this.offset;
	}
}