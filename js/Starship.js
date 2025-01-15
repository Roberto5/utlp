/**
 * generate a starship
 * @param {Starship} config  see starshipPrototype
 * 
 */
class Starship {
	//dimensione del quadrato in pixel
	dimSquare = 50;
	//dimensione fissa o variabile?
	height = 20;
	witdh = 20;
	lastIdRoom = 1;
	get health() {
		return this._health;
	}
	set health(value) {
		if (value > this.maxHealth) this._health = this.maxHealth;
		else if (value < 0) this._health = 0;
		else this._health = value;
	}
	_health = 100;//da definire
	get maxHealth() {
		var maxh = 0;
		for (let i in this.rooms) {
			maxh += this.rooms[i].maxHealth;
		}
	}
	/**
	 * @type {room[]}
	 */
	rooms = [];	// array of room
	/**
	 * @type {door[]}
	 */
	door = [];	// array of door
	roomName= ["", "1x1", "2x1", "1x2", "2x2"];
	constructor(config) {
		if (config) {
			var conf = {
				height: 20,
				width: 20,
				room: [],
				door: [],
				health: -1,
				scene: null
			};
			for (let key in conf) {
				conf[key] = config[key] ? config[key] : conf[key];
			}

			for (let key in conf) {

				switch (key) {
					case "room":
						this.addRoom(conf.room);
						break;
					case "door":

						this.addDoor(conf.door);
						break;
					case "health":
						if (conf.health >= 0) this.health = conf.health;
						else this.health = this.maxHealth;
						break;
					default:
						this[key] = conf[key];
				}


			}
		}
	}
	addRoom(rooms) {
		if (rooms) {
			if (Array.isArray(rooms)) {//aggiunge più stanze
				for (var i = 0; i < rooms.length; i++) {
					if (typeof (rooms[i]) == "object")
						this.rooms.push(new room(rooms[i]));
				}
			}
			else { //aggiunge una stanza
				this.rooms.push(new room(rooms));
			}
		}
	}
	/**
	 * 
	 * @param {Array} doors 
	 */
	addDoor(doors) {
		if (doors) {
			if (Array.isArray(doors)) {
				if (Array.isArray(doors[0])) {
					for (var i = 0; i < doors.length; i++) {
						this.addOneDoor(doors[i]);
					}
				}
				else {
					this.addOneDoor(doors);
				}
			}
		}
	}
	/**
	 * @param {Array} rooms 
	 */
	addOneDoor(rooms) {
		if (rooms) {
			if (Array.isArray(rooms) && rooms.length == 2) {
				var elements = [];
				elements.push(this.rooms.find((element) => element.id == rooms[0]));
				elements.push(this.rooms.find((element) => element.id == rooms[1]));
				this.door.push(new door(elements));
			}
		}
	}
	/**
	 * Render the starship in the given scene.
	 * @param {Phaser.Scene} scene The Phaser scene in which to render the starship.
	 * @returns {Phaser.GameObjects.Container} The container containing the starship.
	 */
	render(scene) {//@todo rifare
		var ship = scene.add.container(scene.game.width / 2, scene.game.height / 2, []);
		room = null;
		for (var i = 0; i < this.rooms.length; i++) { // render the rooms
			//room sprite
			var sprite = "room" + this.roomName[this.rooms[i].type];
			var r = scene.add.sprite(0, 0, 'rooms', sprite);
			r.setOrigin(0);
			//room container
			room = scene.add.container(this.rooms[i].x * this.dimSquare, this.rooms[i].y * this.dimSquare);
			room.add(r);
			if (this.rooms[i].system) {
				var a = this.rooms[i].system.type;
				x = 0, y = 0;
				if (this.rooms[i].system.size == 1)
					switch (this.rooms[i].type) {
						case 2: x = this.dimSquare / 2; break;
						case 3: y = this.dimSquare / 2; break;
						case 4: x = y = this.dimSquare / 2; break;
					}
				if (a != 0) {
					var s = scene.add.sprite(x, y, 'rooms', this.rooms[i].system.systemName[a]);
					s.setOrigin(0);
					room.add(s);
				}



			}
			room.setSize(r.width, r.height);
			ship.add(room);
		}

		/*/ add door
		for (var j = 0; j < this.door.length; j++) {
			switch (this.door[j].rotation) {
				case 0: x = this.door[j].x * this.dimSquare + this.dimSquare; y = this.door[j].y * this.dimSquare + this.dimSquare / 2; break;
				case 90: x = this.door[j].x * this.dimSquare + this.dimSquare / 2; y = this.door[j].y * this.dimSquare; break;
				case 180: x = this.door[j].x * this.dimSquare; y = this.door[j].y * this.dimSquare + this.dimSquare / 2; break;
				case 270: x = this.door[j].x * this.dimSquare + this.dimSquare / 2; y = this.door[j].y * this.dimSquare + this.dimSquare; break;
				default: this.door[j].rotation = 0; x = this.door[j].x + this.dimSquare; y = this.door[j].y + this.dimSquare / 2; break;

			}
			door = scene.add.sprite(x, y, 'rooms', this.door[j].open ? 'door5' : 'door0');
			door.open = this.door[j].open;
			door.setAngle(this.door[j].rotation - 90);
			door.index = j;
			door.setInteractive(new Phaser.Geom.Rectangle(0, -door.height, door.width, door.height * 3), Phaser.Geom.Rectangle.Contains);
			door.on('pointerdown', function () {
				if (this.open) this.play('close');
				else this.play('open');
				this.open = !this.open;
				this.scene.ship.door[this.index].open = this.open;
			});
			door.setScale(1, 2);
			ship.add(door);

		}
		//*/
		ship.setSize(this.witdh * this.dimSquare, this.height * this.dimSquare);
		return ship;
	}
}

