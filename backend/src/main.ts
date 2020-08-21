import * as express from 'express';
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const pubApiGatewayRoute = require('./routes/gatewayRoutes');
app.use('/record_leases', pubApiGatewayRoute);

console.log("Ci sono!")
app.listen(3888, () => {
  console.log('Application listening on port 3800!');
});

module.exports = app;
