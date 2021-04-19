import {PCloudPublicLinkMetaInterface} from "./pcloud_meta_public_link";

export interface PCloudPublicLinkInterface {
    code: string,
    created:  string,
    downloadenabled: boolean,
    type: number,
    modified:  string,
    downloads: number,
    link:  string,
    result: number,
    linkid: number,
    haspassword: boolean,
    traffic: number,
    views: number,
    metadata: PCloudPublicLinkMetaInterface
}
