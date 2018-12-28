export class RestorePasswordInterface {

    private api_token: any;
    private email: any;



    constructor(api_token, email) {
        this.api_token = api_token;
        this.email = email;
    }
}