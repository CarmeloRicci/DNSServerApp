const config = require('config');
import * as express from 'express';
const _ = require('lodash');
const router = express.Router();
import * as HttpStatus from 'http-status-codes';
import DNSService from '../../services/dnsService';
import DeviceRegistrationStore from '../../stores/deviceStore';
const dnsService = new DNSService();
const deviceRegistrationStore = new DeviceRegistrationStore();
const delay = require('delay');

const factory = require('../../shared/factory');

router.post('/add/', async (req, res) => {
    const body = req.body;
    //API che sta in ascolto per ricevere i dati dal DHCP server ed elaborali
    try {

        const params = body && body.params ? body.params : null;

        try {
            const deviceRes = await deviceRegistrationStore.findBy(params);
            let message = '';
            if (!deviceRes || deviceRes.length == 0) {
                const resCreation = await deviceRegistrationStore.create(params);
                console.log("resCreatio", resCreation);

                if (resCreation && resCreation.length == 1) {
                    message = 'Device successfully created'
                    const result = factory.generateSuccessResponse(null, null, message);
                    res.status(HttpStatus.OK).json(result);
                } else {
                    const result = factory.generateErrorResponse(null, null, 'Error');
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
                }
            } else {
                message = 'Device already exists.'
                const result = factory.generateSuccessResponse(null, null, message);
                res.status(HttpStatus.OK).json(result);
            }
        } catch (error) {
            console.log("ERR", error);
            const result = factory.generateErrorResponse(null, null, 'Error');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
        }
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.OK).send(error);
    }
});


// ----- API che sta in ascolto delle richieste dei gateway per avere il dns ----- \\
router.post('/dns_request', async (req, res) => {
    const body = req.body;
    var ip = req.connection.remoteAddress.split(":")[((req.connection.remoteAddress.split(":")).length) - 1]
    try {
        const params = body && body.params ? body.params : null;
        console.log("dnsRoutes received(" + ip + "): ", "PARAMS", params);
        if (params && params.ipdns) {
            const result = await delay(1000);
            await dnsService.SendPostResponse(ip);
        }
        res.status(HttpStatus.OK).send();
    } catch (error) {
        res.status(HttpStatus.OK).send(error);
    }
});

module.exports = router;