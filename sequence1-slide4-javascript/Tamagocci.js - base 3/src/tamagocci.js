/**
* TAMAGOCCI
*/

var Tamagocci = function(){

	this.minWeight = 1;
	this.maxWeight = 10;
	this.age       = 0;
	this.happiness = 5;

	var __weight    = 5;
	var __happiness = 5

	var __isDead = false;

	Object.defineProperties(this,{

		'weight' : {
			get : function(){ return __weight; },
			set : function(newValue){
				__weight = newValue;
				if(__weight < this.minWeight || __weight > this.maxWeight){
					this.isDead = true;
				}
			}
		},

		'happiness' : {
			get : function(){ return __happiness; },
			set : function(newValue){
				__happiness = newValue;
				if(!__happiness){
					this.isDead = true;
				}
			}
		},

		'isDead' : {
			get : function(){ return __isDead; },
			set : function(newValue){
				__isDead = newValue;
				if(__isDead){
					this.ondie();
				}
			}
		}


	});

}

Tamagocci.prototype.eat = function() {
	this.weight +=2;
};

Tamagocci.prototype.play = function() {
	this.weight--;
	this.happiness++;
};

Tamagocci.prototype.becomeOlder = function() {
	this.age++;
	this.minWeight++;
	this.maxWeight++;
	this.happiness--;
};

Tamagocci.prototype.ondie = function(){}

Tamagocci.prototype.getPicture = function(){

	var pictures = {
		'good': 'pk_good.gif',
		'bad': 'pk_bad.gif',
		'dead': 'pk_dead.gif',
	};

	if(this.isDead){
		return pictures.dead;
	}
	else if(this.weight < this.minWeight+3 || this.weight > this.maxWeight-3 || this.happiness < 3){
		return pictures.bad;
	}

	return pictures.good;
}

/**
* PIKACHU EXTEND TAMAGOCCI
*/

var Pikachu = function(){
	Tamagocci.apply(this);
}

Pikachu.prototype = Object.create(Tamagocci.prototype);

/**
* HELLOKITTY EXTEND TAMAGOCCI
*/

var HelloKitty = function(){
	Tamagocci.apply(this);
}

HelloKitty.prototype = Object.create(Tamagocci.prototype);

HelloKitty.prototype.getPicture = function(){

	var pictures = {
		'good': 'hk_good.gif',
		'bad': 'hk_bad.gif',
		'dead': 'hk_dead.png',
	};

	if(this.isDead){
		return pictures.dead;
	}
	else if(this.weight < this.minWeight+3 || this.weight > this.maxWeight-3 || this.happiness < 3){
		return pictures.bad;
	}

	return pictures.good;
}
