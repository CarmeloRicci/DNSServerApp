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
    
    const preserveFormatting = false

    let temp:any
    await hostile.get(preserveFormatting, function (err: any, lines: any) {
      if (err) {
        console.error(err.message)
      }
      temp = lines
      lines.forEach(function (line: any) {
        console.log(line) // [IP, Host]
      })
    })

    for (let i = 0; i < temp.length; i++) {
          console.log(i + " -> " + temp[i])
          if (device.ip == temp[i][0]) {
            if (device.host != temp[i][1]) {
              await this.UpdateRecordHostsFile(device, temp[i][1])
            }
          } else {
            await this.InsertRecordHostsFile(device)
          }

        }
      }


  async RawDataToArrayDevices(raw: any) {
    let temp: IHostDevice[] = raw
    return temp
  }

  async UpdateRecordHostsFile(device: IHostDevice, oldhostname: string) {
    await hostile.remove(device.ip, oldhostname, function (err: any) {
      if (err) {
        console.error(err)
      } else {
        console.log('set /etc/hosts successfully!')
      }
    })
    await this.InsertRecordHostsFile(device)
  }

  async InsertRecordHostsFile(device: IHostDevice) {
    await hostile.set(device.ip, device.host, function (err: any) {
      if (err) {
        console.error(err)
      } else {
        console.log('set /etc/hosts successfully!')
      }
    })
    return 0
  }

}