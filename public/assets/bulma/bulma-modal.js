$(".modal-button").click(function() {
    var target = $(this).data("target");
    $("html").addClass("is-clipped");
    $(target).addClass("is-active");
 });
 $(".bulma-close").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().parent().parent().removeClass("is-active");
 });
 $(".modal-background").click(function() {
    $("html").removeClass("is-clipped");
    $(this).parent().removeClass("is-active");
 });