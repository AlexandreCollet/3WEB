/**
* TAMAGOCCI
*/

var Tamagocci = function(){

	this.weight    = 5;
	this.minWeight = 1;
	this.maxWeight = 10;
	this.age       = 0;
	this.happiness = 5;

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

Tamagocci.prototype.isDead = function(){
	return this.weight < this.minWeight || this.weight > this.maxWeight || this.happiness === 0;
}

Tamagocci.prototype.getPicture = function(){

	var pictures = {
		'good': 'pk_good.gif',
		'bad': 'pk_bad.gif',
		'dead': 'pk_dead.gif',
	};

	if(this.isDead()){
		return pictures.dead;
	}
	else if(this.weight < this.minWeight+3 || this.weight > this.maxWeight-3 || this.happiness < 3){
		return pictures.bad;
	}

	return pictures.good;
}
