import React, { Component } from 'react';

class CrystalParallax extends Component {
	constructor() {
		super();

		this.state = {
			hue: 243
		}

		this.CANVAS_REF = React.createRef();

		this.dots=[{}];
		this.mx = 0; 
		this.my = 0;
		this.md = 100;
		this.maxWidth = 15;
		this.minWidth = 2;
		this.maxSpeed = 17;
		this.minSpeed = 3;
		this.hue = 225; //default 230 (253.6 looks nice)
		this.hueDif = 0; // Hue +/-  default 50
		this.glow = 10; // Set to 0 for better performance
	}

	componentDidMount() {
		this.CANVAS = document.getElementById("bg_canvas");
		this.CONTEXT = this.CANVAS_REF.current.getContext('2d');
		this.bgg = document.getElementById("bg_glow");

		this.width = this.CONTEXT.canvas.width = window.innerWidth;
		this.height = this.CONTEXT.canvas.height = window.innerHeight;
		this.maxHeight = this.height *.9
		this.minHeight = this.height *.5;

		this.CONTEXT.globalCompositeOperation = "lighter";

		this.bgg.style.background = "radial-gradient(ellipse at center, hsla("+this.hue+",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";

		this.pushDots();

		let that = this;

		window.onresize = function() {
			that.width = that.CONTEXT.canvas.width = window.innerWidth;
			that.height = that.CONTEXT.canvas.height = window.innerHeight;
			that.maxHeight = that.height *.9
			that.minHeight = that.height *.5;
			that.dots = [];
			that.pushDots();
			that.CONTEXT.globalCompositeOperation = "lighter";
		}

		// document.getElementById("overlay").onclick = function(){
		//   hue = Math.random()*360;
		//   bgg.style.background = "radial-gradient(ellipse at center, hsla("+hue+",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";
		//   dots = [];
		//   pushDots();

		//   console.log(hue)
		// }

		const updateLoop = () => {
			this.update()

			window.requestAnimationFrame(updateLoop);
		}

		updateLoop();
	}

	pushDots(num){
	  	for (let i = 1; i < this.md; i++){
	    	this.dots.push({
	      		x: Math.random() * this.width,
	      		y: Math.random() * this.height / 2,
	      		h: Math.random() * (this.maxHeight-this.minHeight)+this.minHeight,
	      		w: Math.random() * (this.maxWidth-this.minWidth)+this.minWidth,
	      		c: Math.random() * ((this.state.hue+this.hueDif)-(this.state.hue-this.hueDif))+(this.state.hue-this.hueDif),
	      		m: Math.random() * (this.maxSpeed-this.minSpeed)+this.minSpeed
	    	});
	  	}
	}

	update() {
		this.CONTEXT.clearRect(0, 0, this.width, this.height);

		for(let i = 1; i < this.dots.length; i++) {

		    this.CONTEXT.beginPath();

		    let grd = this.CONTEXT.createLinearGradient(this.dots[i].x, this.dots[i].y, this.dots[i].x + this.dots[i].w, this.dots[i].y + this.dots[i].h);

		    grd.addColorStop(.0, "hsla(" + this.dots[i].c +",100%,50%,.0)");
		    grd.addColorStop(.2, "hsla(" + this.dots[i].c + 20 +",100%,50%,.5)");
		    grd.addColorStop(.5, "hsla(" + this.dots[i].c + 30 +",70%,60%,.8)");
		    grd.addColorStop(.8, "hsla(" + this.dots[i].c + 40 +",100%,50%,.5)");
		    grd.addColorStop(1., "hsla(" + this.dots[i].c + 40 +",50%,50%,.0)");

		    this.CONTEXT.shadowBlur = this.glow;
		    this.CONTEXT.shadowColor = "hsla("+(this.dots[i].c)+",50%,50%,1)";
		    this.CONTEXT.fillStyle = grd;
		    this.CONTEXT.fillRect(this.dots[i].x,this.dots[i].y,this.dots[i].w,this.dots[i].h);
		    this.CONTEXT.closePath();

		    this.dots[i].x += this.dots[i].m/100;

		    if (this.dots[i].x > this.width + this.maxWidth){
		      	this.dots.splice(i,1);
		      	this.dots.push({
		        	x:0,
		        	y:Math.random()* this.height,
		        	h:Math.random()*(this.maxHeight-this.minHeight)+this.minHeight,
		        	w:Math.random()*(this.maxWidth-this.minWidth)+this.minWidth,
		        	c:Math.random()*((this.state.hue+this.hueDif)-(this.state.hue-this.hueDif))+(this.state.hue-this.hueDif),
		        	m:Math.random()*(this.maxSpeed-this.minSpeed)+this.minSpeed
		      });
		    }
		}
	}

	render() {
		return (
			<div> 
				<div id="fps"></div>
				<div id="bg_glow"></div>
				<div id="overlay"></div>
				<canvas id="bg_canvas" ref={this.CANVAS_REF}></canvas>
			</div>
		);
	}
}	

export default CrystalParallax;