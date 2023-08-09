
var lightsOn = false;
var bgColor = document.documentElement.style.backgroundColor;
var txtColor = document.getElementsByTagName("a").color;
var hoverColor = "rgba(68, 68, 68, 0.8)";
var liColor = "#eee";

$(".list-item").hover(function() {
  $(this).css("color",hoverColor);
}, function() {
  $(this).css("color",liColor);
});


function lights() {
    if (lightsOn == false){
      lightsOn = true;
      document.documentElement.style.backgroundColor = "#111";
      liColor = "#eee";
      hoverColor = "rgba(68, 68, 68, 0.8)";
      var lias = document.getElementById("navbar").getElementsByTagName("a");
      var i;
      var len = lias.length
      for(i = 0; i < len; i++){
        lias[i].style.color = liColor;
      }

    }
    else if (lightsOn == true) {
      lightsOn = false;
      document.documentElement.style.backgroundColor = "rgb(191,191,191)";
      liColor = "#333";
      hoverColor = "#eee";
      var lias = document.getElementById("navbar").getElementsByTagName("a");
      var i;
      var len = lias.length
      for(i = 0; i < len; i++){
        lias[i].style.color = liColor;
      }
    }
}
