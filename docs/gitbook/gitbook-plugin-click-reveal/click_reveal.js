$(".click_reveal > span").bind("click", function() {
    $(this).parent().children("div").show();
    $(this).remove();
});