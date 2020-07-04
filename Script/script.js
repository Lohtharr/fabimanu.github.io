var dark = false;
var mouse_is_insettings = false;

var Day = new Date().getDay(); /*Tag als Nummer beginnend Sonntag als 0*/
// weil testen 
Day=5;
var Tomorrow = Day+1;
var Lehrer;
darkmodecheck();
cookiecheck();




leer = [
    ["", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", ""]
];




/* $(".invis").hide();*/
function fillday(day, data) {
    for (var i = 1; i < 12; i++)
        $("#" + day + i).html(data[i - 1]);
}

function success_function(input) {
    data = JSON.parse(input);
    fillday("mo", data[0]);
    fillday("di", data[1]);
    fillday("mi", data[2]);
    fillday("do", data[3]);
    fillday("fr", data[4]);
}
function switchplan(name) {
    $("td").css("background-color","transparent");
    $.get("Stundenplaene/" + name + "plan.txt", null, success_function);
    $(".day").toggle(true);
    $(".hour").toggle(true);
    $(".wrap").toggle(false);
    $(".dropdowncontent").toggle(false);
    $.getJSON("/Stundenplaene/"+name+"lehrer.txt", function getlehrer(data) {
        Lehrer = data;
    });
    $.getJSON("https://floseite.de/dsbstinkt/index.php?id=0", function standin(data){
            if(Day!=0 && Day !=6){
                for (var i2 = 1; i2 < 12; i2++) {
                    for (var i = 0; i < data.Vertretungen.length; i++) {
                        if (Lehrer[Day-1][i2-1] == data.Vertretungen[i].Lehrkraft && i2 == data.Vertretungen[i].Stunde) /*Vergleichen mit Array index  und inhalt Fabilehrer und manulehreer*/ 
                        /*i2 manchaml -1 da array bei 0 anfängt stunden bsp ned */ 
                        {
                            $("#" + DaytoWord(Day) + i2 ).html(data.Vertretungen[i].Lehrkraft+" in "+ data.Vertretungen[i].Raum);
                            $("#" + DaytoWord(Day) + i2 ).css("background-color", "#2aeefc");// farbe durch variable ersetzen,geht als einzige nicht ????
                            if(data.Vertretungen[i].Nachricht == "entf\u00e4llt"){
                                 $("#" + DaytoWord(Day) + i2 ).html("Entfällt"); 
                            }
                            if(/verlegt/.test(data.Vertretungen[i].Nachricht)){
                                $("#" + DaytoWord(Day) + i2 ).html(data.Vertretungen[i].Nachricht);

                            }   
                        }
                    }
                }
            }
        }
    );
    $.getJSON("https://floseite.de/dsbstinkt/index.php?id=1", function standin2(data){     
    if(Tomorrow==0 || Tomorrow ==6){
               Tomorrow = 1;
            }
            for (var i2 = 1; i2 < 12; i2++) {
                for (var i = 0; i < data.Vertretungen.length; i++) {
                    if (Lehrer[Tomorrow-1][i2-1] == data.Vertretungen[i].Lehrkraft && i2 == data.Vertretungen[i].Stunde) /*Vergleichen mit Array index  und inhalt Fabilehrer und manulehreer*/ 
                    /*i2 manchaml -1 da array bei 0 anfängt stunden bsp ned */ 
                    {
                        $("#" + DaytoWord(Tomorrow) + i2 ).html(data.Vertretungen[i].Lehrkraft+" in "+ data.Vertretungen[i].Raum);
                        $("#" + DaytoWord(Tomorrow) + i2 ).css("background-color", "#2aeefc");// farbe durch variable ersetzen,geht als einzige nicht ????
                        if(data.Vertretungen[i].Nachricht == "entf\u00e4llt"){
                             $("#" + DaytoWord(Tomorrow) + i2 ).html("Entfällt"); 
                        }
                        if(/verlegt/.test(data.Vertretungen[i].Nachricht)){
                            $("#" + DaytoWord(Tomorrow) + i2 ).html(data.Vertretungen[i].Nachricht);

                        }   
                    }
                }
            }
        }
    );

}


function DaytoWord (temp){
    var DayasWord;
    switch(temp){
        case 1:
            DayasWord = "mo"
            break; 
        case 2:
            DayasWord = "di"
            break;
        case 3:
            DayasWord = "mi"
            break;
        case 4:
            DayasWord = "do"
            break;
        case 5:
            DayasWord = "fr"
            break;
    }
    return(DayasWord);    
}

function clicked3() {
    $("#fabibtn").toggle();
    $("#manubtn").toggle();
}
function takemehome() {
    $(".day").toggle(false);
    $(".hour").toggle(false);
    $(".wrap").toggle(true);
    $(".dropdowncontent").toggle(false);
    fillday("mo", leer[0]);
    fillday("di", leer[1]);
    fillday("mi", leer[2]);
    fillday("do", leer[3]);
    fillday("fr", leer[4]);
}
function toggle(text) {
    $(text).toggle();
}
function darkmodecookie() {
    if (dark) {
        document.cookie = "Theme= ;expires=Thu, 20 April 1069 04:20:00 UTC; path =/;"
    } else {
        document.cookie = "Theme=Dark;expires=Thu, 20 April 6969 04:20:00 UTC; path =/;"
    }
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function darkmodecheck() {
    var dunkel = getCookie("Theme");
    document.documentElement.style.setProperty("--colorlightblue", "#2aeefc");
    if (dunkel != "") {
        dark = true;
        document.documentElement.style.setProperty("--colorwhite", "#1a1a1a");
        document.documentElement.style.setProperty("--colorfont", "#ffffff");
        document.documentElement.style.setProperty("--colorback", "#1a1a1a");
        document.documentElement.style.setProperty("--colorback2", "#0d0d0d");
        document.documentElement.style.setProperty("--colordarkmodebutton", "#00cc00");
        
    } else {
        dark = false;
        document.documentElement.style.setProperty("--colorwhite", "#ffffff");
        document.documentElement.style.setProperty("--colorfont", "#000000");
        document.documentElement.style.setProperty("--colorback", "#eafbfc");
        document.documentElement.style.setProperty("--colorback2", "#c4f9fc");
        document.documentElement.style.setProperty("--colordarkmodebutton", "#ff0000");
    }
}
function cookiesaccept() {
    document.cookie = "Check=ja;expires=Thu, 20 April 6969 04:20:00 UTC; path =/;"
    $("#popupwindow").toggle();

}
function cookiesdeny() {
    window.history.back();
    $(":root").toggle(false)
}
function cookiecheck() {
    var Popupcookie = getCookie("Check");
    if (Popupcookie == "ja") {
        $("#popupwindow").toggle();
    }
}


$(document).ready(function () {
    $('#settings-box').hover(function () {
        mouse_is_insettings = true;
    }, function () {
        mouse_is_insettings = false;
    });

    $("body").mouseup(function () {
        if (!mouse_is_insettings) $('#settings-box').hide();
    });
});

