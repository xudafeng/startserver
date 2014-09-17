<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<title><#=$title#></title>
<style>
.right-top {position: absolute; top: 20px; right: 20px;}
</style>
</head>
<body>
<#=$content#>
<div class="right-top" id="radios">
  <label>normal</label>
  <input type="radio" name="slide" value="true" />
  <label>slide</label>
  <input id="slide" type="radio" name="slide" checked value="false"/>
</div>
<script>
function setCookie(name, value, expiresHours) {
  var cookieString = name + "=" + escape(value);
  if(expiresHours>0) {
    var date = new Date();
    date.setTime( date.getTime + expiresHours * 3600 * 1000);
    cookieString = cookieString + "; expires=" + date.toGMTString();
  }
  document.cookie = cookieString;
}
function initSlider() {
}
setTimeout(function() {
  document.body.style.opacity = 1;
  var isSlide = document.getElementById("slide").checked;
  document.getElementById("radios").addEventListener("click", function(e) {
    if (e.target.nodeName === "INPUT" && e.target.value === "true") {
      setCookie("startserver-slide", false, 240);
      location.href = "";
    }
  }, false);
  initSlider();
}, 16);
</script>
</body>
</html>
