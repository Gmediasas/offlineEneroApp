import { Injectable } from '@angular/core';
import { ApiAiClient } from "api-ai-javascript";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { DateTime } from 'ionic-angular';



export class Message {
  constructor(public msg: string, public from: string, public date: DateTime) { }
}


@Injectable()
export class AgenteProvider {
  public currentDate;

  private readonly client = new ApiAiClient({
    accessToken: "a5adeba5fca645279414d094dfa88b19"
  });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {

  }

  // Sends and receives messages via DialogFlow.
  talk(msg: string) {
    this.currentDate = Date.now();
    const userMessage = new Message(msg, "user", this.currentDate);
    this.update(userMessage);

    return this.client
      .textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;

        let formatedMessage = "";

        const botMessage = new Message(speech + "\n" + formatedMessage, "bot", this.currentDate);

        this.update(botMessage);
        console.log("botMessage", botMessage);

      })
      .catch(error => {
        console.log(error);
        /* do something here too */
      });
  }

  mensajesAgente(mensajeBot: any) {
    this.currentDate = Date.now();
    const userMessage = new Message(mensajeBot, "bot", this.currentDate);
    this.update(userMessage);
  }

  // Adds message to source.
  update(msg: Message) {
    this.conversation.next([msg]);

  }

  delete() {
  


  }



}
