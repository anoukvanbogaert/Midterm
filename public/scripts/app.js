/* eslint-disable no-undef */

$(document).ready(function() {
  $("#updateMessage").hide();

  let total = 0;
  let attempts = 0;
  let numberOfQuestions = $("div[class='card-header']").length;
  let correctAnswer = "correct_answer";

  // selecting the option
  $(".testbutton").click(function() {
    $(this).toggleClass("hightlight");
    $(this).siblings().removeClass("hightlight");
  });

  //checking if selected option is correct

  $("#quizSubmit").submit(function(event) {
    event.preventDefault();
    $(".testbutton").prop("disabled", true);
    const highlighted = $(".testbutton.hightlight");
    let answersObject = [];
    for (let i = 0; i < highlighted.length; i++) {
      answersObject.push(highlighted[i].value);
      console.log(highlighted[i].value);
    }

    $.post("/results", {answers: answersObject}).then((data) => {
      window.location.href = `http://localhost:8080/results/${data}`;
    });
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
