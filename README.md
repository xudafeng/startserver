startserver
===========

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/startserver.svg?style=flat-square
[npm-url]: https://npmjs.org/package/startserver
[travis-image]: https://img.shields.io/travis/xudafeng/startserver.svg?style=flat-square
[travis-url]: https://travis-ci.org/xudafeng/startserver
[coveralls-image]: https://img.shields.io/coveralls/xudafeng/startserver.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/xudafeng/startserver?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/startserver.svg?style=flat-square
[download-url]: https://npmjs.org/package/startserver

> Yet an other http server.

> And generate a slider easily.

## Installation

### Node requirement

\>= 0.10.x

### Install from npm

``` bash
$ npm i startserver -g
```

Use it for generator support, add this alias to your `.bash_profile`:

```
alias node='node --harmony'
```

## Quick Start

``` bash
$ startserver
```

It also can be use it like this:

``` base
$ startserver 6789
```

There are more shorter alias for cli:

``` base
$ start
$ server
$ ss
```

## Features

### Server Everywhere

Run it in every directory under the root.

  * Automatic detection of unoccupied port.

### Slider Revolution

Generate slider with `README` doc or other markdown file.

  * Suppor a inverse color style.
  * Double click for temporary modifications, again to restore.
  * Normal to read makedown.
  * Highlight for your code block.
  * Thumbnail mode provided.

### Others

  * Original javascript source code.
  * Generator support and compatible runtime.

## Cli Options

#### -s, --silent

Run server without open the default browser.

#### -g, --generate

Generate a static slider file. [[example]](https://rawgit.com/xudafeng/startserver/master/README.md.html)

``` bash
$ startsever -g README.md
```

## Help

``` bash
$ startserver -h
```

## License

The MIT License (MIT)

Copyright (c) 2013 xdf
