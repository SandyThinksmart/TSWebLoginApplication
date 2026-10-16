
var screenNames = {
    "LOGIN": [500, 400],        //(width ,height)
    "MENU": [850, 768],
    "MENU_DEV": [850, 768],
    "HTLOGIN": [255, 445],
    "MASTER_COUNTRY": [830, 360],

    "MASTER_CUSTOMER_TYPE": [900, 370],
    "MASTER_CURRENCY": [830, 470],
    "MASTER_CUSTOMER": [1190, 780],
    "MASTER_RECEIVER": [1120, 480],
    "MASTER_SUPPLIER": [1200, 770],
    "MASTER_BANK": [950, 400],
    "MASTER_DESIGNATION": [835, 340],
    "MASTER_EMPLOYEE": [1100, 500],
    "MASTER_DEPARTMENT_GROUP": [900, 420],
    "MASTER_LOCATION": [940, 440],
    "MASTER_DEPARTMENT": [900, 360],
    "MASTER_SALES_INCHARGE": [1180, 770],
    "MASTER_MAKER": [1220, 440],
    "MASTER_MUKESAKI": [1100, 450],
    "MASTER_FUTOU": [1110, 470],
    "MASTER_HIKITORISAKI": [1110, 520],
    "MASTER_SUBCONTRACTOR": [1100, 725],
    "MASTER_PACKING": [830, 370],
    "MASTER_PROCESS": [1020, 420],
    "MASTER_PROCESS_TEMPLATE": [1820, 710],
    "MASTER_MACHINE": [840, 400],
    "MASTER_MACHINE_GROUP": [840, 390],
    "MASTER_PRODUCT": [1280, 920],
    "MASTER_PROD_NAME_INTERNAL": [980, 390],
    "MASTER_STEEL_TYPE": [870, 425],
    "MASTER_MATERIAL_NAME_INTERNAL": [840, 400],
    "MASTER_MATERIAL_NAME_MAKER": [840, 430],
    "MASTER_MATERIAL": [1210, 610],
    "MASTER_CONDITION": [850, 350],
    "MASTER_CONFIGURATION": [860, 400],
    "MASTER_PRODUCT_TYPE": [870, 425],
    "MASTER_CURRENCY_ENTRY": [850, 950],
    "MASTER_SHUKKA_DEFECT_ENTRY": [830, 430],
    "MASTER_PROCESS_DEFECT": [835, 340],
    "MASTER_CHEMICAL_COMPOSITION": [870, 570],
    "MASTER_JIS_TEST": [835, 340],

    "LIST_MASTER_COUNTRY": [720, 700],
    "LIST_MASTER_CURRENCY": [930, 700],
    "LIST_MASTER_BANK": [1250, 740],
    "LIST_MASTER_CONDITION": [650, 720],
    "LIST_MASTER_CUSTOMER": [1280, 700],
    "LIST_MASTER_CUSTOMER_TYPE": [750, 740],
    "LIST_MASTER_DEPARTMENT_GROUP": [1010, 640],
    "LIST_MASTER_DEPARTMENT": [600, 660],
    "LIST_MASTER_EMPLOYEE": [1660, 680],
    "LIST_MASTER_FUTOU": [1480, 750],
    "LIST_MASTER_HIKITORISAKI": [1280, 750],
    "LIST_MASTER_LOCATION": [1320, 640],
    "LIST_MASTER_MACHINE_GROUP": [750, 650],
    "LIST_MASTER_MACHINE": [990, 660],
    "LIST_MASTER_MAKER": [1280, 700],
    "LIST_MASTER_MATERIAL": [1059, 750],
    "LIST_MASTER_MATERIAL_NAME_INTERNAL": [730, 700],
    "LIST_MASTER_MATERIAL_NAME_MAKER": [980, 730],
    "LIST_MASTER_STEEL_TYPE": [690, 800],
    "LIST_MASTER_MUKESAKI": [1280, 750],
    "LIST_MASTER_PACKING": [720, 700],
    "LIST_MASTER_PROCESS": [1150, 650],
    "LIST_MASTER_PROCESS_TEMPLATE": [700, 700],
    "LIST_MASTER_PRODUCT": [1200, 780],
    "LIST_MASTER_PROD_NAME_INTERNAL": [900, 700],
    "LIST_MASTER_RECEIVER": [1200, 700],
    "LIST_MASTER_SUBCONTRACTOR": [1280, 750],
    "LIST_MASTER_SUPPLIER": [1330, 750],
    "LIST_MASTER_CONFIGURATION": [1150, 700],
    "LIST_MASTER_PRODUCT_TYPE": [650, 750],
    "LIST_MASTER_SHUKKA_DEFECT": [650, 700],
    "LIST_MASTER_PROCESS_DEFECT": [800, 700],
    "LIST_MASTER_CHEMICAL_COMPOSITION": [1320, 700],
    "LIST_JIS_TEST": [780, 660],

    "M_CUSTOMER_FINANCE_DEPARTMENT_ENTRY": [1180, 560],
    "M_PAYEE_ENTRY": [1380, 750],
    "M_MOCHIKOMISAKI_ENTRY": [1100, 500],
    "M_SPOT_AND_SHIKYU_MATERIAL_ENTRY": [1075, 700],
    "M_CUSTOMER_FINANCE_DEPARTMENT_LIST": [1280, 720],
    "M_DESIGNATION_LIST": [540, 680],
    "M_MOCHIKOMISAKI_LIST": [1320, 700],
    "M_PAYEE_LIST": [1280, 700],
    "M_SPOT_AND_SHIKYU_MATERIAL_LIST": [970, 480],
    "M_PRODUCT_VERSION_HISTORY": [1500, 700],
    "USER_LIST": [840, 570],
    "ACT_ALLOCATION_ENTRY": [1290, 600],
    "PROCESS_STATUS_SEARCH_FOR_FACTORY": [1800, 940],

    "MMS_MATERIAL_STATUS_SEARCH_SCREEN_1": [1970, 1050],  //Bundled
    "MMS_MATERIAL_STATUS_SEARCH_SCREEN_2": [1300, 1400],  //Bundled


    "KOUBAN_ENTRY": [1430, 830],            //Bundled
    //"PURCHASE_ORDER_ENTRY": [1400, 900],    //Bundled check
    "KAKOUIRAI_ENTRY": [960, 920],            //Bundled
    "FUTOU_NYUKO_ENTRY": [1390, 800],        //Bundled
    "FUTOU_NYUKO_EDIT_DELETE": [1290, 750], //Bundled
    "KOUBAN_COMPLETION_SCREEN": [1385, 810], //Bundled
    "KHAKOIRAI_COMPLETION_SCREEN": [1395, 720],
    "FUTOU_SHUKKO_ENTRY": [1320, 730],      //Bundled
    "FUTOU_SHUKKO_EDIT_DELETE": [1420,850],//Bundled
    "JIZAI_NYUKA_ENTRY": [1520, 700],        //Bundled
    "JIZAI_NYUKA_EDIT_DELETE": [1420, 820],  //Bundled
    "NIFUDA_DIVISION_SCREEN": [1290, 645],  //Bundled
    "PROCESS_PLAN_REPROCESSING_1": [900, 600], //Bundled
    "PROCESS_PLAN_REPROCESSING_2": [1280, 750], //Bundled
    "MATERIAL_SHUKKO_ENTRY_SCREEN": [1300, 770], //Bundled
    "MATERIAL_SHUKKO_EDIT_DELETE": [1130,350 ],   //Bundled
    "SPOT_PO_ENTRY_SCREEN": [690, 700],   //Bundled
    "HIKITORIIRAI_ENTRY_SCREEN": [1090, 745],
    "INVOICE_ENTRY_SCREEN": [1300, 770],
    "TEMP_ALLOCATION_ENTRY": [1260, 850],
    "INVOICE_LIST": [880, 669],
    "MATERIAL_NYUKO_KOUBAN_POPUP": [1330, 820],
    "PURCHASE_ORDER_ENTRY": [1330, 810],
    "REQUEST_MATL_ENTRY_SCREEN": [1090, 745],
    "HEAT_TREATMENT_ENTRY": [2000, 5000],    
}


