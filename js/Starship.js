/**
 * @param config 
 * 
 * config  -room array
 * 			-h
 * 			-w
 * 			-scene
 * 			-door array
 * 
 */
function Starship (config) {
	if (config) {
		var conf= {
				h:20,
				w:20,
				room:[],
				door:[],
				scene:null
		};
		for (key in conf) {
				if (config[key]) conf[key]=config[key];
				if ((key!="room")&&(key!="door")) this[key]=conf[key];
		}
		if (Array.isArray(conf.door)) {// @todo add controll door place.
			for (var i=0;i<conf.door.length;i++) {
				for (key in this.doorPrototype) {
					if (!conf.door[i][key]) conf.door[i][key]=this.doorPrototype[key];
				}
				//conf.door[i].id=this.lastIdDoor++;
			}
			this.door=conf.door;
		}
		if (Array.isArray(conf.room)) {
			for (var i=0;i<conf.room.length;i++)
				this.addRoom(conf.room[i]);
		}
	}
}

Starship.prototype={
		dimSquare:50,
		lastIdRoom:1,
		//lastIdDoor:1,
		door:[],
		doorPrototype:{
			//id:1,
			open:false,
			active:true,
			x:0,
			y:0,
			rotation:0,
			link:[0,0]
		},
		room:[],
		roomPrototype:{
			type:0, // 1x1 2x2 2x1 1x2
			id:1,
			x:0,
			y:0,
			armor:false,
			antifire:false,
			system:{},
			/**
			 *  booelan[] 
			 *  index of boolean is position on room
			 *   _ _ 
			 *  |0 1|
			 *  |2 3|
			 *   - -
			 */
			defence:new Array(4)
		},
		roomType:{
			"1x1":1,
			"2x1":2,
			"1x2":3,
			"2x2":4,
		},
		roomName:["","1x1","2x1","1x2","2x2"],
		systemName: ['controll','reactor','shield'],
		addRoom:function(type,x,y) {
			room=Object.assign({}, this.roomPrototype);
			if (typeof(type)=="object") {
				for (key in this.roomPrototype) {
					if (type[key]&&key!="system") room[key]=type[key];
					if (key=="system") room.system=new shipSystem(type.system,type.type).system;
				}
				x=room.x;
				y=room.y;
				type=type.type;
			}
			if ((x<0)||(y<0)) return false;
			
			if (typeof(type)=="string") room.type=this.roomType[type];
			if ((room.type<1)||(room.type>4)) return false;
			occupied=[[x,y]];
			if ((room.type==2)||(room.type==4)) occupied.push([x+1,y]);
			if ((room.type==3)||(room.type==4)) occupied.push([x,y+1]);
			if (room.type==4) occupied.push([x+1,y+1]);
			free=true;
			for (var i=0;i<this.room.length && free;i++) {
				o=[[this.room[i].x,this.room[i].y]];
				if ((this.room[i].type==2)||(this.room[i].type==4)) o.push([this.room[i].x+1,this.room[i].y]);
				if ((this.room[i].type==3)||(this.room[i].type==4)) o.push([this.room[i].x,this.room[i].y+1]);
				if (this.room[i].type==4) o.push([this.room[i].x+1,this.room[i].y+1]);
				for (var j=0;j<occupied.length && free;j++)
				{
					for (var z=0;z<o.length && free;z++)
						free=(occupied[j][0]!=o[z][0] || occupied[j][1]!=o[z][1] )&& occupied[j][0]<=this.w && occupied[j][1]<=this.h;
				}
			}
			if (free) {
				room.x=x;
				room.y=y;
				room.id=this.lastIdRoom++;
				this.room.push(room);
				return room;
			}
			return false;
		},
		render:function (scene) {
			ship=scene.add.container(scene.game.width/2,scene.game.height/2,[]);
			room=null;
			for (var i=0;i<this.room.length;i++) {
				r=scene.add.sprite(0,0,'rooms',"room"+this.roomName[this.room[i].type]);
				r.setOrigin(0);
				
				room=scene.add.container(this.room[i].x*this.dimSquare,this.room[i].y*this.dimSquare);

				room.add(r);
				if (this.room[i].system) {
					var a=this.room[i].system.type;
					x=0,y=0;
					if (this.room[i].system.size==1)
					switch (this.room[i].type) {
					case 2: x=this.dimSquare/2;break;
					case 3: y=this.dimSquare/2;break;
					case 4: x=y=this.dimSquare/2;break;
				}
					s=scene.add.sprite(x,y,'rooms',this.systemName[a]);
					s.setOrigin(0);
					
					room.add(s);
				}
				room.setSize(r.width,r.height);
				ship.add(room);
			}
			
			// add door
			for (var j=0;j<this.door.length;j++) {
					switch (this.door[j].rotation) {
						case 0: x=this.door[j].x*this.dimSquare+this.dimSquare;y=this.door[j].y*this.dimSquare+this.dimSquare/2;break;
						case 90: x=this.door[j].x*this.dimSquare+this.dimSquare/2;y=this.door[j].y*this.dimSquare;break;
						case 180: x=this.door[j].x*this.dimSquare;y=this.door[j].y*this.dimSquare+this.dimSquare/2;break;
						case 270: x=this.door[j].x*this.dimSquare+this.dimSquare/2;y=this.door[j].y*this.dimSquare+this.dimSquare;break;
						default:this.door[j].rotation=0;x=this.door[j].x+this.dimSquare;y=this.door[j].y+this.dimSquare/2;break;
						
					}
					door=scene.add.sprite(x,y,'rooms',this.door[j].open?'door5':'door0');
					door.open=this.door[j].open;
					door.setAngle(this.door[j].rotation-90);
					door.index=j;
					door.setInteractive(new Phaser.Geom.Rectangle(0, -door.height, door.width, door.height*3), Phaser.Geom.Rectangle.Contains);
					door.on('pointerdown',function(){
			        	if (this.open) this.play('close');
			        	else this.play('open');
			        	this.open=!this.open;
			        	this.scene.ship.door[this.index].open=this.open;
			        });
					door.setScale(1,2);
					ship.add(door);
				
			}
			ship.setSize(this.w*this.dimSquare,this.h*this.dimSquare);
			return ship;
		}
};
function shipSystem(obj,roomT) {
	this.add(obj,roomT);
}

shipSystem.prototype={
		systemPrototype:{
			type:0, //type of system
			name:"",
			liv:1, // level
			energy:0, // actual energy consumption
			energyForLiv:0, // consumption for every liv
			roomNeed:[],
			bars:0, // for reactor
			max:0,
			rate:0,
		},
		systemType:{
			"controll":0,
			"reactor" :1,
			"shield" :2,
		},
		
		systemTypePropriety :[
		    {energyForLiv:0,roomNeed:[1,2,3,4],size:1},
		    {energyForLiv:10,bars:10,roomNeed:[4],size:2},
		    {energyForLiv:2,max:100,rate:2,roomNeed:[4],size:2}
		],
		system:{},
		add:function(obj,roomT) {
			system=Object.assign({}, this.systemPrototype);
			if (typeof(obj)=="object") {
				for (key in system) 
					if (obj[key]) system[key]=obj[key];
			}
			else {
				if (typeof(obj)=="string")	system.type=this.system[obj];
				else return false;
			}
			for (key in this.systemTypePropriety[system.type])
				system[key]=this.systemTypePropriety[system.type][key];
			this.system=system;
			if (system.roomNeed.includes(roomT)) return system;
			return false;
		}
};