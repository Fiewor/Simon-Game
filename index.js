let userClickedPattern = [];

/* the gamePattern empty array will be updated with (randomly selected)
colours from the randomChosenColour */
let gamePattern = [];

// this array contains the colours of the buttons
let buttonColours = ["red", "blue", "green", "yellow"];

/* use jQuery to select the button with the same id as randomChosenColour */
let randomButton = $("button").attr("#randomChosenColour");

let started = false;
let level = 0;

// add flash animation
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
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + level);    
    // this randomly generated number is then stored in the variable - randomNumber
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    /* randomChosenColours uses the random number to select a random colour
    from the buttonColours array using bracket notation method of accessing array elements */
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });
    playSound(randomChosenColour);
    // update the level after first increasing it by 1
    // change the h1 text to reflect the new level
}

function playSound(name) {
    // play sound for random colour selected by randomChosenC0lour
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// detect when a button is clicked within the document
$(".btn").click(function() {
    // store the id of the button that got clicked in the userChosenColour variable
    let userChosenColour = this.attr("id");
    /* add the contents of the userChosenColour variable(i.e the id of buttons that were clicked)
    to the end of the userClicked pattern array */
    userClickedPattern.push(userChosenColour);
    // play sound using the playSound function and taking the userChosenColour as the parameter
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    /* trying to call checkAnswer after a user has clicked and chosen their answer,
    passing in the index of the last answer in the user's sequence*/ 
    checkAnswer(userClickedPattern.length-1);
});

// function to add a presssed class to button clicked inside the function(?) and remove it after 100 milliseconds
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    // using the setTimeout to remove the class after 100 milliseconds
    setTimeout(function() {
        $("button").removeClass("pressed");
    }, 100);
}

// detecting when a keyboard key has been pressed
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    } 
});

/* 
$(document).one("keypress", function() {
    nextSequence();
})
*/

function checkAnswer(currentLevel) {
    // trying to check if the most recent user answer is the same as the game pattern.
    if (userClickedPattern == gamePattern[currentLevel]) {
        nextSequence.delay(1000);
    } else {
        playSound(wrong);
        // add "game-over" class to the body of the website when the user gets one of the answers wrong
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // remove the added class after 200 milliseconds
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
userClickedPattern = [];

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}