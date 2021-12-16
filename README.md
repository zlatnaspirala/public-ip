# public-ip

```json
## WIP
```

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

Response:
```

```
