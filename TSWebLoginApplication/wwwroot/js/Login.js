var WARNING = "warning";
var ERROR = "error";
var SUCCESS = "success";
var $callFrom = $(this);
var $Button1 = $("#Button1");;
$('#txtUserName').focus();

function ValidateUser(username, pass, $callFrom) {
    $callFrom.data('requestRunning', true);
         
       var ajaxTime = new Date().getDate();
        var settings = {
            async: true,
            crossDomain: true,
            cache: false,
            dataType: "json",
            url: APIURL + "/Login/ValidateLoginUser?username=" + username + "&pass=" + pass + "&authorizedUser=" + $("#authorizeduser").val(),
            method: "GET",
            contentType: "application/json; charset=utf-8",
           
        }
        $.ajax(settings)
            .done(function (response) {
                responseTime = new Date().getTime() - ajaxTime;
                debugger;
                var jsonLoginData = response.message;

                               
               
                if (jsonLoginData == 0) {
                    
                    focusFieldID = $(':focus').attr("ErrorLabel");
                    message = $("#lblErrorMessageE_LoginUserName").text().trim();
                    showMessageDialog(message, focusFieldID, WARNING);

                } else {
                   
                    if (jsonLoginData[0].isSuccess != true) {
                        
                        focusFieldID = $(':focus').attr("ErrorLabel");
                        message = $("#lblErrorMessageE_LoginUserName").text().trim();
                        showMessageDialog(message, focusFieldID, WARNING);

                    } else {
                       
                    

                        if (navigator.userAgent.match(/Android/i)
                            || navigator.userAgent.match(/webOS/i)
                            || navigator.userAgent.match(/iPhone/i)
                            || navigator.userAgent.match(/iPad/i)
                            || navigator.userAgent.match(/iPod/i)
                            || navigator.userAgent.match(/BlackBerry/i)
                            || navigator.userAgent.match(/Windows Phone/i)) {
                            device = true;
                            createCookie("Cookieval", jsonLoginData[0].cookieval, 1);
                            var url = '/Menu/PMSMenuMobilePage/';
                          
                            window.location.href = url;
                        } else {
                            createCookie("Cookieval", jsonLoginData[0].cookieval, 1);

                            window.location.href = '/Menu/MenuPage/';

                          //  device = false;
                          //  var url = $("#hdfpmsurl").val() + 'MenuMaster/Index?readData=' + cookievalue;
                        }
                        
                    }
                }

            }).fail(function (xhr, textStatus, errorThrown) {
                
                responseTime = new Date().getTime() - ajaxTime;
                var errorCode = $.parseJSON(xhr.responseText).Message;

                focusFieldID = $(':focus').attr("id");
                message = $.trim($("#lblErrorMessageE_systemexception").text());
                showMessageDialog(message, focusFieldID, ERROR);
            });
   //}
}
$("#LoginButton").unbind("click")
$("#LoginButton").click(function (event) {
 
        var username = $('#txtUserName').val();
        var password = $('#txtPassword').val();
    if (username.trim() == "") {
      
                focusFieldID = $(':focus').attr("ErrorLabel");
        message = $("#lblErrorMessageE_LoginUserName").text().trim();
       
        showMessageDialog(message, "txtUserName", WARNING);
       
      
        } else {

         
            ValidateUser(username, password, $callFrom);
            
        }
   
    });

  
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
function readCookie() {
   
    let coockievalue = getCookie("Cookieval");
    if (coockievalue != "") {
        var ajaxTime = new Date().getDate();


        var settings = {
            async: true,
            crossDomain: true,
            cache: false,
            dataType: "json",
            url: APIURL + "/Login/CheckUserLastActivity?CookieValue=" + coockievalue + "&authorizedUser=" + $("#authorizeduser").val(),
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
                        
                        
                        window.location.href = '/Menu/MenuPage/';
                      
                       
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
        
    }
}
    function eraseCookie(name) {
        createCookie("Cookieval", "", -1);
}
$("#btnInitialize").click(function () {
    $("#txtUserName").val("");
    $("#txtPassword").val("");
    $("#eye").css({ "display": "none" });
    $("#eye").click();
   
});
$("#eye").click(function () {
   
    this.classList.toggle("fa-eye-slash");
    const type = $("#txtPassword").attr("type") === "password" ? "text" : "password";
    $("#txtPassword").attr("type", type);
});
$("#txtPassword").keyup(function () {
   
    if ($("#txtPassword").val().trim() !== "") {
        $("#eye").css({ "display": "inline" });
    } else
    {
        $("#eye").css({ "display": "none" });
    }

});
$(document).ready(function () {
  
    $("#eye").css({"display": "none" });

    DeleteOverSixHoursOldData();

    let coockievalue = getCookie("Cookieval");

    var checkUser = $("#authorizeduser").val();
    if (checkUser === 'false') {

        if (coockievalue != "") {
            var ajaxTime = new Date().getDate();
            var settings = {
                async: true,
                crossDomain: true,
                cache: false,
                dataType: "json",
                url: APIURL + "/Login/CheckUserLastActivity?CookieValue=" + coockievalue + "&authorizedUser=" + $("#authorizeduser").val(),
                method: "POST",
                contentType: "application/json; charset=utf-8",

            }
            $.ajax(settings)
                .done(function (response) {
                    responseTime = new Date().getTime() - ajaxTime;

                    var jsonresult = response.message;

                    if (jsonresult == null) {
                        ValidateUser(dummyUserName, dummyPassword, $callFrom)

                    } else {


                       window.location.href = '/Menu/MenuPage/';


                    }
                })
                .fail(function (xhr, textStatus, errorThrown) {

                    responseTime = new Date().getTime() - ajaxTime;
                    var errorCode = $.parseJSON(xhr.responseText).Message;

                    focusFieldID = $(':focus').attr("id");
                    message = $.trim($("#lblErrorMessageE_systemexception").text());
                    showMessageDialog(message, focusFieldID, ERROR);
                });


          //  window.location.href = '/Menu/MenuPage/';
        } else {
            ValidateUser(dummyUserName, dummyPassword, $callFrom)

        }

    } else {


        if (coockievalue != "") {
            var ajaxTime = new Date().getDate();
            var settings = {
                async: true,
                crossDomain: true,
                cache: false,
                dataType: "json",
                url: APIURL + "/Login/DecryptCookie?CookieValue=" + coockievalue,
                method: "POST",
                contentType: "application/json; charset=utf-8",

            }
            $.ajax(settings)
                .done(function (response) {
                    responseTime = new Date().getTime() - ajaxTime;

                    var jsonresult = response.message;
                    if (checkUser === 'true' && jsonresult === 'false') {
                        eraseCookie($callFrom);
                    } else if (checkUser === 'false' && jsonresult === 'true') {
                        eraseCookie($callFrom);
                    }

                    readCookie();

                })
                .fail(function (xhr, textStatus, errorThrown) {

                    responseTime = new Date().getTime() - ajaxTime;
                    var errorCode = $.parseJSON(xhr.responseText).Message;

                    focusFieldID = $(':focus').attr("id");
                    message = $.trim($("#lblErrorMessageE_systemexception").text());
                    showMessageDialog(message, focusFieldID, ERROR);
                });

        }


    }

}).ajaxStart(function () {

    $("#LoadingImage").show();
}).ajaxStop(function () {
    $("#LoadingImage").hide();
}).ajaxError(function () {
    $("#LoadingImage").hide();
});


$(function () {
    $(document).ajaxStart(function () {

        $("#LoadingImage").show();
    });

    $(document).ajaxStop(function () {
        $("#LoadingImage").hide();
    });

    $(document).ajaxError(function () {
        $("#LoadingImage").hide();
    });
   
});

function DeleteOverSixHoursOldData() {
    
    var ajaxTime = new Date().getDate();
    var settings = {
        async: true,
        crossDomain: true,
        cache: false,
        dataType: "json",
        url: APIURL + "/Login/DeleteOverSixHoursOldData",
        method: "POST",
        contentType: "application/json; charset=utf-8",

    }
    $.ajax(settings)
        .done(function (response) {
            responseTime = new Date().getTime() - ajaxTime;
                     
        })
        .fail(function (xhr, textStatus, errorThrown) {

            responseTime = new Date().getTime() - ajaxTime;
            var errorCode = $.parseJSON(xhr.responseText).Message;
            focusFieldID = $(':focus').attr("id");
            message = $.trim($("#lblErrorMessageE_systemexception").text());
            showMessageDialog(message, focusFieldID, ERROR);
        });
}
