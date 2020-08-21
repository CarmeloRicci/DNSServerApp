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

    for (let i = 0; i < devices.length; i++) {
      await this.FindIpInToHostsFile(devices[i])
    }

  }

    async FindIpInToHostsFile(device: IHostDevice) {
    var preserveFormatting = false

    await hostile.get(preserveFormatting, function (err: any, lines: any) {
      if (err) {
        console.error(err.message)
      } else {
        for (let i = 0; i < lines.length; i++) {
          console.log(i + " -> " + lines[i])
          if (device.ip == lines[i][0]) {
            if (device.host != lines[i][1]){
              this.UpdateRecordHostsFile(device,lines[i][1])
            }            
          }else{
            this.InsertRecordHostsFile(device)
          }

        }
      }
    })
  }
  

  async RawDataToArrayDevices(raw: any) {
    let temp: IHostDevice[] = raw
    return temp
  }

  async UpdateRecordHostsFile(device: IHostDevice, oldhostname: string){
    await hostile.remove(device.ip, oldhostname, function (err: any) {
      if (err) {
        console.error(err)
      } else {
        console.log('set /etc/hosts successfully!')
      }
    })
    await this.InsertRecordHostsFile(device)
  }

  async InsertRecordHostsFile(device: IHostDevice){
    await hostile.set(device.ip, device.host, function (err: any) {
      if (err) {
        console.error(err)
      } else {
        console.log('set /etc/hosts successfully!')
      }
    })
  }

}