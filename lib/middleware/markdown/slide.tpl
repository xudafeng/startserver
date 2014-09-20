<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<title><#=$title#></title>
<style>
html,body{margin:0;padding:0;height:100%;}
body {opacity: 0;-webkit-transition: all 1s ease;color:#fff;font-family: "Verdana", "monaco", "Microsoft YaHei";}
#page {width: 100%;height:100%;text-align:center;position:relative;}
#page .page{color:white;width:100%;height:100%;overflow:auto;text-align:left;position:absolute;background:gray;opacity:0;transition:
all .5s ease;background:black;}
#page .page .inner{margin: 0 auto;height: 100%;padding: 40px 100px;}
#page .prev {opacity:1;transform: translate(-100%, 0);}
#page .current {opacity:1;}
#page .next {opacity:1;transform: translate(100%, 0);}
.inner a {text-decoration: none;color: rgb(35, 195, 0);}
.inner h1 {font-size:50px;padding-bottom: 30px;}
.inner h2 {font-size:40px; padding-bottom: 20px;}
.inner h3 {font-size:30px; padding-bottom: 10px;}
.inner h4 {font-size:20px; padding-bottom: 5px;}
.inner p,
.inner blockquote,
.inner pre {font-size: 25px;}
.inner blockquote,
.inner pre { background: rgb(47, 47, 47); border-radius: 10px; padding: 10px 20px; margin: 0;}
.inner code { background: rgb(47, 47, 47); border-radius: 4px;padding: 2px 4px;}
.inner ul,
.inner ol{font-size: 20px; background:rgb(47, 47, 47);border-radius: 10px;padding: 10px 50px;}
.inner li {padding: 4px;}
.switcher {background-color: rgba(123, 123, 123, 0.1);border: none;top:
0;font-size: 40px;margin: 0;max-width: 150px;min-width: 80px;outline:
none;padding: 0;position: absolute;top: 0;z-index: 99;color: rgba(158, 158,
158, 0.5);height:100%;}
.switcher:hover, .switcher:focus {cursor: pointer;background-color: rgba(123, 123, 123, 0.2);}
.right-top {position: absolute; top: 20px; right: 20px;z-index: 99;}
</style>
</head>
<body>
<div id="page">
<#=$content#>
</div>
<div class="right-top" id="radios">
  <label>normal</label>
  <input type="radio" name="slide" value="true" />
  <label>slide</label>
  <input id="slide" type="radio" name="slide" checked value="false"/>
</div>
<button id="left" class="switcher" style="left: 0px;">&lsaquo;</button>
<button id="right"   class="switcher" style="right: 0px;">&rsaquo;</button>
<script>
(function(global, undefined) {
  var isSlide = document.getElementById("slide").checked;
  var index = location.hash.split("=")[1] || 1;
  var left = document.getElementById("left");
  var right = document.getElementById("right");
  var page = document.getElementById("page");
  var pages = page.children;
  var radios = document.getElementById("radios");

  function setCookie(name, value, expiresHours) {
    var cookieString = name + "=" + escape(value);

    if (expiresHours > 0) {
      var date = new Date();
      date.setTime( date.getTime + expiresHours * 3600 * 1000);
      cookieString = cookieString + "; expires=" + date.toGMTString();
    }
    document.cookie = cookieString;
  }

  function addClass(index, name) {

    if (!pages[index]) return;
    pages[index].className += " " + name;
  }

  function removeClass() {
    for (var i = 0; i < pages.length; i++) {
      pages[i].className = "page";
    }
  }

  function direct(target) {
    left.style.display = "block";
    right.style.display = "block";
    if (index == 1) left.style.display = "none";
    if (index == pages.length) right.style.display = "none";
    location.href = target || "";
  }

  function prev() {
    if (index == 1) return;
    index --;
    direct("#page=" + index);
  }

  function next() {
    if (index == pages.length) return;
    index ++;
    direct("#page=" + index);
  }

  function slider() {
    removeClass();
    addClass(index, "next");
    addClass(index - 1, "current");
    addClass(index - 2, "prev");
  }

  var temp = "";

  for (var i = 0; i < pages.length; i++) {
    var current = pages[i];
    var tagName = current.tagName;
    var nextTag = pages[i + 1];
    var nextTagName = nextTag ? nextTag.tagName : null;

    if (tagName === "H1" || tagName === "H2") {
      temp += "<article class=\"page\"><div class=\"inner\">";
    }
    temp += current.outerHTML;

    if (nextTagName === "H1" || nextTagName === "H2") {
      temp += "<\/div><\/article>";
    }
  }

  page.innerHTML = temp + "<\/div><\/article>";
  pages = page.querySelectorAll(".page");

  radios.addEventListener("click", function(e) {

    if (e.target.nodeName === "INPUT" && e.target.value === "true") {
      setCookie("startserver-slide", false, 240);
      direct();
    }
  });
  global.addEventListener("hashchange", function() {
    index = location.hash.split("=")[1] || 1;
    slider();
  });
  left.addEventListener("click", function() {
    prev();
  });
  right.addEventListener("click", function() {
    next();
  });
  document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 39:
      case 40:
      case 32:
      case 78:
      case 13:
        e.preventDefault();
        next();
        break;
      case 37:
      case 38:
      case 80:
        e.preventDefault();
        prev();
        break;
    }
  });
  setTimeout(function() {
    slider();
    direct("#page=" + index);
    document.body.style.opacity = 1;
  }, 16);
})(this);
</script>
</body>
</html>
