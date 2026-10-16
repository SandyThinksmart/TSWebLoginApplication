var WARNING = "warning";
var ERROR = "error";
var SUCCESS = "success";
var $callFrom = $(this);
var checkUser = $("#authorizeduser").val();

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
            url: APIURL + "/Menu/ValidateLoginUser?username=" + username + "&pass=" + pass + "&authorizedUser=" + $("#authorizeduser").val(),
            method: "POST",
            contentType: "application/json; charset=utf-8",
           
        }
        $.ajax(settings)
            .done(function (response) {
                responseTime = new Date().getTime() - ajaxTime;

                var jsonLoginData = response.message;
                debugger;
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
        //var hour = date.getHours();
        //var minutes = date.getMinutes();
        //var newDate = date.setTime(date.getTime());

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
function checkLastActivity() {
    
    var returnval = true;
    let cookievalue = getCookie("Cookieval");
    if (cookievalue != "") {
        var ajaxTime = new Date().getDate();
        $callFrom.data('requestRunning', true);
        var settings = {
            async: false,
            crossDomain: true,
            cache: false,
            dataType: "json",
            url: APIURL + "/Menu/CheckUserLastActivity?CookieValue=" + cookievalue + "&authorizedUser=" + $("#authorizeduser").val(),
            method: "POST",
            contentType: "application/json; charset=utf-8",

        }
        $.ajax(settings)
            .done(function (response) {
                responseTime = new Date().getTime() - ajaxTime;
                
                var isauthorized = response.authorized_Value;
                var jsonresult = response.message;
                if (jsonresult == null) {

                    if (checkUser === 'false') {
                        returnval = true;
                        ValidateUser(dummyUserName, dummyPassword, $callFrom);

                    } else {

                        eraseCookie($callFrom);
                        returnval = false;
                    }
                } else {
                   
                    if (jsonresult.isSuccess != true) {
                        eraseCookie($callFrom);
                        returnval = false;
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
                url: APIURL + "/Menu/CheckUserLastActivity?CookieValue=" + cookievalue + "&authorizedUser=" + $("#authorizeduser").val(),
                method: "POST",
                contentType: "application/json; charset=utf-8",

            }
            $.ajax(settings)
                .done(function (response) {
                    responseTime = new Date().getTime() - ajaxTime;

                    var jsonresult = response.message;
                    debugger;
                    if (jsonresult == null) {
                      

                        eraseCookie($callFrom);
                        window.location.href = '/Login/Login/';

                    } else {
                       
                        if (jsonresult.isSuccess != true) {

                            eraseCookie($callFrom);
                            window.location.href = '/Login/Login/';

                        } else
                        {
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

function eraseCookie($callFrom) {
    
    createCookie("Cookieval", "", -1);
    if (checkUser === 'false') {
    } else {
        window.location.href = '/Login/Login/';
    }
}

function logout() {
    let cookievalue = getCookie("Cookieval");
    var ajaxTime = new Date().getDate();
    $callFrom.data('requestRunning', true);
    var settings = {
        async: true,
        crossDomain: true,
        cache: false,
        dataType: "json",
        url: APIURL + "/Menu/DeleteLoginDetails?CookieValue=" + cookievalue,
        method: "POST",
        contentType: "application/json; charset=utf-8",

    }
    $.ajax(settings)
        .done(function (response) {
            responseTime = new Date().getTime() - ajaxTime;

            var jsonLoginData = response.message;

        })
        .fail(function (xhr, textStatus, errorThrown) {
            responseTime = new Date().getTime() - ajaxTime;
            var errorCode = $.parseJSON(xhr.responseText).Message;

            focusFieldID = $(':focus').attr("id");
            message = $.trim($("#lblErrorMessageE_systemexception").text());
            showMessageDialog(message, focusFieldID, ERROR);
        });
    eraseCookie($callFrom);
}

function btnMainMMSPMS_Click() {
    if (!checkLastActivity($callFrom)) {
        return false;
    } else {

        let cookievalue = getCookie("Cookieval");

        var url = $("#hdfpmsurl").val() + 'MenuMaster/MobileIndex?readData=' + cookievalue;
       
        window.location.href = url;
    }

   
}
function btnCNC_Click() {
    let cookievalue = getCookie("Cookieval");
    if (!checkLastActivity($callFrom)) {
        return false;
    } else {

        window.location.href = $("#cncUrl").val() + "?ReadData=" + cookievalue;
    }

}

$(document).ready(function () {
   ManageLoginSession($callFrom);

});
function ManageLoginSession($callFrom) {
    
   
    var cookievalue = getCookie("Cookieval");

    if (cookievalue != "") {
        var ajaxTime = new Date().getDate()
        var settings = {
            async: true,
            crossDomain: true,
            cache: false,
            dataType: "json",
            url: APIURL + "/Menu/DecryptCookie?CookieValue=" + cookievalue,
            method: "POST",
            contentType: "application/json; charset=utf-8",

        }
        $.ajax(settings)
            .done(function (response) {
                responseTime = new Date().getTime() - ajaxTime;
                debugger;
                var jsonresult = response.message;
                $("#lblusername").text(jsonresult.workstatioN_NAME);
              var  isauthorized = response.authorized_Value;
                if (checkUser === 'false') {

                    if (cookievalue != "") {
                        if (isauthorized == "true") {
                            eraseCookie($callFrom);
                            ValidateUser(dummyUserName, dummyPassword, $callFrom)
                        } else {

                            if (jsonresult == null) {
                                ValidateUser(dummyUserName, dummyPassword, $callFrom)
                            }
                        }
                    } else {
                        ValidateUser(dummyUserName, dummyPassword, $callFrom)
                    }

                } else {




                    if (isauthorized == "false") {//removedj sonresult === 'false'
                        eraseCookie($callFrom);
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
    } else
    {
        if (checkUser !== 'false') {
           window.location.href = '/Login/Login/';
        }
    }
    
  
      


}

function btnInvoice_Click() {
    
    let cookievalue = getCookie("Cookieval");
    if (!checkLastActivity($callFrom)) {
        return false;
    } else {

        window.location.href = "/HostInvoiceMenu/HostInvoiceMenu/";
    }

}