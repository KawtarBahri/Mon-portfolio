const http = require('http');
const app = require('./app');

let port =3000
app.set('port', port);


const server = http.createServer(app);

server.listen(port);
