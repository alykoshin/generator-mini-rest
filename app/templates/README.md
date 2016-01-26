[![npm version](https://badge.fury.io/js/<%= pkgName %>.svg)](http://badge.fury.io/js/<%= pkgName %>)
[![Build Status](https://travis-ci.org/<%= githubName %>/<%= pkgName %>.svg)](https://travis-ci.org/<%= githubName %>/<%= pkgName %>)
[![Coverage Status](https://coveralls.io/repos/<%= githubName %>/<%= pkgName %>/badge.svg?branch=master&service=github)](https://coveralls.io/github/<%= githubName %>/<%= pkgName %>?branch=master)
[![Code Climate](https://codeclimate.com/github/<%= githubName %>/<%= pkgName %>/badges/gpa.svg)](https://codeclimate.com/github/<%= githubName %>/<%= pkgName %>)
[![Inch CI](https://inch-ci.org/github/<%= githubName %>/<%= pkgName %>.svg?branch=master)](https://inch-ci.org/github/<%= githubName %>/<%= pkgName %>)

[![Dependency Status](https://david-dm.org/<%= githubName %>/<%= pkgName %>/status.svg)](https://david-dm.org/<%= githubName %>/<%= pkgName %>#info=dependencies)
[![devDependency Status](https://david-dm.org/<%= githubName %>/<%= pkgName %>/dev-status.svg)](https://david-dm.org/<%= githubName %>/<%= pkgName %>#info=devDependencies)


# <%= pkgName %>

<%= pkgDesc %>


If you have different needs regarding the functionality, please add a [feature request](https://github.com/<%= githubName %>/<%= pkgName %>/issues).


# Prerequisites

If not othwerwise mentioned, all examples are provided for Linux system.


# Node installation
## Ubuntu / Debian

```sh
$ sudo apt-get install nodejs npm
```

## Windows
https://nodejs.org/download/ -> Windows Installer (.msi) - 64-bit


# Application Installation

```sh
- download project archive 
- unzip it: `unzip -d app source-*`
- cd to new directory: `cd app`
- install dependencies: `npm install`
```

# Start 
To start the application run in command line

```sh
node .
```

By default the application uses TCP port 8080 for HTTP and 8081 for HTTPS.
In case you getting 'Error: listen EADDRINUSE' message, that means the port is in use;
you can change it if needed:
 - lib/index.js, line 9
 - public/test.html, lines 15, 43



# Using web browser to test the application

Application includes minimal HTTP server for static content.
Open the browser and enter http://localhost:3022/test.html
You will see a test page to send POST with following choices:
- Post with jQuery Ajax (JSON encoded)
- Post with jQuery Ajax (URL-encoded)
- Regular Form Submit (URL-encoded)

All the data form requests body are parsed, printed in console.log and stored in file 'requests.txt'


# Using curl to test the application

## Send urlencoded data

$ curl -v -X POST -d text="some text" http://localhospost_urlencoded
* Hostname was NOT found in DNS cache
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 3022 (#0)
> POST /post_urlencoded HTTP/1.1
> User-Agent: curl/7.38.0
> Host: localhost:3022
> Accept: */*
> Content-Length: 14
> Content-Type: application/x-www-form-urlencoded
>
* upload completely sent off: 14 out of 14 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 7
< ETag: W/"7-6f00dfb2"
< Vary: Accept-Encoding
< Date: Tue, 26 May 2015 09:40:36 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact


## Send JSON data

$ curl -v -H "Content-Type: application/json" -X POST -d '{"text":"some text" }' http://localhost:3022/post_json
* Hostname was NOT found in DNS cache
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 3022 (#0)
> POST /post_json HTTP/1.1
> User-Agent: curl/7.38.0
> Host: localhost:3022
> Accept: */*
> Content-Type: application/json
> Content-Length: 21
>
* upload completely sent off: 21 out of 21 bytes
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 20
< ETag: W/"14-6f9ca026"
< Vary: Accept-Encoding
< Date: Tue, 26 May 2015 09:35:42 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
{"result":"success"}


# Tests

# TODO

-

# Credits
[<%= fullName %>](https://github.com/<%= githubName %>/)


# Links to package pages:

[github.com](https://github.com/<%= githubName %>/<%= pkgName %>) &nbsp; [npmjs.com](https://www.npmjs.com/package/<%= pkgName %>) &nbsp; [travis-ci.org](https://travis-ci.org/<%= githubName %>/<%= pkgName %>) &nbsp; [coveralls.io](https://coveralls.io/github/<%= githubName %>/<%= pkgName %>) &nbsp; [inch-ci.org](https://inch-ci.org/github/<%= githubName %>/<%= pkgName %>)


## License

MIT
