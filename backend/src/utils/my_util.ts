import axios, {AxiosRequestConfig} from "axios";
import {resolve} from "path";
import {Op, Sequelize, where} from "sequelize";
import {MySequences} from "./sequence_generator";
import {MySequenceTypeConstant} from "../lh_enum/sequence_type";
const psl = require('psl');
const mime = require('mime-types');
const FormData = require('form-data');
const SqlString = require('sqlstring');
// const sanitizer = require('sanitize');
const sanitizer = require('sanitizer');
const fs = require('fs');

export class MyUtils {

    static isObjectEmpty(obj: any) {
       return Object.keys(obj).length === 0;
    }

    static async writeFile(path: string, file: any) {

       return new Promise((resolve, reject) => {
            fs.writeFile(path, file, function(err) {
                if(err) {
                    reject(false);
                }
                resolve(true);
            });
        });
    }


    static async getPaginationAndLimitParams(page: any, limit: any) {

        let limitInt = 10;
        let pageInt = 0;
        if(page){
            try {
                pageInt = parseInt(page.toString());
            } catch (e) {

            }
        }

        if(limit){
            try {
                limitInt = parseInt(limit.toString());
            } catch (e) {

            }
        }

        return {
            page: pageInt,
            limit: limitInt
        }

    }


    static async deleteFile(path: string) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err);
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    static async generateCode(field: string, mySequence: MySequenceTypeConstant) {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDay();
        const uniqueIdUser = await MySequences.getSequenceId(mySequence);
        const uniqueIdNameUser = field.toUpperCase();
        const getCurrentTime = new Date().getTime().toString().slice(0, 2);
        return MyUtils.formatString("{0}{1}{2}{3}{4}{5}", uniqueIdNameUser, year.toString(),
            month.toString(), day.toString(), uniqueIdUser, getCurrentTime);
    }

    static formatString(str: string, ...val: string[]) {
        for (let index = 0; index < val.length; index++) {
            str = str.replace(`{${index}}`, val[index]);
        }
        return str;
    }

    static removeWhiteSpace(input: string) {
        return input.replace(/\s+/g, '');
    }

    static numberWithCommas(x) {
        let parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    static async emailValidator(value: string) {
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(value).toLowerCase());
    }

    static numberValidator(value: string) {
        let numberRegex = /^[0-9]+$/;
        return numberRegex.test(String(value).toLowerCase());
    }

    static removeSpace(value: string) {
        return value.replace(/\s+/g, '');
    }


    static stringDateConversion(dateString: string) {
        const date = new Date(dateString);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return [day, month, date.getFullYear()].join("/");

    }

    static stringToDate(date: string, format: string, delimiter: string) {

        try {

            let formatLowerCase = format.toLowerCase();
            let formatItems = formatLowerCase.split(delimiter);
            let dateItems = date.split(delimiter);
            let monthIndex = formatItems.indexOf("mm");
            let dayIndex = formatItems.indexOf("dd");
            let yearIndex = formatItems.indexOf("yyyy");
            let month = parseInt(dateItems[monthIndex]);
            let year = parseInt(dateItems[yearIndex]);
            let day = parseInt(dateItems[dayIndex]);
            month -= 1;
            let formattedDate = new Date(year, month, day);
            return formattedDate;
        } catch (e) {
            throw e;
        }


        // stringToDate("17/9/2014","dd/MM/yyyy","/");
        // stringToDate("9/17/2014","mm/dd/yyyy","/")
        // stringToDate("9-17-2014","mm-dd-yyyy","-")
    }

    static indexOfArray(array: string[], origin: any) {
        // console.log('origin were searching for: ' + origin);
        const exactHostname = MyUtils.extractHostname(origin);
        // console.log('exactHostname: ' + exactHostname);
        const foundIndex = array.indexOf(exactHostname);
        // console.log('found index: '+ foundIndex);
        return foundIndex;
    }


    static toTimeStamp(date: string) {
        const datum: Date = new Date(date);
        return datum.getTime();
    }


    static dateToTimeStamp(date: Date) {
        return date.getTime();
    }


    static calculateNumberOfPages(totalItems: number, limit: number) {
        return Math.ceil(totalItems/limit);
    }

    static pageNumber(pageNumber: number, pageSize: number, index: number) {
        if (pageNumber == 0) {
           return  (index + 1);
        } else {
            return (index + pageSize + pageNumber);
        }
    }

    static extractHostname(url: string) {
        let hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        const hostNameOrIpOnlyNoPort = hostname.split(':')[0];

        console.log(hostname);

        if(hostname.includes('localhost')){
            return hostname;
        }

        const isIp = MyUtils.validateIPaddress(hostNameOrIpOnlyNoPort);

        // console.log(isIp);

        if(isIp) {
            console.log(' hostname : ' + hostname);
            return hostname;

        } else {
            //find & remove "?"
            hostname = hostname.split('?')[0];
            return psl.get(hostname);
        }
    }


    static validateIPaddress(ipaddress: string) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return true;
        }
        // alert("You have entered an invalid IP address!");
        return false;
    }


    static addMinutesToDate(date: Date, minutes: number) {
        return new Date(date.getTime() + minutes*60000);
    }


    static addHoursToDate(date: Date, hours: number) {
        return new Date(date.getTime() + (hours*60*60*1000));
    }

    static removeHoursToDate(date: Date, hours: number) {
        return new Date(date.getTime() - (hours*60*60*1000));
    }


    static addDaysToDate(days: number) {
        const date = new Date();
        return date.setDate(date.getDate() + days);

    }


    static randomString(length: number) {
        const chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }


    static randomStringOfNumbers(length: number) {
        const chars: string = '0123456789';
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }


    static async createWriteStream(path: string, response: any) {
        return new Promise((resolve, reject) => {
            const writeStream = response.data.pipe(fs.createWriteStream(path));
            writeStream.on('finish', function() {
                resolve('all done!');
            });
            writeStream.on('error', function(err: any) {
                reject(err);
            });
        });
    }


    static async simpleCreateWriteStream(path: string) {
        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(path);
            writeStream.on('finish', function() {
                console.log('file created');
                resolve(writeStream);
            });
            writeStream.on('error', function(err: any) {
                console.log('file create error');
                reject(null);
            });
        });
    }

    static async createReadStream(path: string) {
        return new Promise((resolve, reject) => {
            let file: any[] = [];
            const readStream = fs.createReadStream(path);
            readStream.on('error', function(err: any) {
                reject(err);
            });
            readStream.on('data', function(chunk: any) {
                file.push(chunk);
            });
            readStream.on('end', function() {
                // console.error(err);
                resolve(file);
                console.log('data found!');
            });
        });
    }


    // static async fileUploadWithPCloud(readFilePath: string, plainAccessToken: string, fileReadStream: any) {
    //     try {
    //         const url = 'https://api.pcloud.com/uploadfile';
    //         let articleFolderId = '';
    //         if(process.env.ARTICLE_IMAGE_FOLDER_ID) {
    //             articleFolderId = process.env.ARTICLE_IMAGE_FOLDER_ID;
    //         }
    //         return MyUtils.requestPromise(plainAccessToken, readFilePath, url, fileReadStream, articleFolderId);
    //     } catch (e) {
    //         return null;
    //     }
    // }

    // static requestPromise(plainAccessToken: string, _readFilePath: string, url: string, fileReadStream: any, folderId: any) {
    //     const form = {
    //         'file': fileReadStream,
    //         'folderid': folderId
    //     };
    //     return rp.post({
    //         url: url,
    //         auth: { bearer: plainAccessToken },
    //         headers: {
    //             Connection: 'keep-alive',
    //             'Content-Type': 'multipart/form-data'
    //         },
    //         formData: form
    //     });
    // }

    static async axiosFileUpload(plainAccessToken: string, readFilePath: string, url: string) {

        const formData = new FormData();
        const fileStream = fs.createReadStream(readFilePath);
        formData.append("file", fileStream);
        const fileStatSync = fs.readFileSync(readFilePath);

        const request_config: AxiosRequestConfig = {
            method: "post",
            headers: {
                "Authorization": "Bearer " + plainAccessToken,
                Connection: 'keep-alive',
                "Content-Type": "multipart/form-data",
                'Content-Length': Buffer.byteLength(fileStatSync)
            }
        };

        return axios.post(url, formData, request_config);
    }

    // static async fetchPCloudImageUrl(fileId: any, plainAccessToken: string) {
    //     try {
    //
    //         const url = 'https://api.pcloud.com/getfilelink?fileid=';
    //         return rp.get({
    //             url: url + fileId,
    //             auth: {bearer: plainAccessToken},
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }});
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    static async toObject(array: any[]) {
        array.reduce((obj, item) => {
            obj[item.type] = item['data'];
            return obj
        }, {})
    }


    static readModuleFile(path: any, callback: any) {
        try {
            fs.readFile(path, 'utf8', callback);
        } catch (e) {
            callback(e);
        }
    }

    static capitalizeWordWithSpace(inputData: string) {
        try {
            const words = inputData.split(" ");
            return words.map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            }).join(" ");
        } catch (e) {
            return '';
        }
    }


    static dbLowerCaseSearch(column, inputString) {
        return Sequelize.where(
            Sequelize.fn('lower', Sequelize.col(column)),
            Sequelize.fn('lower', inputString)
        )
    }

    static dbLowerCaseSearchWithUndefined(column, inputString) {

    }

    static stringOrArray(stringInput: any, array: any){
        if (stringInput) {
            if (typeof stringInput === 'string' || stringInput instanceof String) {
                array = stringInput.toString();
            } else if (stringInput instanceof Array) {
                if(stringInput.length > 0){
                    array = stringInput;
                } else {
                    array = null;
                }
            }
        } else {
            return  null;
        }

        return array;
    }


    static stringOrArrayToLowerCase(stringInput: any, array: any){
        if (stringInput) {
            if (typeof stringInput === 'string' || stringInput instanceof String) {
                array = stringInput.toString().toLowerCase();
            } else if (stringInput instanceof Array) {
                let newArray: string[] = [];
                if(stringInput.length > 0){
                    for(let r = 0; r < stringInput.length; r++) {
                        const string = stringInput[r];
                        const stringLower: string = string.toString().toLowerCase();
                        newArray.push(stringLower);
                    }
                    array = newArray;
                } else {
                    array = null;
                }
            }
        } else {
            return  null;
        }

        return array;
    }




    static myParseInt(input: any): number {

        try {
            return parseInt(input);
        } catch (e) {
            throw e;
        }
    }

    static truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num - 3) + "...";
        } else {
            return str;
        }
    }

    static async sanitizeData(input: string) {
        try {
            return sanitizer.escape(input);
        } catch (e) {
            throw e;
        }
    }
}
