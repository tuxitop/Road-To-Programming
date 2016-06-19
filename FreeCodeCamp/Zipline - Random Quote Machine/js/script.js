var quotes = [
    {
        text: "When Life Gives You Questions, Google has Answers.",
        author: "AJ Carpio"
    },
    {
        text: "If at first you don't succeed; call it version 1.0",
        author: "T-Shirt"
    },
    {
        text: "There are 10 types of people in the world: those who understand binary, and those who don't.",
        author: "Unknown"
    },
    {
        text: "I'm not anti-social; I'm just not user friendly",
        author: "T-Shirt"
    },
    {
        text: "The glass is neither half-full nor half-empty: it's twice as big as it needs to be.",
        author: "Unknown"
    },
    {
        text: "I would love to change the world, but they won't give me the source code",
        author: "Unknown"
    },
    {
        text: "A Life? Cool! Where can I download one of those?",
        author: "Unknown"
    },
    {
        text: "Windows has detected you do not have a keyboard. Press 'F9' to continue.",
        author: "Unknown"
    },
    {
        text: "People say that if you play Microsoft CD's backwards, you hear satanic things, but that's nothing, because if you play them forwards, they install Windows.",
        author: "Unknown"
    },
    {
        text: "In a world without fences and walls, who needs Gates and Windows?",
        author: "Unknown"
    },
    {
        text: "Concept: On the keyboard of life, always keep one finger on the escape button.",
        author: "Unknown"
    },
    {
        text: "If I’m not back in five minutes, just wait longer.",
        author: "Ace ventura, Pet Detective"
    }
];

var randomSelect = function(array){
    var max = array.length;
    var randomIdx = Math.floor(Math.random() * max);
    return array[randomIdx];
};

var setRandomQuote = function(){
    var quote = randomSelect(quotes);
    var twitterLink = "https://twitter.com/intent/tweet?text=" + encodeURI(quote.text) + "&url=" + encodeURI(window.location);
    $('.quote-text').text(quote.text);
    $('.quote-author').text("- " + quote.author);
    $('a#tweet-btn').attr("href", twitterLink);
};

$(document).ready(function(){
    setRandomQuote();
    $("button[name='quote']").click(function(){
        setRandomQuote();
    });
});