function ConfirmDelete() {
    //ToDo: Need to get this message from resources
    var result = confirm("This will permenently delete the record. Are you sure you want to continue?");
    if (result == true)
        return true;
    else
        return false;
}

function resize(width, height) {
    window.resizeTo(width, height);
}


function onLoad() {
    var screenName = $("#hdfScreenName").val();
   // window.moveTo(0, 0);

    if (screenName != undefined) {
        var widthHeight = screenNames[screenName];

        resize(widthHeight[0], widthHeight[1]);
    }
}
////function Mask() {
////    $(".txtDate").mask("9999/99/99", { placeholder: "YYYY/MM/DD" });

////}
function window_onkeydown(ev, index) {
    if (ev.keyCode != undefined) {
        if (ev.keyCode.toString() == "13") {
            setFocus(index);
        }

        if (ev.keyCode.toString() == "66") {
            setFocus(index);
        }
    }
}

function setFocus(index) {

    var controls;
    controls = this.form1.elements;

    for (var i = 0; i < (controls.length) ; i++) {
        if (controls[i].tabIndex == index)
            controls[i].focus();
    }
}


function onComboKeyDown(id, ev, index) {

    var Flag = document.getElementById('hdfEditModeValue').value;


    // check for Up Navigation Key Press to change the menuItems//
    if (Flag.toString() == "1") {

        if (ev.keyCode.toString() == "1") {

            var selectedIndex = document.getElementById(id).selectedIndex;

            if (selectedIndex.toString() == "0") {
                var ind = index - 1;
                ev.preventDefault();
            }
            else {
                document.getElementById(id).selectedIndex = selectedIndex - 1;
                ev.preventDefault();
            }
        }

        // check for Down Navigation Key Press to change the menuItems//
        if (ev.keyCode.toString() == "2") {
            var selectedIndex = document.getElementById(id).selectedIndex;
            document.getElementById(id).selectedIndex = selectedIndex + 1;
            ev.preventDefault();
        }


    }

    // check for 'Enter' Key press to put the Dropdownlist in edit mode and set Flag Value to 1 //   
    if (ev.keyCode.toString() == "13") {

        var FlagValue = document.getElementById('hdfEditModeValue').value;

        if (FlagValue.toString() == "0" || FlagValue.toString() == "") {
            document.getElementById('hdfEditModeValue').value = "1";
        }
        else {
            document.getElementById('hdfEditModeValue').value = "0";
        }
        ev.preventDefault();

    }
}

