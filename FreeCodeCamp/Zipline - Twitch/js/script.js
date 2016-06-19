channels = ["freecodecamp", "storbeck",
    "terakilobyte", "habathcx",
    "RobotCaleb", "ESL_SC2",
    "thomasballinger", "comster404",
    "noobs2ninjas", "beohoff",
    "OgamingSC2"
];

var channelAddToPage = function(channel) {
    channelHTML = "<div class='row channel channel-" + channel.status + "'>" +
        "<div class='channel-title h3 col-md-3 col-md-offset-2 col-xs-12'><a href='" + channel.url + "'>" +
        channel.name + "</a></div>" +
        "<div class='channel-details col-md-5 col-xs-12'>" +
        channel.details + "</div>" +
        "</div>";

    // Add each channnel according to its status.
    $("." + channel.status + "-channels").append(channelHTML);
};

$(document).ready(function() {
    channels.forEach(function(val) {
        jsonpURL = 'https://api.twitch.tv/kraken/streams/' +
            val + '?callback=?';
        var channel = {
            name: val,
            url: "https://secure.twitch.tv/" + val
        };
        $.getJSON(jsonpURL, function(jsonp) {
            if (jsonp.stream) {
                channel.status = "online";
                channel.details = jsonp.stream.game + ": " +
                    jsonp.stream.channel.status;
                // channel.logo is not part of user stories //
            } else {
                if (jsonp.status === 422) {
                    channel.status = "closed";
                    channel.details = "Account Closed";
                } else {
                    channel.status = "offline";
                    channel.details = "Channel Offline";
                }
            }

            //Add each channel to page.
            channelAddToPage(channel);
        }); // $.getJSON
    }); //channel.forEach

    $("#view-online").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(".channel-offline, .channel-closed").addClass('hidden');
        $(".channel-online").removeClass('hidden');
    });

    $("#view-offline").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(".channel-online").addClass('hidden');
        $(".channel-offline, .channel-closed").removeClass('hidden');
    });

    $("#view-all").on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $(".channel-offline, .channel-closed, .channel-online").removeClass('hidden');
    });
}); // document.ready
