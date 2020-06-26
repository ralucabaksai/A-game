class Obstacle {
	constructor(x, y, width, height) {
		this._createElement();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this._positionObstacle();
	}

	_createElement() {
		this.element = document.createElement('div');
		this.element.classList.add('obstacle');
		board.appendChild(this.element);
	}

	_positionObstacle() {
		this.element.style.top = `${this.y}px`;
		this.element.style.left = `${this.x}px`;
		this.element.style.width = `${this.width}px`;
		this.element.style.height = `${this.height}px`;
	}

	remove() {
		this.element.remove();
	}

	move() {
		const newX = this.x - OBTACLE_MOVE_STEP;
		this.element.style.left = `${newX}px`;
		this.x = newX;
	}
}
