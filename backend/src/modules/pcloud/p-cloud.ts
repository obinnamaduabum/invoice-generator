import pCloudSdk from 'pcloud-sdk-js';
import {PcloudStreamFile} from "../../interface/pcloud/pcloud-stream-file";
import axios from "axios";
import concat from "concat-stream";
import {PCloudPublicLinkInterface} from "../../interface/pcloud/public_link/pcloud_public_link";
const FormData = require('form-data');
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


    static deleteFile(path: string) {
        try {
            fs.unlinkSync(path)
        } catch (e) {
            console.log(e);
        }
    }

    async fileUpload(file) {

        const folderId = 9076583045;
        const url = `https://api.pcloud.com/uploadfile?folderid=${folderId}`;

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
        const pCloudStreamFile: PcloudStreamFile = responseBody['data'];
        const remove_backlash = pCloudStreamFile.path;
        const result = remove_backlash.replace(/\\\//g, "/");
        const imgUrl = `https://${pCloudStreamFile.hosts[0]}${result}`;
        return imgUrl;

    }


    async getPublicFileUrl(fileId: any): Promise<PCloudPublicLinkInterface> {
        const url = `https://api.pcloud.com/getfilepublink?fileid=${fileId}`;
        const config = {
            headers: {
                'Authorization': this.bearerAccessToken
            }
        }

        const responseBody = await axios.get(url, config);
        const pCloudStreamFile: PCloudPublicLinkInterface = responseBody['data'];
        return pCloudStreamFile;
    }


    async getThumbnailLink(fileId: number, code: string, width: number, height: number) {

        const url = `https://api.pcloud.com/getpubthumb?fileid=${fileId}&code=${code}&size=${width}x${height}`;
        // const responseBody = await axios.get(url);

        // console.log(responseBody);
        // console.log("responseBody: ");
        return url;
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


