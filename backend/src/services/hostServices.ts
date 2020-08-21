const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
import { Utilities } from '../shared/utilities';
import _ = require('lodash');
var hostile = require('hostile')
import { IHostDevice } from "../interfaces/interfaces";

export default class DnsService {

  async NewRulesForHostFile(data: any) {
    let devices: IHostDevice[] = await this.RawDataToArrayDevices(data.device)

    await this.FindIpInToHostsFile("s");

    // for (let i = 0; i < devices.length; i++) {
    //   devices[i]

    // }
  }

    async FindIpInToHostsFile(ip: string) {
    var preserveFormatting = false

    await hostile.get(preserveFormatting, function (err: any, lines: any) {
      if (err) {
        console.error(err.message)
      } else {
        for (let i = 0; i < lines.length; i++) {
          console.log(lines[i])
        }
      }
    })
  }
  

  async RawDataToArrayDevices(raw: any) {
    let temp: IHostDevice[] = raw
    return temp
  }

}