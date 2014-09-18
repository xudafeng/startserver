<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<title><#=$title#></title>
<style>
html,body{margin:0;padding:0;height:100%;}
body {opacity: 0;-webkit-transition: all 1s ease;}
.right-top {position: absolute; top: 20px; right: 20px;}
#page {width: 100%;height:100%;text-align:center;position:relative;}
#page
.page{color:white;width:100%;height:100%;overflow:hidden;text-align:left;position:absolute;background:gray;opacity:0;transition:
all .5s ease;background:black;}
#page .page .inner{width: 90%;margin:0 auto;height: 100%;adding: 30px 10px;}
#page .prev {opacity:1;transform: translate(-100%, 0);}
#page .current {opacity:1;}
#page .next {opacity:1;transform: translate(100%, 0);}
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
<script>
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

function changPage(page, index) {
  removeClass(page);
  addClass(page[index], "current");
  addClass(page[index - 1], "prev");
  console.log(page[index + 1])
  addClass(page[index + 1], "next");
}

function initSlider() {
  var currentPage = 0;
  var page = document.getElementById("page")
  var nodes = page.childNodes;
  var res = "";
  for (var i = 0; i < nodes.length; i++) {
    var current = nodes[i];
    var tagName = current.tagName;

    if (tagName && tagName !== "SCRIPT") {
      var next = nodes[i + 2];
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
  page.innerHTML = res + "<\/article>";
  page = page.querySelectorAll(".page");
  window.addEventListener("hashchange", function() {
    var hash = location.hash.split("=")[1] || 0;
    changPage(page, hash - 1);
  })
  changPage(page, 0);
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
