var WARNING = "warning";
var ERROR = "error";
var SUCCESS = "success";
var $callFrom = $(this);
var elementId = "";
var checkUser = $("#authorizeduser").val();


document.addEventListener('click', function (e) {
   
    var urlvalue = $("#" + e.target.id).data("url");
    var titlevalue = $("#" + e.target.id).data("title");
    if (jQuery.type(urlvalue) !== 'undefined') {
        if (titlevalue == "phase1") {
            urlvalue = $("#hosturl").val() + urlvalue;
        } else
        {
            urlvalue = $("#ftphosturl").val() + urlvalue;
        }
        if (!isSessionActive()) {
            return false;
        } else {
            var cookievalue = getCookie("Cookieval");
            var myWindow = window.open(urlvalue + "?ReadData=" + cookievalue, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=5,left=5,width=400,height=400");
            
        }
    }

});

$(document).ready(function () {

    var jsonresult = "";
    var isauthorized = "";
    var cookievalue = getCookie("Cookieval");

    if (cookievalue != "") {
        var ajaxTime = new Date().getDate()
        var settings = {
            async: true,
            crossDomain: true,
            cache: false,
            dataType: "json",
            url: APIURL + "/HostInvoice/DecryptCookie?CookieValue=" + cookievalue + "&authorizedUser=" + $("#authorizeduser").val(),
            method: "POST",
            contentType: "application/json; charset=utf-8",

        }
        $.ajax(settings)
            .done(function (response) {
                responseTime = new Date().getTime() - ajaxTime;
                jsonresult = response.message;
                isauthorized = response.authorized_Value;

                if (jsonresult == null) {

                    if (checkUser === 'false') {
                        if (isauthorized == "true") {
                            ValidateUser(dummyUserName, dummyPassword, $callFrom);

                        } else {
                            ValidateUser(dummyUserName, dummyPassword, $callFrom);
                        }

                    } else {

                        if (jsonresult.isSuccess != true) {
                            eraseCookie($callFrom);

                        }

                    }
                } else {

                    if (jsonresult.isSuccess != true) {
                        eraseCookie($callFrom);

                    } else {
                        $("#lblusername").text(jsonresult.workstatioN_NAME);
                    }

                }
            })
            .fail(function (xhr, textStatus, errorThrown) {

                responseTime = new Date().getTime() - ajaxTime;
                var errorCode = $.parseJSON(xhr.responseText).Message;

                focusFieldID = $(':focus').attr("id");
                message = $.trim($("#lblErrorMessageE_systemexception").text());
                showMessageDialog(message, focusFieldID, ERROR);
            });

    } else {

        if (checkUser !== 'false') {

            returnval = false;
            window.location.href = '/Login/Login/';

        } else {

            ValidateUser(dummyUserName, dummyPassword, $callFrom);
        }
    }
    readCookie($callFrom);
});

function ValidateUser(username, pass, $callFrom) {
    if ($callFrom) {
        $callFrom.data('requestRunning', true);
    }

    var ajaxTime = new Date().getDate();
    var settings = {
        async: true,
        crossDomain: true,
        cache: false,
        dataType: "json",
        url: APIURL + "/HostInvoice/ValidateLoginUser?username=" + username + "&pass=" + pass + "&authorizedUser=" + $("#authorizeduser").val(),
        method: "POST",
        contentType: "application/json; charset=utf-8",

    }
    $.ajax(settings)
        .done(function (response) {
            responseTime = new Date().getTime() - ajaxTime;

            var jsonLoginData = response.message;
            if (jsonLoginData[0].isSuccess != true) {
                focusFieldID = $(':focus').attr("ErrorLabel");
                message = $("#lblErrorMessageE_LoginUserName").text().trim();
                showMessageDialog(message, focusFieldID, WARNING);

            } else {
                createCookie("Cookieval", jsonLoginData[0].cookieval, 1);


            }

        })
        .fail(function (xhr, textStatus, errorThrown) {
            responseTime = new Date().getTime() - ajaxTime;
            var errorCode = $.parseJSON(xhr.responseText).Message;

            focusFieldID = $(':focus').attr("id");
            message = $.trim($("#lblErrorMessageE_systemexception").text());
            showMessageDialog(message, focusFieldID, ERROR);
        });

}
function showMessageDialog(message, focusFieldID, messageType) {

    $("#dialogMessageIcon img").hide();
    switch (messageType) {
        case WARNING:
            bootbox.alert({
                title: "<div style='color:white'></div>",
                message: "<table width='100%'><tr><td width='70px'><br/> <img src='/Images/warning.png'/ height='50px' width='50px'> </td><td vertical-align='top'>" + message + "</td></tr></table>",
                centerVertical: true,
                callback: function () {
                    if (focusFieldID !== "") {
                        $("#" + focusFieldID).focus();
                    }
                }
            });
            break;
        case ERROR:
            bootbox.alert({
                title: "<div style='color:white'></div>",
                message: "<table width='100%'><tr><td width='70px'><br/> <img src='/Images/error.png'/ height='50px' width='50px'> </td><td vertical-align='top'>" + message + "</td></tr></table>",
                centerVertical: true,
                callback: function () {
                    if (focusFieldID !== "") {
                        $("#" + focusFieldID).focus();
                    }
                }
            });
            break;
        case SUCCESS:
            bootbox.alert({
                title: "<div style='color:white'></div>",
                message: "<table width='100%'><tr><td width='70px'><br/> <img src='/Images/success.png'/ height='50px' width='50px'> </td><td vertical-align='top'>" + message + "</td></tr></table>",
                centerVertical: true,
                callback: function () {
                    if (focusFieldID !== "") {
                        $("#" + focusFieldID).focus();
                    }
                }
            });
            break;
        default:
            break;
    };
}
function createCookie(name, value, days) {
    if (days) {

        var date = new Date();

        date.setTime(date.getTime() + (days * 23 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();

    }
    else var expires = "";

    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function readCookie($callFrom) {
    if (checkUser !== 'false') {

        let cookievalue = getCookie("Cookieval");
        if (cookievalue != "") {
            var ajaxTime = new Date().getDate();
            var settings = {
                async: true,
                crossDomain: true,
                cache: false,
                dataType: "json",
                url: APIURL + "/HostInvoice/CheckUserLastActivity?CookieValue=" + cookievalue + "&authorizedUser=" + $("#authorizeduser").val(),
                method: "POST",
                contentType: "application/json; charset=utf-8",

            }
            $.ajax(settings)
                .done(function (response) {
                    responseTime = new Date().getTime() - ajaxTime;

                    var jsonresult = response.message;
                    if (jsonresult == null) {
                        eraseCookie($callFrom)
                        window.location.href = '/Login/Login/';


                    } else {
                        if (jsonresult.isSuccess != true) {
                            eraseCookie($callFrom)
                            window.location.href = '/Login/Login/';


                        } else {
                            $("#lblusername").text(jsonresult.workstatioN_NAME);

                        }
                    }

                })
                .fail(function (xhr, textStatus, errorThrown) {
                    responseTime = new Date().getTime() - ajaxTime;
                    var errorCode = $.parseJSON(xhr.responseText).Message;

                    focusFieldID = $(':focus').attr("id");
                    message = $.trim($("#lblErrorMessageE_systemexception").text());
                    showMessageDialog(message, focusFieldID, ERROR);
                });

        } else {
            window.location.href = '/Login/Login/';

        }
    }

}
function isSessionActive() {

    var returnval = true;


    let cookievalue = getCookie("Cookieval");
    if (cookievalue != "") {
        var ajaxTime = new Date().getDate();
        var settings = {
            async: false,
            crossDomain: true,
            cache: false,
            dataType: "json",
            url: APIURL + "/HostInvoice/CheckUserLastActivity?CookieValue=" + cookievalue + "&authorizedUser=" + $("#authorizeduser").val(),
            method: "POST",
            contentType: "application/json; charset=utf-8",

        }
        $.ajax(settings)
            .done(function (response) {
                responseTime = new Date().getTime() - ajaxTime;
                var jsonresult = response.message;
                if (jsonresult == null) {
                    if (checkUser === 'false') {
                        returnval = true;
                        ValidateUser(dummyUserName, dummyPassword, $callFrom);

                    } else {
                        returnval = false;
                        eraseCookie($callFrom);

                    }

                } else {
                    if (jsonresult.isSuccess != true) {
                        returnval = false;
                        eraseCookie($callFrom);

                    } else {
                        returnval = true;
                    }
                }

            })
            .fail(function (xhr, textStatus, errorThrown) {
                responseTime = new Date().getTime() - ajaxTime;
                var errorCode = $.parseJSON(xhr.responseText).Message;

                focusFieldID = $(':focus').attr("id");
                message = $.trim($("#lblErrorMessageE_systemexception").text());
                showMessageDialog(message, focusFieldID, ERROR);
            });

    } else {
        if (checkUser !== 'false') {
            returnval = false;
            window.location.href = '/Login/Login/';

        } else {

            ValidateUser(dummyUserName, dummyPassword, $callFrom);
        }

    }
    return returnval;
}

function eraseCookie($callFrom) {

    createCookie("Cookieval", "", -1);
    if (checkUser === 'false') {
    } else {
        window.location.href = '/Login/Login/';

    }
}
$("#btnClose").click(function (event) {

    window.location.href = '/Menu/MenuPage/';

});