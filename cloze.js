var fs = require('fs');

var ClozeCard = function (text, cloze){
	this.text = text; 
	this.cloze = cloze;
}

//add a method for get parialText
ClozeCard.prototype.partialText = function () {

	var clozeText = this.cloze;
	return this.text.replace(clozeText, '...');

}

module.exports = ClozeCard; 
