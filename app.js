/*Pseudocode for Flashcard API
	1. Create constructors for basic  and cloze flash cards 
	2. use inquirer-js to determine whether we make new basic cards, new cloze cards or play game.
	3. use conditionals to build objects from constructors based on users choice
	4. functions to call back questions and validate
*/

//Variables for requirements at launch of server application
var fs = require('fs');
var inquire = require('inquirer');
var BasicCard = require('./basic');
var ClozeCard = require('./cloze');

//Variables for flashcard game data
var flashCardArr = [];
var clozeCardArr = [];
var correct = 0;
var incorrect = 0;

//Function to Start application prompts
var pickMode = function() {
    inquire.prompt([{
        name: "start",
        message: "How would you like to proceed?",
        type: "list",
        choices: ["Create Basic Flashcards", "Create Cloze Flashcards", "Take A Basic Quiz", "Take A Cloze Quiz"]
    }]).then(function(answer) {
        var command = answer.start;
        switch (command) {
            case "Create Basic Flashcards":
                // call a function that sets up inquire prompts for creating basic flash card
                createBasicCard();
                break;
            case "Create Cloze Flashcards":
                // call a function that sets up inquire prompts for creating cloze card
                createClozeCard();
                break;
            case "Take A Basic Quiz":
                //Reads the BasicLog.txt and returns Quiz Questions
                basicQuiz(0);
                break;
            case "Take A Cloze Quiz":
                //Reads the Clozelog.txt and returns Quiz Questions
                clozeQuiz(0);
                break;
            default:
                console.log('YOU BROKE MY APP');
        }
    })
}

//Launces application
pickMode();

//Create a Basic Flash Card Front and Back
var createBasicCard = function() {
    inquire.prompt([{
        type: "input",
        name: "front",
        message: "Enter a question for the front of your card"
    }, {
        type: "input",
        name: "back",
        message: "Enter an answer to appear on the back of your card"
    }]).then(function(answer) {
        flashCardArr.push(answer);
        var newBasicCard = new BasicCard(answer.front, answer.back);
        newBasicCard.printInfo();
        //writes to basic log txt file
        fs.writeFile("BasicLog.json", JSON.stringify(flashCardArr));
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
    }]).then(function(answer) {
        if (answer.next != true) {
            pickMode();
        } else {
            createBasicCard();
        }
    })
}

var createClozeCard = function() {
    inquire.prompt([{
        name: "text",
        message: "Enter phrase that you'd like to convert into a cloze card",
        type: "input"
    }, {
        name: "cloze",
        message: "What word do you want to hide",
        type: "input"
    }]).then(function(answer) {
        clozeCardArr.push(answer);
        var newClozeCard = new ClozeCard(answer.text, answer.cloze);
        fs.writeFile("ClozeLog.json", JSON.stringify(clozeCardArr));
        //sets up next question
        return nextClozeCard();
    })

}

//function to create another cloze card
var nextClozeCard = function() {
    inquire.prompt([{
        name: "next",
        message: "Do you want to create another card?",
        type: "confirm",
        default: true
    }]).then(function(answer) {
        if (answer.next != true) {
            pickMode();
        } else {
            createClozeCard();
        }
    })
}

//function to launch basic quiz
var basicQuiz = function(count) {
    fs.readFile('BasicLog.json', 'utf8', function(err, data) {

        var questionData = JSON.parse(data);

      
        if (count < questionData.length) {
            inquire.prompt([{
                name: "question",
                message: questionData[count].front,
                type: "input"
            }]).then(function(answer) {
                if (answer.question.toLowerCase() === questionData[count].back.toLowerCase()) {
                    console.log('Correct');
                    correct++;
                    count++;
                    basicQuiz(count);
                } else {
                    console.log('Incorrect');
                    incorrect++;
                    console.log("The correct answer is: " + questionData[count].back);
                    count++;
                    basicQuiz(count);
                }
            })
        } else {
            showScore();
            pickMode();
        }

    })
}


//function to launch cloze quiz
var clozeQuiz = function(count) {
    fs.readFile('ClozeLog.json', 'utf8', function(err, data) {

        var questionData = JSON.parse(data);



      
        if (count < questionData.length) {

        	 var newClozeCard = new ClozeCard(questionData[count].text, questionData[count].cloze);

            inquire.prompt([{
                name: "question",
                message: newClozeCard.partialText(),
                type: "input"
            }]).then(function(answer) {
                if (answer.question.toLowerCase() === newClozeCard.cloze.toLowerCase()) {
                    console.log('Correct');
                    correct++;
                    count++;
                    clozeQuiz(count);
                } else {
                    console.log('Incorrect');
                    incorrect++;
                    console.log("The correct answer is: " + newClozeCard.text);
                    count++;
                    clozeQuiz(count);
                }
            })
        } else {
            showScore();
            pickMode();
        }

    })
}

//displays the score
var showScore = function() {
    console.log("--------------------");
    console.log('correct: ' + correct);
    console.log('incorrect: ' + incorrect);
    console.log("--------------------");
}