function setInitFocus() {
    var controls;
    if (navigator.appName.toString() == "Netscape")
        controls = document.getElementById("form1").elements;
    else
        controls = this.form1.elements;

    for (var i = 0; i < (controls.length) ; i++) {
        if (controls[i].tabIndex == 1)
            controls[i].focus();
    }
}

function PageRedirect(path) {
    window.location.href = path;
}


function ToUpper(ctrl) {
    var e = window.event;
    var charCode = event.keyCode;

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
    {
        var t = ctrl.value;
         ctrl.value = t.toUpperCase();
    }
    else
        e.cancelBubble = true;
}

function Confirmation() {
    var win = window.open('', '_self');
    win.close();
}
function CloseScreen() {
    var win = window.open('', '_self');
    win.close();
}

function movetoNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
} //For Hikinuki & EC Screen

$(document).ready(function () {
    onLoad();
   // Mask();
    /**
    2017/02/22 Girish Badwaik
    Added common code to prevent ENTER keypress event on textboxes.
    **/
    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        // Only stop the 'Enter' for entry fields, not buttons.
        if (event.keyCode == 13 && $(event.target).is("input[type=text]")) {
            //.hasClass("_functionButtons"))) {
            event.stopPropagation();
            event.preventDefault();
        }
        else {
            return true;
        }


        // Following code is specific to Kouban Reply Screen.
        // To auto-click the PO search button on main screen when scanned with bar-code scanner
        if ($(event.target).hasClass("PoSearchText")) {
            var $thisChuubanGyouban = $(event.target);
            var $btnPOSearch = $("#btnPoSearch");
            $btnPOSearch.trigger("click");
        }

        // Following code is is specific to Multi PO, Kouban Search Popup.
        // To move focus among PO search inputs on popup screen when scanned with bar-code scanner
        if ($(event.target).hasClass("textBoxHSKPOKoubanSearchComponent")) {
            // Get the current element's ID. Next element's ID is ID + 1. Hence the logic.
            var $thisInput = $(event.target);
            var arraySplittedID = $thisInput.attr("id").split("_");  // id is like mePoNoSearchPopup_grdvSearchGrid_txtEntryField_5
            var idNo = parseInt(arraySplittedID[arraySplittedID.length - 1]); // get the sequence no from id
            var nextIdNo = idNo + 1; // increment the sequence number
            arraySplittedID.pop(); // remove id number
            var nextId = arraySplittedID.join("_") + "_" + nextIdNo; // create new id with new sequence no
            var $nextInput = $("#" + nextId);
            // if next input is found, focus there. Otherwise focus on search button.
            if ($nextInput.length) {
                $nextInput.focus();
            }
            else {
                $(".btnSearchHSKPOKoubanSearchComponent").focus();
            }
        }

        // Following code is specific to Product Nifuda Generation Screen actAllocChuuban
        if ($(event.target).hasClass("ChuubanGyouban")) {
            var $thisChuubanGyouban = $(event.target);
            var thisChuubanGyoubanID = $thisChuubanGyouban.attr("id");
            var nextChuubanGyoubanIDNumber = parseInt(thisChuubanGyoubanID.split("grdvChubanInfo_txtChuuban_")[1]) + 1;
            var $nextChuubanGyouban = $("#grdvChubanInfo_txtChuuban_" + nextChuubanGyoubanIDNumber);
            if ($nextChuubanGyouban.length) {
                // Set focus on next chuubanGyouban
                $nextChuubanGyouban.focus();
            }
            else {
                $("#btnSelect").focus();
            }
        }

        // Following code is specific to Product Nifuda Generation Screen 
        if ($(event.target).hasClass("actAllocChuuban")) {
            var $thisChuubanGyouban = $("#btnProductSearch");
            //var thisChuubanGyoubanID = $thisChuubanGyouban.attr("id");
            //var nextChuubanGyoubanIDNumber = parseInt(thisChuubanGyoubanID.split("grdvChubanInfo_txtChuuban_")[1]) + 1;
            //var $nextChuubanGyouban = $("#grdvChubanInfo_txtChuuban_" + nextChuubanGyoubanIDNumber);
            //if ($nextChuubanGyouban.length) {
            //    // Set focus on next chuubanGyouban
            //    $nextChuubanGyouban.focus();
            //}
            //else {
            //    $("#btnSelect").focus();
            //}
            $thisChuubanGyouban.click();
        }

        // Following code is specific to PMS Entry Screens
        if ($(event.target).hasClass("PMSEntryMachine")) {
            $("#txtChuuban1").focus();
        }

        if ($(event.target).hasClass("PMSEntryChuuban")) {
            var $thisChuuban = $("#txtChuuban1");
            var $thisGyouban = $("#txtGyouban1");
            var chuubanGyoubanVal = $thisChuuban.val();
            if (chuubanGyoubanVal.length > 9) {
                var chuuban = chuubanGyoubanVal.slice(0, 9); // Chuuban's length is 9
                var gyouban = chuubanGyoubanVal.slice(9); // Remaining is Gyouban

                $thisChuuban.val(chuuban);
                $thisGyouban.val(gyouban);

                $("#btnChuubanSearch").focus().click();
            }
        }
        // End code for PMS Entry Screens


    });

});



