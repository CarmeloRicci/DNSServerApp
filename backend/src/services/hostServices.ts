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
    console.log(data.TenantId,data.device)
    let devices: IHostDevice[] = await this.RawDataToArrayDevices(data.device)
    
    for (let i = 0; i < devices.length; i++) {
      console.log(i + " --> " +devices[i].ip)
      await this.FindIpInToHostsFile(devices[i])
    }

  }

  async FindIpInToHostsFile(device: IHostDevice) {
    
    const preserveFormatting = true

    let temp = new Array();
    await hostile.get(preserveFormatting, function (err: any, lines: any) {
      if (err) {
        console.error(err.message)
      }
      lines.forEach(function (line: any) {
        console.log(line[0], line[1]) // [IP, Host]
        temp.push ( [line[0], line[1] ])
      })
    })
      console.log("okok2", temp)
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
  }

}