<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<title><#=title#></title>
<style>
body {padding: 0 20%; opacity: 0;transition: all 1s ease;}
.right-top {position: fixed; top: 20px; right: 20px;}
/* markdown */
.markdown{overflow:hidden;font-family:"Helvetica Neue",Helvetica,"Segoe UI",Arial,freesans,sans-serif;font-size:16px;line-height:1.6;word-wrap:break-word}.markdown>*:first-child{margin-top:0!important}.markdown>*:last-child{margin-bottom:0!important}.markdown .absent{color:#c00}.markdown .anchor{position:absolute;top:0;bottom:0;left:0;display:block;padding-right:6px;padding-left:30px;margin-left:-30px}.markdown .anchor:focus{outline:0}.markdown h1,.markdown h2,.markdown h3,.markdown h4,.markdown h5,.markdown h6{position:relative;margin-top:1em;margin-bottom:16px;font-weight:bold;line-height:1.4}.markdown h1 .octicon-link,.markdown h2 .octicon-link,.markdown h3 .octicon-link,.markdown h4 .octicon-link,.markdown h5 .octicon-link,.markdown h6 .octicon-link{display:none;color:#000;vertical-align:middle}.markdown h1:hover .anchor,.markdown h2:hover .anchor,.markdown h3:hover .anchor,.markdown h4:hover .anchor,.markdown h5:hover .anchor,.markdown h6:hover .anchor{height:1em;padding-left:8px;margin-left:-30px;line-height:1;text-decoration:none}.markdown h1:hover .anchor .octicon-link,.markdown h2:hover .anchor .octicon-link,.markdown h3:hover .anchor .octicon-link,.markdown h4:hover .anchor .octicon-link,.markdown h5:hover .anchor .octicon-link,.markdown h6:hover .anchor .octicon-link{display:inline-block}.markdown h1 tt,.markdown h1 code,.markdown h2 tt,.markdown h2 code,.markdown h3 tt,.markdown h3 code,.markdown h4 tt,.markdown h4 code,.markdown h5 tt,.markdown h5 code,.markdown h6 tt,.markdown h6 code{font-size:inherit}.markdown h1{padding-bottom:.3em;font-size:2.25em;line-height:1.2;border-bottom:1px solid #eee}.markdown h2{padding-bottom:.3em;font-size:1.75em;line-height:1.225;border-bottom:1px solid #eee}.markdown h3{font-size:1.5em;line-height:1.43}.markdown h4{font-size:1.25em}.markdown h5{font-size:1em}.markdown h6{font-size:1em;color:#777}.markdown p,.markdown blockquote,.markdown ul,.markdown ol,.markdown dl,.markdown table,.markdown pre{margin-top:0;margin-bottom:16px}.markdown hr{height:4px;padding:0;margin:16px 0;background-color:#e7e7e7;border:0 none}.markdown ul,.markdown ol{padding-left:2em}.markdown ul.no-list,.markdown ol.no-list{padding:0;list-style-type:none}.markdown ul ul,.markdown ul ol,.markdown ol ol,.markdown ol ul{margin-top:0;margin-bottom:0}.markdown li>p{margin-top:16px}.markdown dl{padding:0}.markdown dl dt{padding:0;margin-top:16px;font-size:1em;font-style:italic;font-weight:bold}.markdown dl dd{padding:0 16px;margin-bottom:16px}.markdown blockquote{padding:0 15px;color:#777;border-left:4px solid #ddd}.markdown blockquote>:first-child{margin-top:0}.markdown blockquote>:last-child{margin-bottom:0}.markdown table{display:block;width:100%;overflow:auto;word-break:normal;word-break:keep-all}.markdown table th{font-weight:bold}.markdown table th,.markdown table td{padding:6px 13px;border:1px solid #ddd}.markdown table tr{background-color:#fff;border-top:1px solid #ccc}.markdown table tr:nth-child(2n){background-color:#f8f8f8}.markdown img{max-width:100%;-moz-box-sizing:border-box;box-sizing:border-box}.markdown span.frame{display:block;overflow:hidden}.markdown span.frame>span{display:block;float:left;width:auto;padding:7px;margin:13px 0 0;overflow:hidden;border:1px solid #ddd}.markdown span.frame span img{display:block;float:left}.markdown span.frame span span{display:block;padding:5px 0 0;clear:both;color:#333}.markdown span.align-center{display:block;overflow:hidden;clear:both}.markdown span.align-center>span{display:block;margin:13px auto 0;overflow:hidden;text-align:center}.markdown span.align-center span img{margin:0 auto;text-align:center}.markdown span.align-right{display:block;overflow:hidden;clear:both}.markdown span.align-right>span{display:block;margin:13px 0 0;overflow:hidden;text-align:right}.markdown span.align-right span img{margin:0;text-align:right}.markdown span.float-left{display:block;float:left;margin-right:13px;overflow:hidden}.markdown span.float-left span{margin:13px 0 0}.markdown span.float-right{display:block;float:right;margin-left:13px;overflow:hidden}.markdown span.float-right>span{display:block;margin:13px auto 0;overflow:hidden;text-align:right}.markdown code,.markdown tt{padding:0;padding-top:.2em;padding-bottom:.2em;margin:0;font-size:85%;background-color:rgba(0,0,0,0.04);border-radius:3px}.markdown code:before,.markdown code:after,.markdown tt:before,.markdown tt:after{letter-spacing:-0.2em;content:"\00a0"}.markdown code br,.markdown tt br{display:none}.markdown del code{text-decoration:inherit;vertical-align:text-top}.markdown pre>code{padding:0;margin:0;font-size:100%;word-break:normal;white-space:pre;background:transparent;border:0}.markdown .highlight{margin-bottom:16px}.markdown .highlight pre,.markdown pre{padding:16px;overflow:auto;font-size:85%;line-height:1.45;background-color:#f7f7f7;border-radius:3px}.markdown .highlight pre{margin-bottom:0;word-break:normal}.markdown pre{word-wrap:normal}
.markdown pre code,.markdown pre tt{display:inline;max-width:initial;padding:0;margin:0;overflow:initial;line-height:inherit;word-wrap:normal;background-color:transparent;border:0}.markdown pre code:before,.markdown pre code:after,.markdown pre tt:before,.markdown pre tt:after{content:normal}
/* highlight */
.hljs{display:block;overflow-x:auto;padding:.5em;background:#fdf6e3;color:#657b83;-webkit-text-size-adjust:none}.hljs-comment,.hljs-template_comment,.diff .hljs-header,.hljs-doctype,.hljs-pi,.lisp .hljs-string,.hljs-javadoc{color:#93a1a1}.hljs-keyword,.hljs-winutils,.method,.hljs-addition,.css .hljs-tag,.hljs-request,.hljs-status,.nginx .hljs-title{color:#859900}.hljs-number,.hljs-command,.hljs-string,.hljs-tag .hljs-value,.hljs-rules .hljs-value,.hljs-phpdoc,.hljs-dartdoc,.tex .hljs-formula,.hljs-regexp,.hljs-hexcolor,.hljs-link_url{color:#2aa198}.hljs-title,.hljs-localvars,.hljs-chunk,.hljs-decorator,.hljs-built_in,.hljs-identifier,.vhdl .hljs-literal,.hljs-id,.css .hljs-function{color:#268bd2}.hljs-attribute,.hljs-variable,.lisp .hljs-body,.smalltalk .hljs-number,.hljs-constant,.hljs-class .hljs-title,.hljs-parent,.hljs-type,.hljs-link_reference{color:#b58900}.hljs-preprocessor,.hljs-preprocessor .hljs-keyword,.hljs-pragma,.hljs-shebang,.hljs-symbol,.hljs-symbol .hljs-string,.diff .hljs-change,.hljs-special,.hljs-attr_selector,.hljs-subst,.hljs-cdata,.css .hljs-pseudo,.hljs-header{color:#cb4b16}.hljs-deletion,.hljs-important{color:#dc322f}.hljs-link_label{color:#6c71c4}.tex .hljs-formula{background:#eee8d5}
</style>
<base target="_blank"/>
</head>
<body>
<div id="page" class="markdown">
<#=content#>
</div>
<div class="right-top" id="radios">
  <label>normal</label>
  <input type="radio" name="slide" checked value="true" />
  <label>slide</label>
  <input id="slide" type="radio" name="slide" value="false"/>
</div>
<script>
+function(global, undefined) {
  var invert = document.getElementById('invert');
  var isSlide = document.getElementById('slide').checked;
  function setCookie(name, value, expiresHours) {
    var cookieString = name + '=' + escape(value);
    if ( expiresHours > 0 ) {
      var date = new Date();
      date.setTime( date.getTime + expiresHours * 3600 * 1000);
      cookieString = cookieString + '; expires=' + date.toGMTString();
    }
    document.cookie = cookieString;
  }
  document.getElementById('radios').addEventListener('click', function(e) {
    if (e.target.nodeName === 'INPUT' && e.target.value === 'false') {
      setCookie('startserver-slide', true, 240);
      location.href = '';
    }
  });
  setTimeout(function() {
    document.body.style.opacity = 1;
  }, 16);
}(this);
</script>
</body>
</html>
