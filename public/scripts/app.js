/* eslint-disable no-undef */

$(document).ready(function() {
  $('#updateMessage').hide();

  let total = 0;
  let attempts = 0;
  let numberOfQuestions = $("div[class='card-header']").length;
  let correctAnswer = "correct_answer";


  // selecting the option
  $(".testbutton").click(function() {
    console.log($(this).val());
    $(this).toggleClass("hightlight");
    $(this).siblings().removeClass("hightlight");



    // calculating the score
    if ($(this).val() === correctAnswer) {
      if (total >= 0 && total <= numberOfQuestions) {
        total++;
      } else {
        total--;
      }
    }
  });

  //checking if selected option is correct

  $("#quizSubmit").submit(function(event) {
    event.preventDefault();
    $(".testbutton").prop("disabled", true);
    const highlighted = $(".testbutton.hightlight");
    let answersObject = [];
    for (let i = 0; i < highlighted.length; i++) {
      answersObject.push(highlighted[i].value);
    }
    console.log(answersObject);

    $.post("/results", {answers: answersObject}).then((data) => {
      console.log(data);
    });

    attempts++;

    if (total === numberOfQuestions) {
      $(".testbutton").css("color", "black");
      $("#score").append(`<div>
      <p>Attempts : ${attempts}</p>
      <h1 class="green">YOU'RE ON FIRE!🔥 </h1>
      <h2>${total}/${numberOfQuestions} </h2>
      <button class='backhHome'><a href="/quizzes/myquizzes">Back to My Quizzes</a></button>
      </div>`);
      total = 0;
      alert("Congrats! You got them all right!");
    } else if (total < numberOfQuestions) {
      $("#score").append(`<div>
      <button class='backhHome'><a href="/quizzes/myquizzes">Back to My Quizzes</a></button>
      </div>`);
    }
  });

  //   $tweetForm.submit(function(event) {
  // event.preventDefault();

  const $updateButton = $("#update-button");

  $updateButton.submit(function(event) {
    event.preventDefault();

    $("#updateMessage").slideDown(2000, function() {
      $("#updateMessage").slideUp(4000);
    });
    return;
  });
});
