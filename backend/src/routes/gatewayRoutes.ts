const config = require('config');
import * as express from 'express';
const _ = require('lodash');
const router = express.Router();
import * as HttpStatus from 'http-status-codes';
const delay = require('delay');

import GatewayService from '../services/gatewayServices';
const gatewayService = new GatewayService();

router.post('/', async (req, res) => {
    const body = req.body;
    //var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var ip = req.connection.remoteAddress.split(":")[((req.connection.remoteAddress.split(":")).length)-1]
        //API che sta in ascolto per ricevere i dati dal DHCP server ed elaborali
    try {
        const params = body && body.params ? body.params : null;
        console.log("dnsRoutes received("+ip+"): ","PARAMS", params);
        if (params && params.ipdns) {
            const result = await delay(1000);
            await gatewayService;
        }
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.OK).send(error);
    }
});

module.exports = router;