<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
<style>
  body{
    background:#000;
    color:#6cce03;
  }
  a{
    color:#6cce03;
  }
</style>
</head>
<body>
<h1>Index of <#=$path#></h1>

<table>
    <thead>
    <tr>
        <th><a href="?C=N">Name</a></th>
        <th><a href="?C=M">Last modified</a></th>
        <th><a href="?C=S">Size</a></th>
    </thead>
    <#if $parentDir#>
    <tbody>
    <tr>
        <td colspan="3"><a href="<#=$parentDir#>">Parent Directory</a></td>
    </tr>
    </tbody>
    <#/if#>
    <tbody>
    <#each val,index in $list#>
        <tr>
            <td><a href="<#=$val.path#>"><#=$val.name#></a></td>
            <td><#=$val.lastModified#></td>
            <td><#=$val.size#></td>
        </tr>
    <#/each#>
    </tbody>
</table>
</body>
</html>
