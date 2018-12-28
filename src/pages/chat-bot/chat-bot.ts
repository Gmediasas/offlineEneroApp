import { Component, ViewChild } from "@angular/core";
import { Platform, Content, NavController, ModalController } from "ionic-angular";

//importar provider 
import { AgenteProvider } from '../../providers/agente/agente';

@Component({
  selector: 'page-chat-bot',
  templateUrl: 'chat-bot.html',
})
export class ChatBotPage {
  messages: any = [];
  chatBox: string = "";
  from: {
    user: "Usuario";
    bot: "Agente";
  };

  @ViewChild(Content) content: Content;


  constructor(public navCtrl: NavController,
    public platform: Platform,
    public agente: AgenteProvider,
    public modalCtrl: ModalController) {
    this.agente.conversation.subscribe(res => {
      this.messages = [...this.messages, ...res];
      this.scrollToBottom();
    });
  }


  ionViewDidLoad() {
    this.agente.delete();
    this.mensajeAgente("Te invitamos a usar el servicio de chatbot para la siguiente información." + "\n");
    this.mensajeAgente("1. Información de la ciudad." + "\n");
    this.mensajeAgente("2. Reservar una experiencia de turismo." + "\n");
    this.mensajeAgente("3. Hacer una pregunta." + "\n");
  }

  mensajeAgente(mensaje: any) {
    this.agente.mensajesAgente(mensaje);
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }


  sendMessage() {
    this.agente.talk(this.chatBox).then(() => {
      this.chatBox = "";
    });
  }

}
