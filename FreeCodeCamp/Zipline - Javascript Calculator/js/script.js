var store = 0;

var updateScreen = function(text, update) {
    text = String(text);
    if (!update) {
        $('.screen-text').text(text.slice(0,12));
    }
    else {
        var current_text = $('.screen-text').text();
        if (current_text.length < 12) {
            $('.screen-text').text(current_text + text);
        }
    }
};

var calculate = function(command, number) {
    switch (command) {
        case "+":
            store = store + number;
            break;
        case "-":
            store = store - number;
            break;
        case "÷":
            store = store / number;
            break;
        case "×":
            store = store * number;
            break;
        default:
            store = number;
    }
    updateScreen(store);
};

$(document).ready(function(){
    var update = true;
    var command = "";
    $('.clear').click(function(){
        updateScreen("");
        store = 0;
        command = "";
    });
    $('.number').click(function(){
        var number = $(this).text();
        updateScreen(number, update);
        update = true;
    });
    $('.sqrt').click(function() {
        var screen = $('.screen-text').text();
        updateScreen(Math.sqrt(screen));
    });
    $(".command").click(function() {
        number = Number($('.screen-text').text());
        calculate(command, number);
        command = $(this).text();
        update = false;
    });
});
