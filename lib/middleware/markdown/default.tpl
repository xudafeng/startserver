<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<title><#=$title#></title>
<style>
body {padding: 0 20%; opacity: 0;transition: all 1s ease;}
.right-top {position: absolute; top: 20px; right: 20px;}
</style>
</head>
<body>
<#=$content#>
<div class="right-top" id="radios">
  <label>normal</label>
  <input type="radio" name="slide" checked value="true" />
  <label>slide</label>
  <input id="slide" type="radio" name="slide" value="false"/>
</div>
<script>
(function(global, undefined) {
  var isSlide = document.getElementById("slide").checked;
  function setCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);
    if ( expiresHours > 0 ) {
      var date = new Date();
      date.setTime( date.getTime + expiresHours * 3600 * 1000);
      cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
  }
  document.getElementById("radios").addEventListener("click", function(e) {
    if (e.target.nodeName === "INPUT" && e.target.value === "false") {
      setCookie("startserver-slide", true, 240);
      location.href = "";
    }
  });
  setTimeout(function() {
    document.body.style.opacity = 1;
  }, 16);
})(this)
</script>
</body>
</html>
