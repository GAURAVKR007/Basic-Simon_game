var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(event){
    if(started===false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
 
 });;

function playSound(name){
    var play1 = new Audio('sounds/'+name+'.mp3');
    play1.play();
}

function animatePress(currentColour){
    var activeButton = $("."+currentColour);
    $("."+currentColour).addClass("pressed");

    setTimeout(function(){
        activeButton.removeClass("pressed");
    },100);

}



function nextSequence(){

    level++;
    $("#level-title").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);



    

}








