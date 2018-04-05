# startserver

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
[node-image]: https://img.shields.io/badge/node.js-%3E=_4-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/startserver.svg?style=flat-square
[download-url]: https://npmjs.org/package/startserver

> Yet another http server.

## Installation

```shell
$ npm i startserver -g
```

## Quick Start

```shell
$ startserver
```

It also can be use it like this:

```shell
$ startserver -p 6789
```

There are more shorter alias for it:

```shell
$ ss
```

## Features

### Server Everywhere

Run it at every directory under the root.

  * Automatic detection of unoccupied port.

### Slider Revolution

Generate slider with `README.md` file or other markdown file.

  * Suppor a inverse color style.
  * Double click for temporary modifications, again to restore.
  * Normal to read makedown.
  * Highlight for your code block.
  * Thumbnail mode provided.
  * Watching markdown file.

### Others

  * Generator support and compatible runtime.
  * Original javascript source code.

## Commands

#### plugins

show plugin list

#### generate

```shell
$ startsever generate README.md
```

generate static slide file to markdown [[sample]](https://rawgit.com/xudafeng/startserver/master/README.md.html)

## Plugins

![logo](https://avatars3.githubusercontent.com/u/9607546?v=3&s=100)

[plugins list](//github.com/startserver)

## Options

#### -s, --silent

start http server without opening browser

#### -m, --markdown

auto parse and render markdown file

#### -f, --pdf

render markdown file with pdf style

#### -p, --port

port to use (8080 default)

#### -d, --disable

disable default index router

#### -v, --version

output version infomation

## Help

```shell
$ startserver -h
```

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars3.githubusercontent.com/u/1784595?v=4" width="100px;"/><br/><sub><b>karoo</b></sub>](https://github.com/karoo)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1622697?v=4" width="100px;"/><br/><sub><b>ottomao</b></sub>](https://github.com/ottomao)<br/>|[<img src="https://avatars3.githubusercontent.com/u/15025212?v=4" width="100px;"/><br/><sub><b>zhuyali</b></sub>](https://github.com/zhuyali)<br/>
| :---: | :---: | :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto upated at `Thu Apr 05 2018 23:04:18 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)

Copyright (c) 2013 xdf
