import pCloudSdk from 'pcloud-sdk-js';
import {PcloudResponseInterface} from "../../interface/pcloud/pcloud-response";
import {PcloudStreamFile} from "../../interface/pcloud/pcloud-stream-file";
import {MySequences} from "../../utils/sequence_generator";
import {MySequenceTypeConstant} from "../../lh_enum/sequence_type";
import {MyUtils} from "../../utils/my_util";
import * as https from "https";
import axios from "axios";
import concat from "concat-stream";

const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');

export class PCloud {

    client: any;
    bearerAccessToken: string;
    plainAccessToken: string = '';
    url: string;

    constructor() {
        this.client = pCloudSdk.createClient(process.env.PCLOUD_ACCESS_TOKEN);
        if (process.env.PCLOUD_ACCESS_TOKEN) {
            this.plainAccessToken = process.env.PCLOUD_ACCESS_TOKEN;
        }
        this.bearerAccessToken = `Bearer ${process.env.PCLOUD_ACCESS_TOKEN}`;
        this.url = 'https://api.pcloud.com/uploadfile';
    }

    async upload(file: any, _type: any) {

        console.log("cccccccc: ");
        console.log(file);

        const folderId: number = 0;

        this.client.listfolder(0).then((fileMetadata) => {
            console.log("fileMetadata: ");
            console.log(fileMetadata);
        });

        // return new Promise(((resolve, reject) => {
        //
        //
        //
        //     this.client.upload(file, folderId, {
        //         onBegin: () => {
        //             console.log('started');
        //         },
        //         onProgress: function(progress) {
        //             console.log(progress.loaded, progress.total);
        //         },
        //         onFinish: function(fileMetadata) {
        //             console.log('finished', fileMetadata);
        //             resolve(true);
        //         }
        //     }).catch(function(error) {
        //         console.error(error);
        //         reject(false);
        //     });
        //
        // }));
    }

    static async getFileWithStream(fileId: any, plainAccessToken: string) {
        try {
            const url = 'https://api.pcloud.com/getfilelink?fileid=';
            // return rp.get({
            //     url: url + fileId,
            //     auth: {bearer: plainAccessToken},
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }).then((body: any) => {
            //     const pcloudStreamFile: PcloudStreamFile = JSON.parse(body);
            //     const remove_backlash = pcloudStreamFile.path;
            //     const result = remove_backlash.replace(/\\\//g, "/");
            //     const url = 'https://' + pcloudStreamFile.hosts[0] + result;
            //     console.log('Upload successful!  Server responded with:' + url);
            //     return url;
            // }, (_error: any) => {
            //
            // });
        } catch (e) {
            console.log(e);
        }
    }

    static deleteFile(path: string) {
        try {
            fs.unlinkSync(path)
        } catch (e) {
            console.log(e);
        }
    }

    async axiosFileUpload(file: any) {


        const url = "https://api.pcloud.com/uploadfile";

        const formData = new FormData();
        const stream = fs.createReadStream(file);
        formData.append('file', stream);
        // form.append('folderid',  0);

        const requestConfig = {
            headers: {
                'Authorization': this.bearerAccessToken,
                'Content-Type': `multipart/form-data` ,
                'Connection': 'keep-alive'
            }, timeout: 0
        };

        return axios.post(url, formData, requestConfig);
    }


    async nodeFetchUpload(file: any) {

        const url = "https://api.pcloud.com/uploadfile";

        const form = new FormData();
        const buffer = fs.readFileSync(file);
        form.append('file', file);

        const headers = {
            'Authorization': this.bearerAccessToken,
            'Content-Type': `multipart/form-data` ,
            'Connection': 'keep-alive'
        };

        const httpsAgent = new https.Agent({
            keepAlive: true
        });

        fetch(`${url}`, { method: 'POST', body: form, headers: headers, timeout: 3600, agent: httpsAgent })
            .then(res => res.json())
            .then(json => console.log(json));
    }


    async fileUpload(file) {

        const url = "https://api.pcloud.com/uploadfile";

        const form = new FormData();
        const buffer = fs.createReadStream(file);
        form.append('file', buffer);

        //Concat the formData.
        const concatenated = await new Promise((resolve, reject) => {
            form.pipe(concat({ encoding: 'buffer' }, async (data) => {
                resolve(data);
            }));
        });

        const config = {
            headers: {
                ...form.getHeaders(),
                'Authorization': this.bearerAccessToken
            }
        }

        return axios.post(url, concatenated, config);
    }

    async getFileImgUrl(fileId: any) {
        const url = `https://api.pcloud.com/getfilelink?fileid=${fileId}`;
        const config = {
            headers: {
                'Authorization': this.bearerAccessToken
            }
        }

        const responseBody = await axios.get(url, config);

        // console.log(responseBody);
        const pCloudStreamFile: PcloudStreamFile = responseBody['data'];
        const remove_backlash = pCloudStreamFile.path;
        const result = remove_backlash.replace(/\\\//g, "/");
        const imgUrl = 'https://' + pCloudStreamFile.hosts[0] + result;
        console.log('Upload successful!  Server responded with:' + url);
        return imgUrl;

    }

    async axiosFetchFolderList() {

        const folderId: number = 9069382220;
        const url = `https://api.pcloud.com/listfolder?folderid=${folderId}`;
        const request_config = {
            headers: {
                'Authorization': this.bearerAccessToken,
            }
        };

        return axios.get(url, request_config);
    }
}


