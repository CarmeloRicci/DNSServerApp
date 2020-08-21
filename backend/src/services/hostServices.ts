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
    console.log(data.TenantId, data.device)
    let devices: IHostDevice[] = await this.RawDataToArrayDevices(data.device)
    try {
      const tempfilehost: any = await this.GetHostsFile()

      for (let i = 0; i < devices.length; i++) {
        console.log(i + " --> " + devices[i].ip)
        await this.FindIpInToHostsFile(tempfilehost, devices[i])
      }




    } catch (error) {
      console.log("error", error);
    }
  }

  async GetHostsFile() {
    try {
      const promise: any = new Promise((resolve, reject) => {
        const preserveFormatting = false

        let hosts: IHostDevice[] = new Array();
        let temp: IHostDevice
        hostile.get(preserveFormatting, function (err: any, lines: any) {
          if (err) {
            console.error(err.message)
          }
          for (let i = 0; i < lines.length; i++) {
            console.log(lines[i][0], lines[i][1])
            temp = { ip: lines[i][0], host: lines[i][1], mac: "" }
            //console.log(temp.ip, temp.host)
            hosts.push(temp)
            resolve(hosts)
          }
        })
      })
      return promise
    } catch (error) {
      console.log("ERRR", error);
    }
  }

  async FindIpInToHostsFile(hostsfile: any, device: IHostDevice) {

    let flag:boolean = false
    for (let i = 0; i < hostsfile.length; i++) {
      //console.log(i + " -> " + hostsfile[i])
      if (device.ip == hostsfile[i].ip) {
        flag = true;
        if (device.host != hostsfile[i].host) {
          await this.UpdateRecordHostsFile(device, hostsfile[i].host)
        }
      }
    }
    if (flag == false) await this.InsertRecordHostsFile(device)
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