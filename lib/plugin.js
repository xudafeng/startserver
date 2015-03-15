/* ================================================================
 * StartServer by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2014 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var foc = require('foc');
var path = require('path');
var logger = require('logx');
var fs = require('./file');

/**
 * load plugins
 */

var plugins = [];

function *localPlugins(pluginsDir) {
  var _list = [];
  var list = yield fs.readdir(pluginsDir);

  list.forEach(function(key) {
    var pluginPath = path.join(pluginsDir, key);

    if (fs.isExistedDir(pluginPath)) {
      _list.push(pluginPath);
    }
  });

  return _list;
}

function *pkgPlugins(plugins) {
  var _list = [];

  plugins.forEach(function(plugin) {
    Object.keys(plugin).map(function(key) {
      var pluginPath = path.resolve(path.join('node_modules', key));

      if (fs.isExistedDir(pluginPath)) {
        _list.push(pluginPath);
      }
    });
  });

  return _list;
}

function *plugin(load) {
  var list = [];
  var pluginsDir = path.join(__dirname, '..', 'plugins');

  if (fs.isExistedDir(pluginsDir)) {
    list = list.concat(yield *localPlugins(pluginsDir));
  }

  var pkgPath = path.resolve('./package.json');

  if (fs.isExistedFile(pkgPath)) {
    var pkg = require(pkgPath);

    if (pkg.startserver) {
      list = list.concat(yield *pkgPlugins(pkg.startserver));
    }
  }

  list.forEach(function(pluginPath) {
    var pluginPkg = path.join(pluginPath, 'package.json');
    pluginPkg = require(pluginPkg);
    var pluginIndex = path.join(pluginPath, pluginPkg.main);
    var name = pluginPkg.name;
    var version = pluginPkg.version;

    if (load) {
      var mod = require(pluginIndex);

      if (typeof mod === 'function') {
        plugins.push(mod);
        logger.info('Plugin ' + name.gray + '@'.gray + version.gray + ' loaded'.blue)
      }
    } else {
      console.log('  ' + name.blue + '@'.blue + version.blue);
    }
  });

  if (!load && !list.length) {
    logger.warn('not any plugins');
  }
  return plugins;
}

module.exports = plugin;
