export interface JWTObjInterface {
    id: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;

}

export class MyJWTObj {
    id: string;
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;

    constructor(response: any) {
        this.id = response.id;
        this.iat = response.iat;
        this.exp = response.exp;
        this.aud = response.aud;
        this.iss = response.issue;
        this.sub = response.sub;
    }

}
