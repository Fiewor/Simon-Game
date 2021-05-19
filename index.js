let userClickedPattern = [];
/* add the contents of the userChosenColour variable(i.e the id of buttons that were clicked)
to the end of the userClicked pattern array */
userClickedPattern.push(userChosenColour);

/* the gamePattern empty array will be updated with (randomly selected)
colours from the randomChosenColour */
let gamePattern = [];
gamePattern.push(randomChosenColour);

// this array contains the colours of the buttons
let buttonColours = ["red", "blue", "green", "yellow"];

/* randomChosenColours uses the random number to select a random colour
from the buttonColours array using bracket notation method of accessing array elements */
let randomChosenColour = buttonColours[randomNumber];

/* use jQuery to select the button with the same id as randomChosenColour */
let randomButton = $("button").attr("#randomChosenColour");

// add flash animation
randomButton.fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
//randomButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
/*
$(document).ready(() => { 
	setInterval(() => { 
		$('p').fadeIn(); 
		$('p').fadeOut(); 
	}, 500); 
}); 
*/

// the next sequence function generates a random whole number between 0 and 3
function nextSequence() {
// this randomly generated number is then stored in the variable - randomNumber
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    playSound(randomChosenColour);
    // update the level after first increasing it by 1
    level++;
    // change the h1 text to reflect the new level
    $("h1").text("Level" + level);    
}

function playSound(name) {
    // play sound for random colour selected by randomChosenC0lour
    let audio = new Audio(sounds/name.mp3);
    audio.play();
}

// detect when a button is clicked within the document
$("button").on("click", function() {
    // store the id of the button that got clicked in the userChosenColour variable
    let userChosenColour = this.attr("id");
    // play sound using the playSound function and taking the userChosenColour as the parameter
    playSound(userChosenColour);
});
/* trying to call checkAnswer after a user has clicked and chosen their answer,
passing in the index of the last answer in the user's sequence*/ 
checkAnswer(indexOfLastAnswer);

// function to add a presssed class to button clicked inside the function(?) and remove it after 100 milliseconds
function animatePress(currentColour) {
    $("button").addClass("pressed");
    // using the setTimeout to remove the class after 100 milliseconds
    setTimeout(function() {
        $("button").removeClass("pressed");
    }, 100);
}

// detecting when a keyboard key has been pressed
let started = true;
$(document).keypress(function() {
    if (started) {
        nextSequence();
        started = false;
    } else {

    }
    let level = 0;
    $("h1").text("Level" + level);
});

/* 
$(document).one("keypress", function() {
    nextSequence();
})
*/

function checkAnswer(currentLevel) {
    if (userAnswer == gamePattern) {
        console.log("success");
    }else {
        console.log("wrong");
    }
}

let indexOfLastAnswer = checkAnswer.slice(-1);