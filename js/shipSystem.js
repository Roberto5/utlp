class shipSystem { //@todo control
    type = 0; //type of system
    //name = "";//??
    liv = 1; // level
    _energy = 0; // actual energy consumption
    get energy() {
        return this._energy;
    }
    set energy(value) {
        if (value >= 0 && value <= this.maxEnergy) this._energy = value;
    }
    energyForLiv = 0; // consumption for every liv
    get maxEnergy() {
        return this.liv * this.energyForLiv;
    }
    roomNeed = [];
    bars = 0; // for reactor
    max = 0;
    rate = 0;
    systemName = ['void', 'controll', 'reactor', 'shield', 'engine', 'weapon', 'medic', 'teleport', 'sensor', 'drone', 'sensor', 'defence'];
    /**
     * 
     * @param {number} type 
     */
    constructor(type) {
        if (type<=0 || type>=this.systemName.length) type = 0;
        this.type = type;
    }
    /**
     * 
     * @returns {shipSystem}
     */
    create() {
        switch (this.type) {
            case 1:
                return new controll();
                break;
            case 2:
                return new reactor();
                break;
            case 3:
                return new shield();
                break;
            case 4:
                return new engine();
                break;
            case 5:
                return new weapon();
                break;
            case 6:
                return new medic();
                break;
            case 7:
                return new teleport();
                break;
            case 8:
                return new sensor();
                break;
            case 9:
                return new drone();
                break;
            case 10:
                return new defence();
                break;
            default:
                return this;

        }
    }
}
class reactor extends shipSystem {
    energyForLiv = 10;// @todo da definire
    type = 2;
}
class shield extends shipSystem {
    type = 3;
    energyForLiv = 2;// @todo da definire
    _shield = 0;
    get shield() {
        return this._shield;
    }
    set shield(value) {
        if (value >= 0 && value <= this.maxShield) this._shield = value;
    }
    shieldforLiv = 10;
    get maxShield() {
        return this.liv * this.shieldforLiv;
    }
}
class controll extends shipSystem {
    // @todo da definire
    type = 1;
    size=1;
}
class engine extends shipSystem {
    type = 4;
    size=1;
}