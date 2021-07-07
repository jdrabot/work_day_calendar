var currentTime = moment();
var currentDate = moment().format("MMMM Do, YYYY, h:mm a");
var schedule = {};
$("#currentDay").text(currentDate);

//Create an event for the saveBtn

$('.saveBtn').on('click', function () {

    var text = $(this).siblings(".col-8").val()
    var time = $(this).parent().attr(".time-block")

    schedule[time] = text;
    var schedString = JSON.stringify(schedule);
    localStorage.setItem('schedule', schedString)
});

var storageSchedule = localStorage.getItem('schedule');

if (storageSchedule) {
    schedule = JSON.parse(storageSchedule);
}
else {
    for (let i = 0; i <= 16; i++) {
        schedule[i] = ''
        console.log("Local storage is empty.")
    }
};

for (var key in schedule) {
    console.log(key, schedule[key])

    if (moment(key, 'H').isBefore(currentTime, 'hour')) {
        $("[data-time=" + key + "]")
            .find('.col-8')
            .val(schedule[key])
            .addClass("past");
    }
    else if (moment(key, 'H').isAfter(currentTime, 'hour')) {
        $("[data-time=" + key + "]")
            .find('.col-8')
            .val(schedule[key])
            .addClass("future");
    }
    else if (moment(key, 'H').isSame(currentTime, 'hour')) {
        $("[data-time=" + key + "]")
            .find('.col-8')
            .val(schedule[key])
            .addClass("present")
    }
}