const board = document.querySelector('.board');
const startButton = document.querySelector('button');

const keyMap = {
	TOP: 38,
	RIGHT: 39,
	BOTTOM: 40,
	LEFT: 37
};

const PLAYER_MOVE_STEP = 20;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 20;
const OBTACLE_MOVE_STEP = 1;

let getRandomInteger = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

class GameEngine {
	lives = 2;
	player;
	obstacle;
	obstacles = [];

	constructor() {
		this._start();
	}

	_start() {
		this.player = new Player();
		this.obstacles = [
			new Obstacle(getRandomInteger(300, 400), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(400, 500), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(500, 600), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(600, 700), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(700, 800), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(800, 900), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(900, 980), getRandomInteger(0, 300), 20, getRandomInteger(20, 200))
		];
		this._loop();
	}
	_talk(text) {
		const synth = window.speechSynthesis;
		const speaker = new SpeechSynthesisUtterance(text);

		// speaker.text = text;

		synth.speak(speaker);
	}

	_reset() {
		for (let i = 0; i < this.obstacles.length; i++) {
			this.obstacles[i].remove();
		}
		this.obstacles = [];
		this.player = new Player();
		this.obstacles = [
			new Obstacle(getRandomInteger(300, 400), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(400, 500), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(500, 600), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(600, 700), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(700, 800), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(800, 900), getRandomInteger(0, 300), 20, getRandomInteger(20, 200)),
			new Obstacle(getRandomInteger(900, 980), getRandomInteger(0, 300), 20, getRandomInteger(20, 200))
		];
		this._loop();
	}

	_loop() {
		let id;
		// console.dir(this.obstacles);
		for (let i = 0; i < this.obstacles.length; i++) {
			this.obstacles[i].move();
			if (this.obstacles[i].x < 0) {
				this.obstacles[i].remove();
				this.obstacles.shift();
				this.obstacles.push(
					new Obstacle(getRandomInteger(700, 980), getRandomInteger(0, 300), 20, getRandomInteger(20, 200))
				);
			} else {
				if (isCollision(this.obstacles[i], this.player)) {
					if (this.lives > 0) {
						setTimeout(() => {
							cancelAnimationFrame(id);
							alert('You lost 1 life !');
							this._talk('You lost 1 life!');
							this.lives -= 1;
							document.querySelector('.lives').innerHTML = `Lives: ${this.lives}`;
							this._reset();
						}, 0);
					} else {
						setTimeout(() => {
							cancelAnimationFrame(id);

							alert('Game over');
							this._talk('Game over!');
							window.location.reload(true);
						}, 0);
					}
				}
			}
		}
		id = window.requestAnimationFrame(this._loop.bind(this));
	}
}

startButton.addEventListener('click', () => new GameEngine());
