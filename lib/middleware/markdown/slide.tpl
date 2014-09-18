<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<title><#=$title#></title>
<style>
html,body{margin:0;padding:0;height:100%;}
body {opacity: 0;-webkit-transition: all 1s ease;color:#fff;font-family: "Verdana", "monaco", "Microsoft YaHei";}
.right-top {position: absolute; top: 20px; right: 20px;}
#page {width: 100%;height:100%;text-align:center;position:relative;}
#page
.page{color:white;width:100%;height:100%;overflow:auto;text-align:left;position:absolute;background:gray;opacity:0;transition:
all .5s ease;background:black;}
#page .page .inner{
margin: 0 auto;
height: 100%;
padding: 40px 100px;
}
#page .prev {opacity:1;transform: translate(-100%, 0);}
#page .current {opacity:1;}
#page .next {opacity:1;transform: translate(100%, 0);}
.page-switcher {
-webkit-transition: width 150ms, right 150ms, background-color 150ms;
background-color: rgba(123, 123, 123, 0.1);
border: none;
bottom: 0;
font-size: 40px;
margin: 0;
max-width: 150px;
min-width: 80px;
outline: none;
padding: 0;
position: absolute;
top: 0;
z-index: 999;
color: rgba(158, 158, 158, 0.5);
}
.page-switcher:hover, .page-switcher:focus {
cursor: pointer;
background-color: rgba(123, 123, 123, 0.2);
}
.inner a {
  text-decoration: none;
  color: rgb(35, 195, 0);
}
.inner h1 {
  font-size:50px;
  padding-bottom: 30px;
}
.inner h2 {
  font-size:40px;
  padding-bottom: 20px;
}
.inner h3 {
  font-size:30px;
  padding-bottom: 10px;
}
.inner h4 {
  font-size:20px;
  padding-bottom: 5px;
}
.inner p,
.inner blockquote,
.inner pre {
  font-size: 25px;
}
.inner blockquote,
.inner pre {
  background: rgb(47, 47, 47);
  border-radius: 10px;
  padding: 10px 20px;
  margin: 0;
}
.inner code {
  background: rgb(47, 47, 47);
  border-radius: 4px;
  padding: 2px 4px;
}
.inner ul,
.inner ol{
  font-size: 20px;
  background:rgb(47, 47, 47);
  border-radius: 10px;
  padding: 10px 50px;
}
.inner li {
  padding: 4px;
}
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
<button id="left" class="page-switcher" style="left: 0px; top: 0px;">&lsaquo;</button>
<button id="right"   class="page-switcher" style="right: 0px; top: 0px;">&rsaquo;</button>
<script>
var currentPage = location.hash.split("=")[1] || 1;
function setCookie(name, value, expiresHours) {
  var cookieString = name + "=" + escape(value);
  if (expiresHours > 0) {
    var date = new Date();
    date.setTime( date.getTime + expiresHours * 3600 * 1000);
    cookieString = cookieString + "; expires=" + date.toGMTString();
  }
  document.cookie = cookieString;
}

function addClass(node, name) {
  if (!node) return;
  node.className += " " + name;
}

function removeClass(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].className = "page";
  }
}

function changPage(page) {
  removeClass(page);
  addClass(page[currentPage], "current");
  addClass(page[currentPage - 1], "prev");
  addClass(page[currentPage + 1], "next");
}

function initSlider() {
  var page = document.getElementById("page");
  var nodes = page.childNodes;
  var res = "";
  for (var i = 0; i < nodes.length; i++) {
    var current = nodes[i];
    var tagName = current.tagName;

    if (tagName && tagName !== "SCRIPT") {
      var next = nodes[i + (tagName === "PRE" ? 1: 2)];
      var nextTaeName = next ? next.tagName : null;

      if (tagName === "H1" || tagName === "H2") {
        res += "<article class=\"page\"><div class=\"inner\">";
      }
      res += current.outerHTML;
      if (nextTaeName === "H1" || nextTaeName === "H2") {
        res += "<\/div><\/article>";
      }
    }
  }
  console.log(res)
  page.innerHTML = res + "<\/article>";
  page = page.querySelectorAll(".page");
  window.addEventListener("hashchange", function() {
    var hash = location.hash.split("=")[1];
    currentPage = hash;
    changPage(page);
  });
  document.getElementById("left").addEventListener("click", function() {
    currentPage --;
    location.href = "#page="+currentPage;
  });
  document.getElementById("right").addEventListener("click", function() {
    currentPage ++;
    location.href = "#page="+currentPage;
  });
  document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 39:
      case 40:
      case 32:
      case 78:
      case 13:
        e.preventDefault();
        currentPage ++;
        location.href = "#page="+currentPage;
        break;
      case 37:
      case 38:
      case 80:
        e.preventDefault();
        currentPage --;
        location.href = "#page="+currentPage;
        break;
    }
  });
  changPage(page);
  document.body.style.opacity = 1;
}
setTimeout(function() {
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
