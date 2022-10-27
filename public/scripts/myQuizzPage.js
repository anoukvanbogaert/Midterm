$("document").ready(function () {
  $(".button-thumb").click(function () {
    let element = $(this).siblings(".likes-circle");
    const value = element.html();
    let newValue = +value + 1;
    element.html(newValue);
  });
});
