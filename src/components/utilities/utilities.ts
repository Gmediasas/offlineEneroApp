import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the UtilitiesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'utilities',
  templateUrl: 'utilities.html'
})
export class UtilitiesComponent {

  text: string

  constructor(private storage: Storage) {
    console.log('Hello UtilitiesComponent Component')
    this.text = 'Hello World'
  }

  getNameDocumentInPath(paths) {
    console.log("Paths", paths);

    let documents = []

    if (paths != undefined && paths != null) {

      paths.forEach(path => {

        console.log("path: ", path)
        let path_parts = []
        let link = ''
        if (path.ext != "" && path.name != "") {
          if (typeof path == 'string') {

            path_parts = path.split("/")
            link = path

          }

          if (typeof path == 'object') {

            path_parts = path.path.split("/")
            link = path.path

          }

          documents.push(this.getPath(path_parts, link))
        }


      })

    }
    console.log("Documentos servicio", documents);

    return documents

  }

  getPath(path_parts, link) {

    let file_name = path_parts[path_parts.length - 1]

    //.Ext and icon file

    let file_ext_name = file_name.split(".")
    let file_ext = file_ext_name[file_ext_name.length - 1]

    let icon = 'menu_logo.png'
    let css_class = 'ColorDoc1'

    if (file_ext === 'pdf') {

      icon = 'DocPDF.png'
      css_class = 'ColorDoc1'

    } else if (file_ext === 'doc' || file_ext === 'docx' || file_ext === 'dotx') {

      icon = 'DocWORD.png'
      css_class = 'ColorDoc2'

    } else if (file_ext === 'pot' || file_ext === 'ppsx' || file_ext === 'pptx' || file_ext === 'ppt' || file_ext === 'pptm') {

      icon = 'DocPOWER.png'
      css_class = 'ColorDoc3'

    } else if (file_ext === 'xlsx' || file_ext === 'xls') {

      icon = 'DocEXE.png'
      css_class = 'ColorDoc4'

    }

    return {
      path: link,
      name: file_name,
      ext: file_ext,
      icon: icon,
      class: css_class
    }

  }


  getCurrentEventUID(): Promise<boolean> {
    return this.storage.ready().then(() => this.storage.get('current_event'));
  }

  getDataEventByID(eventID): Promise<boolean> {
    return this.storage.ready().then(() => this.storage.get('event_detail_' + eventID));
  }

  getDataUserSession(): Promise<boolean> {
    return this.storage.ready().then(() => this.storage.get('data_user'));
  }

}
