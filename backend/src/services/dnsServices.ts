const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');


export default class DnsService {
    async SendPostResponse(ip: string) {
        let request_data = {
            url: `http://${ip}:3800/dns_response`,
            method: 'POST',
            body: {
                params: {
                    dns: cfg.general.ipDnsServer
                }
            },
            json: true
        };
        await Utilities.request(request_data);
        console.log("DnsService - SendPostResponse: Post send! " + `(http://${ip}:3800/dns_response)`)
    }
}