import {PcloudMetaData} from "./pcloud-meta-data";
import {PcloudChecksums} from "./pcloud-checksums";

export interface PcloudResponseInterface {
    result: number;
    metadata: PcloudMetaData[],
    checksums: PcloudChecksums[],
    fileids: number[]
}
