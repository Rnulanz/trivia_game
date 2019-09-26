var currentQuestion = 0;
var correct = 0;
var wrong = 0;
var time = 15;
var counter;

function nextQuestion(){
    var quizOver = (quizQuestions.length - 1) === currentQuestion;
    if(quizOver){
        console.log('Game is Over');
        answerSheet();
    }else{
    currentQuestion++
    loadQuestions();
    }
}

function timeUp(){
    clearInterval(counter);
    wrong++;
    nextQuestion();
}
function clock(){
    time--;
    $("#countdown").html("Timer: " + time);
    if(time ===0 ){
        timeUp();
    }
}

function loadQuestions(){
    time = 15;
    counter = setInterval(clock, 1000);
    var question = quizQuestions[currentQuestion].questions;
    var choices = quizQuestions[currentQuestion].choices;
    $("#countdown").html("Timer: " + time);
    $('#trivia').html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}

    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

$(document).on("click", ".choice", function(){
    clearInterval(counter);
    var answerSelected = $(this).attr('data-answer')
    var answer = quizQuestions[currentQuestion].correctAnswer;
    if(answerSelected === answer){
        correct++;
        nextQuestion();
    
    }else{
        wrong++;
        nextQuestion();
        
    }
    console.log(answerSelected);
});

function answerSheet(){
    var result = `
        <p>You got ${correct} question(s) right</p>
        <p>You missed ${wrong} question(s) right</p>
        <p>Total ${quizQuestions.length} question(s) right</p>
        <button type="button" class="btn btn-primary btn-lg" id="restart">Restart</button>
    `;

    $("#trivia").html(result)
}


$(document).on('click','#restart', function(){
console.log("Testing")
 currentQuestion = 0;
 correct = 0;
 wrong = 0;
 time = 5;
 counter = null;

 loadQuestions();
})

$("#start").click(function(){
    $("#start").remove();
    $("#countdown").html(time);
    loadQuestions();

});;