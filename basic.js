var fs = require('fs');

var BasicCard = function (front, back) {
	this.front = front;
	this.back = back;
}

BasicCard.prototype.printInfo = function (){
	console.log("---------------------");
	console.log("Question: " + this.front);
	console.log("Answer: " + this.back);
	console.log("---------------------");

}

module.exports = BasicCard; 

