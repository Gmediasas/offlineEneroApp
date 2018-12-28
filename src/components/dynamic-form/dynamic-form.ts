import { Component, OnInit, OnChanges, Input } from '@angular/core'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { Storage } from '@ionic/storage'
import { AlertController } from 'ionic-angular';
//Providers
import { SurveyProvider } from '../../providers/survey/survey'

/**
 * Generated class for the DynamicFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dynamic-form',
  templateUrl: 'dynamic-form.html'
})
export class DynamicFormComponent implements OnInit, OnChanges  {

  @Input() dataObject:any
  @Input() survey:any
  form: FormGroup
  objectProps
  questions_multiple_answers:any = []
  component_init: boolean

  constructor(
    public survey_provider: SurveyProvider,
    private storage: Storage,
    private alertCtrl: AlertController,
  ) {

    this.component_init = false

  }

  ngOnInit(){

    // alert("ngOnInit()")
    
    this.prepareFormModel()
    this.component_init = true

  }

  prepareFormModel(){

    console.log( "survey?", this.survey )

    const formGroup = {}

    this.survey.questions.forEach( question => {

      console.log(question)

      question.key = question.nid
      question.label = question.title

      if(question.type === "Cerrada"){

        question.type = 'radio'
       
        let radio_options = []

        question.options.forEach( option =>{
          
          radio_options.push( { 
            label: option, 
            value: option
          })

        })

        question.options = radio_options

        formGroup[question.key] = new FormControl( question.response || false )
         
      }

      if(question.type === "MultipleOpciones"){

        
        question.type = 'checkbox'
       
        let checkbox_options = []

        question.options.forEach( option =>{


          var checked = false

          if( question.response != undefined && question.response  != null && question.response  !== '' ){

            let question_response_checked = JSON.parse(question.response) 

            question_response_checked.forEach( response => {

              console.log(`

                response: ${response}

                option: ${option}
              
              `)

              if( response === option ){

                if( this.questions_multiple_answers[question.key]  === undefined  ){

                  this.questions_multiple_answers[question.key] = {
                    options: []
                  }
            
                }

                this.questions_multiple_answers[question.key].options.push(option)

                checked = true

              }

            });
                 
          }


          checkbox_options.push({ 
            label: option, 
            value: option,
            checked: checked,
          })


        })

        question.options = checkbox_options

        // formGroup[question.key] = new FormControl(question.response || false)

        formGroup[question.key] = new FormControl()
         
      }

      if(question.type === "Abierta"){

        question.type = 'text'
        formGroup[question.key] = new FormControl(question.response || '')

      }
      
    })

    console.log("survey after each ", this.survey)
    
    this.form = new FormGroup(formGroup)


    console.log( this.form )
    // this.form.get('check-1').setValue(true)
    // this.form.get('check-2').setValue(false)

  }

  mapValidators(validators){

    const formValidators = []

    if(validators) {
      for(const validation of Object.keys(validators)) {
        if(validation === 'required') {
          formValidators.push(Validators.required)
        } else if(validation === 'min') {
          formValidators.push(Validators.min(validators[validation]))
        }
      }
    }

    return formValidators
    
  }

  onChangeCheck( question_id, option, event ) {

    if( this.questions_multiple_answers[question_id]  === undefined  ){

      this.questions_multiple_answers[question_id] = {
        options: []
      }

    }
  
    var cbIdx = this.questions_multiple_answers[question_id].options.indexOf(option)

    if(event.checked) {
        if(cbIdx < 0 ){
          this.questions_multiple_answers[question_id].options.push(option)
        }

    } else {
        if(cbIdx >= 0 ){
          this.questions_multiple_answers[question_id].options.splice(cbIdx,1)
        }

    }

 }

  ngOnChanges() {
    
    // alert("onChange()")
    if( this.component_init === true ){
      setTimeout(() => {
        this.prepareFormModel()
      }, 1000)
    }
     

  } 

  onSubmit(SurveyModel){

    this.questions_multiple_answers.forEach( (  question_responses , question_multiple_key ) => {
      
      // console.log(`key ${question_responses} : `,question_multiple_key)
      SurveyModel[question_multiple_key] = JSON.stringify(question_responses.options)
      
    })  

    console.log("onSubmit()::values: ", SurveyModel)
    
    for(const question_id of Object.keys(SurveyModel)) {


      this.storage.get(`current_event`).then( (current_event) => {
        
        this.storage.get(`access_token`).then( (access_token) => {
          //createResponseQuestion(survey_id, question_id, respuesta, current_event, access_token )

          let response_question =  SurveyModel[question_id]

          if( response_question !== question_id && response_question !== false && response_question !== '' ){

            this.survey_provider.createResponseQuestion( this.survey.id ,question_id, response_question, current_event, access_token ).subscribe( response => {

              console.log(response)
         
            })

          }
          

        })

      })

    }


    let alert = this.alertCtrl.create({
      title: 'Encuesta enviada',
      subTitle: 'Sus respuestas se han guardado con éxito.',
      buttons: ['Ok'],
      cssClass: 'alertPersonalizada'
    });

    alert.present();
    
  }

}
