# Fast Http

[![Build Status](https://travis-ci.org/cedced19/fast-http.svg)](https://travis-ci.org/cedced19/fast-http)

## Installation

```
npm install fast-http  --save
```

## Usage

Create a tiny web server which does not support the MVC pattern,for simple Node.js app.
Because I copy the same code in all my projects.

## How to use

~~~ javascript
var fastHttp = require("fast-http"),
    port = 80;

httpServer = fastHttp(port);
~~~