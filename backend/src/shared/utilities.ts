const fs = require('fs');
const path = require('path');
const cfg = require('config');

import { IResultRequest } from "../interfaces/interfaces";
const request = require('request');

export class Utilities {

    // metodo che permette di scrivere un file
    // filename = path del file
    // content = contenuto da scrivere nel file
    static async writeFile(filename: string, content: string) {
        await fs.writeFile(filename, content, function (err: any) {
            if (err) console.log(err);
            else console.log("file saved");
        });
    }

    static request(request_data: any): any {

        const result: IResultRequest = {
            success: false,
            body: null,
            error: null
        };
        // let request_data = {
        //     url: cfg.provider.requestTokenGarmin,
        //     method: 'POST',
        // }
        // const headers = {};
        // request_data.headers = headers;
        return new Promise((resolve, reject) => {
            request(
                request_data,
                function (error: any, response: any, body: any) {
                    if (!error) {
                        result.success = true;
                    }
                    result.body = body;
                    result.error = error;
                    resolve(result);
                }
            );
        });
    }

}