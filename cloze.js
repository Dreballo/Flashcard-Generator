var fs = require('fs');

var ClozeCard = function (text, cloze){
	this.text = text; 
	this.cloze = cloze;
}

ClozeCard.prototype.printInfo = function (){
	console.log("---------------------");
	console.log('Text :' + this.text + "\nCloze: " + this.cloze);
	console.log("---------------------");

}

ClozeCard.prototype.fullText = function() {
	console.log("full text: " + this.cloze + this.text);
}

module.exports = ClozeCard; 