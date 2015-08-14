# Fast Http

[![Build Status](https://travis-ci.org/cedced19/fast-http.svg)](https://travis-ci.org/cedced19/fast-http)
[![NPM version](https://badge.fury.io/js/fast-http.svg)](http://badge.fury.io/js/fast-http)

## Installation

```
npm install fast-http  --save
```

## Usage

Create a tiny web server which does not support the MVC pattern,for simple Node.js app.

Because I copy the same code in all my projects.

## How to use

Basic usage:
```javascript
var server = require('fast-http'),
    port = 80,
    root = __dirname,
    wordy = true;

server(port, root, wordy);

// __dirname is the name of the directory that the currently executing script resides in.
```

The third argument specified if it\'ll log all request.

If you want to use it with socket.io:

```javascript
var server = require('fast-http')(80, __dirname, false);

var io = require('socket.io').listen(server);
```

## CLI

[![NPM version](https://badge.fury.io/js/fast-http-cli.svg)](http://badge.fury.io/js/fast-http-cli)

Installation:
```bash
npm install fast-http-cli  -g
```

Options:
```
-h, --help                  output usage information

-V, --version               output the version number

-p, --port [number]         specified the port

-w, --wordy                 specified if it'll log all request
```

Use:
```bash
fast-http
```
