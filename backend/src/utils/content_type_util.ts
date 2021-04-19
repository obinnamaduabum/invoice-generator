
const types = {
    "image/png": "png",
    "image/tiff": ["tif", "tiff"],
    "image/vnd.wap.wbmp":  "wbmp",
    "image/x-icon":  "ico",
    "image/x-jng":  "jng",
    "image/x-ms-bmp": "bmp",
    "image/svg+xml":  "svg",
    "image/webp": "webp"
}

export class ContentTypeUtil {

    getTypeExtension(type: string) {
        return types[type];
    }
}
