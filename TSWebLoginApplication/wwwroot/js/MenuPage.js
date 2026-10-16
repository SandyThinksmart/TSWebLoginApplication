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
              
                if (jsonLoginData[0].isSuccess != true) {
                    focusFieldID = $(':focus').attr("ErrorLabel");
                    message = $("#lblErrorMessageE_LoginUserName").text().trim();
                    showMessageDialog(message, focusFieldID, WARNING);



                } else {
                   
                    createCookie("Cookieval", jsonLoginData[0].cookieval, 1);
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

          if (navigator.userAgent.match(/Android/i)
              || navigator.userAgent.match(/webOS/i)
              || navigator.userAgent.match(/iPhone/i)
              || navigator.userAgent.match(/iPad/i)
              || navigator.userAgent.match(/iPod/i)
              || navigator.userAgent.match(/BlackBerry/i)
              || navigator.userAgent.match(/Windows Phone/i)) {
              device = true;
              var url = $("#hdfpmsurl").val() + 'MenuMaster/MobileIndex?readData=' + cookievalue;
          } else {
              device = false;
              var url = $("#hdfpmsurl").val() + 'MenuMaster/MenuPage?readData=' + cookievalue;
          }

        
        //var myWindow = window.open(url, "_blank", "width=850,height=650", "Resizable=no");
          window.location.href = url;
    }

    //var url = '202.0.103.130/TSWebSysytemJP/Menu.aspx?ReadData=' + cookievalue;

    //if (url.indexOf("http://") == -1) {
    //    url = "http://" + url;
    //}

    //var myWindow = window.open(url, "_blank", "width=1900,height=900");
 
}
function btnCNC_Click() {
    let cookievalue = getCookie("Cookieval");
    if (!checkLastActivity($callFrom)) {
        return false;
    } else {

        //var myWindow = window.open($("#cncUrl").val() + "?ReadData=" + cookievalue, "_blank", "width=1940,height=1140", "Resizable=no");
        
        window.location.href = $("#cncUrl").val() + "?ReadData=" + cookievalue;
    }

}
function btnAdministrator_Click() {
    let cookievalue = getCookie("Cookieval");
    if (!checkLastActivity($callFrom)) {
        return false;
    } else {

        
        window.location.href = '/Administrator/Administrator/';
        //var myWindow = window.open("/Administrator/Administrator/", "_blank", "width=1940,height=1140", "Resizable=no");
    }

}
function btnConfiguration_Click() {
   
    let cookievalue = getCookie("Cookieval");
    if (!checkLastActivity($callFrom)) {
        return false;
    } else {

        var urlvalue = $("#aspxUrl").val()+ "Menu.aspx" + "?ReadData=" + cookievalue +  "&SiteURL=Masters/M_ConfigurationEntry.aspx";
        var myWindow = window.open(urlvalue, "_blank", "Resizable=no");
    }

}

$(document).ready(function () {
        if (checkUser === 'false') {
        $("#btnsignout").hide();
    } else {
        $("#btnsignout").show();
    }
    ManageLoginSession($callFrom);

    

        readCookie($callFrom);
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
                
               var jsonresult = response.message;
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
//$("#lblMenuMainMMSPMS1").click(function () {
//    window.location.href = "/HostInvoiceMenu/HostInvoiceMenu/";

//});

function btnInvoice_Click() {
    
    let cookievalue = getCookie("Cookieval");
    if (!checkLastActivity($callFrom)) {
        return false;
    } else {

        window.location.href = "/HostInvoiceMenu/HostInvoiceMenu/";
    }

}