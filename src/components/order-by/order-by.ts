import { Component, Input, Output, EventEmitter  } from '@angular/core'
// import {IONIC_DIRECTIVES} from '@ionic-angular'


/**
 * Generated class for the OrderByComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'order-by',
  templateUrl: 'order-by.html',
})
export class OrderByComponent {

  @Input() sort_component: any
  @Output() sort_by_output: EventEmitter<string> = new EventEmitter<string>()
  @Output() sort_by_direction_output: EventEmitter<string> = new EventEmitter<string>()
  sort_by: string 
  sort_by_direction: string 
  

  constructor() {

    console.log("constructor()")
    console.log(`options: `,this.sort_component)

  }

  sort(){

   this.sort_by_output.emit(this.sort_by)

  }

  setDirection(){

    this.sort_by_direction_output.emit(this.sort_by_direction)

  }

}