class door {
	open = false;
	active = true;
	/**
	 * @type {room[]} 2 room linked
	 */
	link = [0, 0];// room linked
	// proprietà per la visualizzazione
	rotation = 0;
	x = 0;//display position ?
	y = 0;
	/**
	 * 
	 * @param {room[]} config array of 2 room linked
	 */
	constructor(config) {
		if (typeof (config) == "array") {
			if (config.length == 2) {
				if (typeof (config[0]) == "room" && typeof (config[1]) == "room")
					this.link = config;
				else console.error("config need to be an array of 2 room");
			}
			else console.error("door need 2 room");
		}
		else console.error("config need to be an array");
	}
}
class room {
	id = 1;
	_type = 0; // 0:distrutta 1:1x1 2:2x2 3:2x1 4:1x2
	get type() {
		return this._type;
	}
	set type(value) {
		if (value >= 0 && value < 5) this._type = value;
	}
	get dimX() {
		return this.type == 2 || this.type == 3 ? 2 : 1;
	}
	get dimY() {
		return this.type == 2 || this.type == 4 ? 2 : 1;
	}
	_health = 100;
	get health() {
		return this._health;
	}
	set health(value) {
		if (value > this.maxHealth) this._health = this.maxHealth;
		else if (value < 0) this._health = 0;
		else this._health = value;
	}
	healthType = [100, 400, 200, 200];
	get maxHealth() {
		return this.healthType[this.type];
	}
	x = 0;
	y = 0;
	//armor = false;//@todo definire bene
	antifire = false;
	oxigen = 0;
	/**
	 * @type {shipSystem}
	 */
	system = null;
	/**
	 * 
	 * @param {object} config 
	 * @param {number} config.type
	 * @param {number} config.x
	 * @param {number} config.y
	 * @param {boolean} config.armor optional
	 * @param {boolean} config.antifire
	 * @param {number} config.system
	 * @param {number} config.health
	 */
	constructor(config) {
		if (config) {
			var conf = {
				type: 0,
				x: 0,
				y: 0,
				//armor: false,
				antifire: false,
				system: 0,
				health: -1
			};
			for (let key in conf) {
				conf[key] = config[key] ? config[key] : conf[key];
			}

			for (let key in conf) {
				switch (key) {
					case "system":
						this.system = new shipSystem(conf.system).create();
						break;
					case "type":
						this.type = conf.type;
						this.health = this.maxHealth;
						break;
					case "health":
						if (conf.health >= 0) this.health = conf.health;
						break;
					default:
						this[key] = conf[key];
				}
			}
		}
	}
}

