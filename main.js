//数据管理
var dm= {
	setData: function(name, data) {
		var parseData=JSON.stringify(data);
		localStorage.setItem(name, parseData);
	},
	getData: function (name) {
		var localData = localStorage.getItem(name);
		return JSON.parse(localData);
	},
	getEvents:function() {
		return this.getData("events");
	},
	setEvent: function(data) {
		this.setData("events",data);
	},
	saveEvents:function() {
		this.setEvents(events);
	},
	addEvent:function(time, what){
		events[time]={"message":what};
	}
};

var notificationId = 'alarm';
var interval = 30000;

var def_events = {
    '12:00' : {
        'message': 'lunch time',
    },
    '23:30' : {
        'message': 'bed time',
    },
}

//TODO create setting UI
var events = dm.getEvents();
if( !events ){ 
	events=def_events;
	dm.setData("events", def_events); 
}

var notify = function(message) {
    var option = {
        type: 'basic',
        title: 'Simple Alarm',
        message: message,
        iconUrl: 'bell.png', // icon image from Glyphish 3 http://www.glyphish.com
    }
    chrome.notifications.create(notificationId, option, function(notificationId) {
        //callback. nothing to do.
    });
};

var getEvent = function(hh, mm) {
    return events[hh + ':' + mm];
};

var startTimer = function() {
    setInterval(function() {
        var now = new Date();
        var targetEvent = getEvent(now.getHours(), now.getMinutes());
        if (targetEvent) {
            notify(targetEvent.message);
        }
    }, interval);
};

var main = function() {
    startTimer();
};

main();
