export class InscripcionAsistenteInterface {

    private password: any;
    private documento: any;
    private nombres: any;
    private apellidos: any;
    private telefono: any;
    private direccion: any;
    private email: any;
    private api_token: any;
    public tipoAsistente: any;
    public tipoDocumento: any;
    public genero: any;
    public estado: any;
    public nidevento: any;
    public company: any;
    public position: any;


    constructor(nidevento, password, tipoDocumento, tipoAsistente, api_token, documento, nombres, apellidos, telefono, direccion, email, genero, estado, company, position) {
        this.nidevento = nidevento;
        this.password = password;
        this.tipoDocumento = tipoDocumento;
        this.tipoAsistente = tipoAsistente;
        this.api_token = api_token;
        this.documento = documento;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email;
        this.genero = genero;
        this.estado = estado;
        this.company = company;
        this.position = position;
    }
}