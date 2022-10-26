/* eslint-disable no-undef */

$(document).ready(function() {
  $('#updateMessage').hide();

  let total = 0;
  let attempts = 0;
  let numberOfQuestions = $("div[class='card-header']").length;
  let correctAwnser = "DOG";

  $(".testbutton").click(function() {
    $(this).toggleClass("hightlight");
    $(this).siblings().removeClass("hightlight");

    // console.log(total);

    if ($(this).val() === correctAwnser) {
      if (total >= 0 && total <= numberOfQuestions) {
        total++;
      } else {
        total--;
      }
    }
  });
  $("#quizSubmit").submit(function(event) {
    event.preventDefault();
    $(".testbutton").prop("disabled", true);
    const highlighted = $("body .highlight");
    console.log(highlighted);

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
      console.log($(".testbutton").hasClass("hightlight").length);

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