//Fractions into decimals
function RestrictToValidDecimalFormat($target, validPreDotLength, validPostdotLength) {

    var isValueDefined = typeof $target.value != 'undefined';
    var originalValue = isValueDefined ? $target.value : $target.val();
    var preDotValue = originalValue;
    var postDotValue = "";
    var isNegative = originalValue.indexOf("-") === 0;
    var isDotPresent = originalValue.indexOf(".") > -1;

    if (isNegative) {
        preDotValue = preDotValue.substring(1, preDotValue.length);
        // alert(preDotValue);
    }

    if (isDotPresent) {
        // split dot
        var splitValues = preDotValue.split(".");
        preDotValue = splitValues[0];
        postDotValue = splitValues[1];
    }


    if (preDotValue.length > validPreDotLength) {
        var newPreDotValue = preDotValue.substring(0, validPreDotLength);
        preDotValue = newPreDotValue;
    }

    if (postDotValue.length > validPostdotLength) {
        var newPostDotValue = postDotValue.substring(0, validPostdotLength);
        postDotValue = newPostDotValue;
    }

    var resetNumber = "";

    if (isNegative) {
        resetNumber += "-";
    }

    resetNumber += String(preDotValue);

    if (isDotPresent) {
        resetNumber += ".";
    }
    if (String(postDotValue) !== "") {
        resetNumber += String(postDotValue);
    }

    if (isValueDefined) {
        $target.value = resetNumber;
    }
    else {
        $target.val(resetNumber);
    }

}

function IsNumberValid(number) {

    var keyCodeEntered = (event.which) ? event.which : (window.event.keyCode) ? window.event.keyCode : -1;
    if (keyCodeEntered == 46) {
        if ((number.value) && (number.value.indexOf('.') >= 0)) {
            return false;
        }
        else

            return true;
    }
}