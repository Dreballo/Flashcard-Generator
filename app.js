/*Pseudocode for Flashcard API
	1. Create constructors for basic  and cloze flash cards 
	2. use inquirer-js to determine whether we make new basic cards, new cloze cards or play game.
	3. use conditionals to build objects from constructors based on users choice
	4. 
*/


var fs = require('fs');
var inquire = require('inquirer');
var BasicCard = require('./basic');
var ClozeCard = require('./cloze');



//Start of the application
inquire.prompt([

    {
        name: "start",
        message: "How would you like to proceed?",
        type: "list",
        choices: ["Create Basic Flashcards", "Create Cloze Flashcards", "Take A Basic Quiz", "Take A Cloze Quiz"]
    }


]).then(function(answer) {

	console.log(answer.start);

    var command = answer.start;

    switch (command) {
        case "Create Basic Flashcards":
            // call a function that sets up inquire prompts for creating basic flash card
            createBasicCard();
            break;
        case "Create Cloze Flashcards":
            // call a function that sets up inquire prompts for creating a cloze card
            break;
        case "Take A Basic Quiz":
            //Reads the BasicLog.txt and returns Quiz Questions
            break;
        case "Take A Cloze Quiz":
            //Reads the Clozelog.txt and returns Quiz Questions
            break;
        default:
            console.log('YOU BROKE MY APP');
    }


})


var createBasicCard = function () {
	inquire.prompt([
			{
				type: "input",
				name: "front",
				message: "Enter a question for the front of your card"
			}, {
				type: "input",
				name: "back",
				message: "Enter an answer to appear on the back of your card"
			}
		]).then(function(answer){
			var newBasicCard = new BasicCard(answer.front, answer.back);
			newBasicCard.printInfo();
			//writes to basic log txt file
			fs.appendFile("BasicLog.txt", JSON.stringify(newBasicCard) + '\n');

			//sets up next question
			return nextBasicCard();
		})

}




//Launches Inquirer for next card
var nextBasicCard = function() {
        inquire.prompt([{
                name: "next",
                message: "Do you want to create another card?",
                type: "confirm",
                default: true
            }

        ]).then(function(answer) {

            if (answer.next != true) {

                console.log('Good game! See ya next time');
            } else {

                inquire.prompt([{
                    type: "input",
                    name: "front",
                    message: "Type a question for the front of the card"

                }, {
                    type: "input",
                    name: "back",
                    message: "Type an answer for the back of the card"
                }]).then(function(answer) {
                    var nextBasicCard = new BasicCard(answer.front, answer.back);
                    nextBasicCard.printInfo();
                    // adds next card to basic log txt file
                    fs.appendFile("BasicLog.txt", JSON.stringify(nextBasicCard) + "\n");
                })

            }

        })
    }

