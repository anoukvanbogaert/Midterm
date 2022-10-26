$("document").ready(function () {
  $(".button-thumb").click(function () {
    const value = $(this).siblings(".likes-circle").html();
    let newValue = +value + 1;

    $(this).siblings(".likes-circle").html(newValue);
  });
});
