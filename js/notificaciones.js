
var pushNotification;

$(document).ready(function() {
    try {
        // are we running in native app or in a browser?
        window.isphone = false;
        if (document.URL.indexOf("http://") === -1
                && document.URL.indexOf("https://") === -1) {
            window.isphone = true;
        }
        onDeviceReadyPush();
//    if (window.isphone) {
//        document.addEventListener("deviceready", onDeviceReadyPush, false);
//    } else {
//        onDeviceReadyPush();
//    }
    } catch (e) {
    }
});

function onDeviceReadyPush() {
    try {
        //alert("ondev");
        pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(
                    successHandler,
                    errorHandler, {
                "senderID": "replace_with_sender_id",
                "ecb": "onNotificationGCM"
            });
        } else {
             pushNotification.register(
             tokenHandler,
             errorHandler, {
             "badge": "true",
             "sound": "true",
             "alert": "true",
             "ecb": "onNotificationAPN"
             });
//            pushNotification.registerDevice({alert: true, badge: true, sound: true, appname: "com.fiveflamesmobile.kurbana", pw_appid: "com.fiveflamesmobile.kurbana"},
//            function(status) {
//                var pushToken = status;
//                showStatusMsg('push token: ' + JSON.stringify(pushToken));
//            },
//                    function(status) {
//                        showStatusMsg(JSON.stringify(['failed to register', status]));
//                    });
        }
    } catch (e) {
        //alert(e)
    }
}
document.addEventListener('push-notification', function(event) {
    var notification = event.notification;
    pushNotification.setApplicationIconBadgeNumber(0);
    var title = notification.title;
    var userData = notification.userdata;
    navigator.notification.alert(notification.aps.alert);

    if (typeof(userData) != "undefined") {
        showStatusMsg('user data: ' + JSON.stringify(userData));
    }
});




function successHandler(result) {
//    alert('result = ' + result);
}
function errorHandler(error) {
//    alert('error = ' + error);
}
/*Solo ios*/
function tokenHandler(result) {
//    alert('device token = ' + result);
}


// iOS
function onNotificationAPN(event) {
    if (event.alert)
    {
//        alert(event.alert)
        navigator.notification.alert(event.alert);
    }

    if (event.sound)
    {
        var snd = new Media(event.sound);
        snd.play();
    }

    if (event.badge)
    {
        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }
}

// Android
function onNotificationGCM(e) {
    $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

    switch (e.event)
    {
        case 'registered':
            if (e.regid.length > 0)
            {
                $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
               // console.log("regID = " + e.regid);
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
                $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                // if the notification contains a soundname, play it.
                var my_media = new Media("/android_asset/www/" + e.soundname);
                my_media.play();
            }
            else
            {  // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                {
                    $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                }
                else
                {
                    $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }
            }

            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            break;

        case 'error':
            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}

