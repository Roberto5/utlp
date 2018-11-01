/**
 * @param config 
 * 
 * config  -room array
 * 			-h
 * 			-w
 * 			-scene
 * 
 */
function Starship (config) {
	if (config) {
		var conf= {
				h:20,
				w:20,
				room:[],
				scene:null
		};
		for (key in conf) {
				if (config[key]) conf[key]=config[key];
				if (key!="room")this[key]=conf[key];
		}
		if (Array.isArray(conf.room)) {
			for (var i=0;i<conf.room.length;i++)
				this.addRoom(conf.room[i]);
		}
	}
	
}

Starship.prototype={
		room:[],
		roomPrototype:{
			type:0, // 1x1 2x2 2x1 1x2
			x:0,
			y:0,
			armor:false,
			antifire:false,
			system:{},
			defence:[] // 1 or more interior turret 
		},
		roomType:{
			"1x1":1,
			"2x1":2,
			"1x2":3,
			"2x2":4,
		},
		addRoom:function(type,x,y) {
			room=this.roomPrototype;
			if (typeof(type)=="object") {
				for (key in this.roomPrototype) {
					if (type[key]&&key!="system") room[key]=type[key];
					if (key=="system") room.system=new system(type.system,type.type);
				}
				x=type.x;
				y=type.y;
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
				this.room.push(room);
				return room;
			}
			return false;
		},
		addSystem: function(type,x,y) {
			for (var i=0;i<this.room.length;i++) {
				if ((this.room[i].x==x)&&(this.room[i].y==y)) {
					s=new system();
					if (s.add(type,this.room[i].type)) {
						this.room[i].system=s;
					}
				}
			}
		},
		render:function (scene) {
			
		}
};
function system(obj,roomT) {
	this.add(obj,roomT);
}
system.prototype={
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
		    {energyForLiv:0,roomNeed:[1,2,3,4]},
		    {energyForLiv:10,bars:10,roomNeed:[4]},
		    {energyForLiv:2,max:100,rate:2,roomNeed:[4]},
		],
		system:{},
		add:function(obj,roomT) {
			system=this.systemPrototype;
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