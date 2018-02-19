$(".click_reveal > span:first").bind("click", function() {
    $(this).parent().children("div").show();
    $(this).remove();
});