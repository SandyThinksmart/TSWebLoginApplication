function highlight($area, $element) {
    $area.find(".selected").removeClass("selected");
    $element.addClass("selected");
}

function ShowUnderDevMessage() {
    alert("現在この画面は作成されていない為、使用出来ません。");
    return false;
}
$(document).ready(function () {
    //resize(850, 768);
    moveTo(0, 0);
    var $mainMenu = $(".mainMenu");
    var $subMenu = $(".subMenu");

    /////////////////////////////////////// Show demo div by default  ///////////////////////////////////////
    highlight($mainMenu, $(".linkDefault").parent("td"));
    $subMenu.find("div").hide();
    $subMenu.find(".divDefault").show();


    ////////////////////////////////////// Handle menu click events ///////////////////////////////////////
    $mainMenu.click(function (event) {
        var target = event.target;
        var aId = "";
        var subMenuDivId = "";
        var $highlightTarget = "";

        if ((target.nodeName === "A" || target.nodeName === "SPAN")) {
            $highlightTarget = $(target).parent("td");
            aId = target.id; // should be "lnk<something>"
        }

        else if ((target.nodeName.toUpperCase() === "TD") && ($(target).has("span").length > 0 || $(target).has("a").length > 0)) {
            $highlightTarget = $(target);
            aId = $(target).has("span").length > 0 ? $(target).find("span").attr("id") : $(target).find("a").attr("id"); // should be "lnk<something>"
        }

        if (aId !== "" && $highlightTarget !== "") {

            subMenuDivId = aId.replace("lnk", "div"); // create "div<something>"

            if ($subMenu.has("#" + subMenuDivId).length > 0) {
                highlight($mainMenu, $highlightTarget);
                $subMenu.find("div").hide(); // hide all divs
                $subMenu.find("#" + subMenuDivId).show(); // show target menu div
            }

        }
    });

    //////////////////////////////////// Handle sub-menu click events ///////////////////////////////////////
   // var features = "left=0,top=0,status=yes,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes,titlebar=no";
    //$subMenu.click(function (event) {
    //    var target = event.target;
    //    var $highlightTarget = "";
    //    var url = "";

    //    if (target.nodeName === "SPAN" || target.nodeName === "A") {
    //        $highlightTarget = $(target).parent("td");
    //        url = target.nodeName === "SPAN" ? $(target).attr("url") : "";
    //    }
    //    else if ((target.nodeName.toUpperCase() === "TD") && ($(target).has("span").length > 0 || $(target).has("a").length > 0)) {
    //        $highlightTarget = $(target);
    //        url = $(target).has("span").length > 0 ? $(target).find("span").attr("url") : "";
    //    }

    //    if (url !== "" && $highlightTarget !== "") {
    //        highlight($subMenu, $highlightTarget);
    //        window.open(url, "_blank", features);
    //    }
    //});

    //////////////////////////////////// Handle close button click event ///////////////////////////////////////
    $("#btnClose").click(function (event) {
        closeWindow();
        self.close();
    });

    var bthUnderDevelopment = document.getElementsByClassName("UnderDevelopment");
    $(bthUnderDevelopment).click(function () {
       
    });

  

});
