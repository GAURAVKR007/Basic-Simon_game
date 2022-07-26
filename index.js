var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(".btn2").hide();
$("html").css("margin-top","0px");

$(".btn-start").on("click",function(){
    if(started===false){
        // $("#level-title").text("Level " + level);
        $(".btn2").hide();
        $(".btn-start").text("Reset");
        nextSequence();
        started = true;
    }else{
        startOver();
        $(".btn-start").text("START");
        $("#level-title").text("Press Any Key to Start");
    }
});

$(".btn2").on("click",function(){
    startOver();
        $(".btn-start").text("START");
        $("#level-title").text("Press Any Key to Start");
        $(".btn2").hide();
});



$(document).keypress(function(event){
    if(started===false){
        $("#level-title").text("Level " + level);
        $(".btn-start").text("Reset");
        nextSequence();
        started = true;
    }
});


$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 
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

    userClickedPattern = [];
    level++;
    
    $("#level-title").text(`Level ${level}`);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        var count = 0;

        for(var i = 0;i<gamePattern.length; i++){
            if(gamePattern[i]===userClickedPattern[i]){
                count++;
            }
        }

        if(count===gamePattern.length){
            console.log("success");

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, (Level : "+(level)+") (Press Any Key to Restart)");
        $(".btn2").show();
        startOver();
    }
    }

    function startOver(){
        level = 0;
        gamePattern = [];
        started = false;
        $(".btn-start").text("PLAY-AGAIN");
      }









