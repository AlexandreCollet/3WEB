function Product(name,description,price){

	this.name        = name;
	this.description = description;
	this.price       = price;

}

Product.prototype.myFunction = function() {
    console.log(this.name);
}
