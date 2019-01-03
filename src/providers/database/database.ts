import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  
  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(public http: HttpClient, public storage: SQLite) {
    console.log('Hello DatabaseProvider Provider');
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS usersLogin (id INTEGER PRIMARY KEY AUTOINCREMENT, estado INTEGER)", []);
        this.isOpen = true;
        console.log("siii funciona");
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  CreateUserLogin(estado: number){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO usersLogin (estado) VALUES (?)";
      this.db.executeSql(sql, [estado]).then((data) =>{
        resolve(data);
        console.log("guardado login");
      }, (error) => {
        reject(error);
      });
    });
  }

}