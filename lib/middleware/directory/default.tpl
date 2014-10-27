<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<style>
body{font-family: "Helvetica Neue",Helvetica,"Segoe UI",Arial,freesans,sans-serif;}
h1{padding: 0 12px;}
thead th{padding:6px 12px;text-align:left;border-bottom: 1px #ccc solid;}
td{padding: 8px 12px 0 12px;}
</style>
</head>
<body>
<h1>Index of <#=path#></h1>
<table>
  <thead>
    <tr>
    <th>Name</th>
    <th>Last modified</th>
    <th>Size</th>
  </thead>
  <#if (parentDir) {#>
  <tbody>
    <tr>
      <td colspan="3"><a href="<#=parentDir#>">Parent Directory</a></td>
    </tr>
  </tbody>
  <#}#>
  <tbody>
  <#for (var i =0; i< list.length; i++) {#>
    <#var item = list[i]#>
    <tr>
      <td><a href="<#=item.path#>"><#=item.name#></a></td>
      <td><#=item.lastModified#></td>
      <td><#=item.size#></td>
    </tr>
  <#}#>
  </tbody>
</table>
</body>
</html>
