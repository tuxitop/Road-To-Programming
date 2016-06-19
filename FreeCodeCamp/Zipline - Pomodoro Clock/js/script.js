var Pomodoro = function() {

    // set lengths in seconds
    this.timerState = null;

    this.resetSettings = function() {
        this.breakLength = $("#break-length").text() * 60;
        this.sessionLength = $("#session-length").text() * 60;
    };
    this.resetSettings();

    /**
     * updates time length for the specified type.
     * @param  {number} amount amount of time in seconds to update
     * @param  {string} type   either break or session, default is session.
     */
    this.updateLength = function(amount, type) {
        if (type == "break") {
            if (this.breakLength + amount >= 0 && this.breakLength + amount < 5941) {
                this.breakLength += amount;
            }
        }
        else {
            if (this.sessionLength + amount >= 0 && this.sessionLength + amount < 5941) {
                this.sessionLength += amount;
            }
        }
    };

    /**
     * get remaining time of break or session
     * @param  {string} type either "break" or "session"
     */
    this.getRemainingTimeString = function(type) {
        if (type === "break") {
            return this.getTimeString(this.breakLength);
        }
        return this.getTimeString(this.sessionLength);
    };

    this.getMin = function(type){
        if (type == "break") {
            return Math.floor(this.breakLength / 60);
        }
        return Math.floor(this.sessionLength / 60);
    };

    this.getTimeString = function(timeInSeconds) {
        var minutes = String(Math.floor(timeInSeconds / 60));
        var seconds = String(timeInSeconds % 60);
        if (minutes.length == 1) {
            minutes = "0" + minutes;
        }
        if (seconds.length == 1) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    };

    this.getRemainingPercent = function(type) {
        if (type == "session") {
            var sessionSet = $("#session-length").text() * 60;
            percent = 100 - (this.sessionLength * 100 / sessionSet);
            return percent + "%";
        }
        if (type == "break") {
            var breakSet = $("#break-length").text() * 60;
            percent = this.breakLength * 100 / breakSet;
            return percent + "%";
        }
    };
};


$(document).ready(function() {
    var timer;
    var pomodoroObj = new Pomodoro();
    $("#break-minus").click(function(){
        if (!pomodoroObj.timerState) {
            pomodoroObj.updateLength(-60, "break");
            $("#break-length").text(pomodoroObj.getMin("break"));
        }
    });
    $("#break-plus").click(function(){
        if (!pomodoroObj.timerState) {
            pomodoroObj.updateLength(60, "break");
            $("#break-length").text(pomodoroObj.getMin("break"));
        }
    });
    $("#session-minus").click(function(){
        if (!pomodoroObj.timerState) {
            pomodoroObj.updateLength(-60);
            $("#session-length").text(pomodoroObj.getMin());
            $(".time").text(pomodoroObj.getRemainingTimeString());
        }
    });
    $("#session-plus").click(function(){
        if (!pomodoroObj.timerState) {
            pomodoroObj.updateLength(60);
            $("#session-length").text(pomodoroObj.getMin());
            $(".time").text(pomodoroObj.getRemainingTimeString());
        }
    });

    $(".start").click(function(){
        clearTimeout(timer);
        pomodoroObj.timerState = "session";
        timer = setInterval(function() {
            var time;
            if (pomodoroObj.timerState == "session") {
                pomodoroObj.updateLength(-1);
                time = pomodoroObj.getRemainingTimeString();
                $(".time").text(time);
                $(".bar > .fill").css("width", pomodoroObj.getRemainingPercent("session"));
                if (time == "00:00") {
                    pomodoroObj.timerState = "break";
                    pomodoroObj.resetSettings();
                }
            }
            if (pomodoroObj.timerState == "break") {
                pomodoroObj.updateLength(-1,"break");
                time = pomodoroObj.getRemainingTimeString("break");
                $(".time").text(time);
                $(".bar > .fill").css("width", pomodoroObj.getRemainingPercent("break"));
                if (time == "00:00") {
                    pomodoroObj.timerState = "session";
                    pomodoroObj.resetSettings();
                }
            }
        }, 1000);
    });

    $(".reset").click(function() {
        clearTimeout(timer);
        pomodoroObj.resetSettings();
        pomodoroObj.timerState = null;
        $('.time').text(pomodoroObj.getRemainingTimeString());
    });
});
