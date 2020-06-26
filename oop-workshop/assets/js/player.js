class Player {
	element = document.querySelector('.player');
	x = 20;
	y = 240;
	width = PLAYER_WIDTH;
	height = PLAYER_HEIGHT;

	// when new Player is called, `this` is created
	constructor() {
		// console.log(this.element)
		this._resetPosition();
		this._initMovement();
	}

	_initMovement() {
		document.addEventListener('keydown', this._handleMovement.bind(this));
	}

	_handleMovement(event) {
		switch (event.keyCode) {
			case keyMap.TOP: {
				this.moveTop();
				break;
			}

			case keyMap.BOTTOM: {
				this.moveBottom();
				break;
			}
		}
	}

	_resetPosition() {
		this.x = 20;
		this.y = 240;
		this._updatePosition();
	}

	_isCollided() {
		for (let i = 0; i < obstacles.length; i++) {
			if (isCollision(this, obstacles[i])) {
				return true;
			}
		}

		return false;
	}

	moveTop() {
		const newY = this.y - PLAYER_MOVE_STEP;

		if (this._isMoveInBoundaries(this.x, newY)) {
			this.y = newY;
			this._updatePosition();
		}
	}

	moveRight() {
		const newX = this.x + PLAYER_MOVE_STEP;

		if (this._isMoveInBoundaries(newX, this.y)) {
			this.x = newX;
			this._updatePosition();
		}
	}

	moveBottom() {
		const newY = this.y + PLAYER_MOVE_STEP;

		if (this._isMoveInBoundaries(this.x, newY)) {
			this.y = newY;
			this._updatePosition();
		}
	}

	moveLeft() {
		const newX = this.x - PLAYER_MOVE_STEP;

		if (this._isMoveInBoundaries(newX, this.y)) {
			this.x = newX;
			this._updatePosition();
		}
	}

	_updatePosition() {
		this.element.style.top = `${this.y}px`;
		this.element.style.left = `${this.x}px`;
	}

	_isMoveInBoundaries(x, y) {
		if (y < 0) {
			return false;
		}

		if (x < 0) {
			return false;
		}

		if (x > MAP_WIDTH - PLAYER_WIDTH) {
			return false;
		}

		if (y > MAP_HEIGHT - PLAYER_HEIGHT) {
			return false;
		}

		return true;
	}
}
