# public-ip

```json
Microservice based on node.js
```
Source:
`https://github.com/zlatnaspirala/public-ip`

NPM:
`npm i `

This is standalone app without any external microservice call. Service works on Node.js. You need to start it on public server and you will have your own microservice link.

### Running microService format
```json
node yourAppName.js <PROTOCOL> <PORT> <SSLPATH_PRIVATEKEY> <SSLPATH_CERT>
```

### Running microservice publicIP on `http` protocol
```js
node test.js http 9999
```

### Running microservice publicIP on `https` protocol with your domain SSL
```js
node test.js https 9999 "/etc/letsencrypt/live/maximumroulette.com/privkey.pem" "/etc/letsencrypt/live/maximumroulette.com/fullchain.pem"
```

### Usage (test.js)
```js
var myMicroService = require("./index.js");
myMicroService.publicIP.start();
```

On frontend just call route:

```
http://YOUT_DOMAIN:9999
```

Response [JSON]:
```
{"message":"Microservice publicIP - MIT Licence https://github.com/zlatnaspirala/public-ip 2021","ipaddress":"87.116.**.**"}
```

Take a look at:
https://maximumroulette.com:9999
