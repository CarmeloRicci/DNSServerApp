const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');
var hostile = require('hostile')

export default class DnsService {

    async NewRulesForHostFile (data: any) {
        var preserveFormatting = false
 
        hostile.get(preserveFormatting, function (err: any, lines: any) {
          if (err) {
            console.error(err.message)
          }
          lines.forEach(function (line: any) {
            console.log(line) // [IP, Host]
          })
        })
    }
}