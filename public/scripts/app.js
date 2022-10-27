/* eslint-disable no-undef */

$(document).ready(function () {
  $("#updateMessage").hide();

  let total = 0;
  let attempts = 0;
  let numberOfQuestions = $("div[class='card-header']").length;
  let correctAnswer = "correct_answer";

  // selecting the option
  $(".testbutton").click(function () {
    console.log($(this).val());
    $(this).toggleClass("hightlight");
    $(this).siblings().removeClass("hightlight");
  });

  //checking if selected option is correct

  $("#quizSubmit").submit(function (event) {
    event.preventDefault();
    $(".testbutton").prop("disabled", true);
    const highlighted = $(".testbutton.hightlight");
    let answersObject = [];
    for (let i = 0; i < highlighted.length; i++) {
      answersObject.push(highlighted[i].value);
    }
    console.log(answersObject);

    $.post("/results", { answers: answersObject }).then((data) => {
      console.log(data);
    });
  });

  //   $tweetForm.submit(function(event) {
  // event.preventDefault();

  const $updateButton = $("#update-button");

  $updateButton.submit(function (event) {
    event.preventDefault();

    $("#updateMessage").slideDown(2000, function () {
      $("#updateMessage").slideUp(4000);
    });
    return;
  });
});
