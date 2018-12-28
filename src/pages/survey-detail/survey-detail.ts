import { Component } from '@angular/core'
import { Storage } from '@ionic/storage'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { LoadingController } from 'ionic-angular'
import { FormGroup, FormControl } from '@angular/forms'

//Providers
import { SurveyProvider } from '../../providers/survey/survey'

/**
 * Generated class for the SurveyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey-detail',
  templateUrl: 'survey-detail.html',
})
export class SurveyDetailPage {

  refresher: any
  loader: any

  access_token: string
  evento_id: any
  survey_id: string
  survey: any
  survey_answers: any

  question: any = Question

  form: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public survey_provider: SurveyProvider,
  ) {


    this.evento_id = null
    this.survey_id = null
    this.survey = null
    this.survey_answers = {
      description: '',
      open: {
        question_id: null,
        response: ''
      }
    }
    this.form = new FormGroup({
      name: new FormControl()
    })

    this.storage.get(`access_token`).then((access_token) => {

      this.access_token = access_token

    })

  }

  ionViewDidLoad() {

    let evento_id_param = this.navParams.get('evento_id')

    //App: One event
    if (evento_id_param === null || evento_id_param === undefined) {

      alert("La evento no existe")

    } else {

      this.evento_id = evento_id_param

      let survey_id_param = this.navParams.get('survey_id')

      //App: One event
      if (survey_id_param === null || survey_id_param === undefined) {

        alert("La encuesta no existe")

      } else {

        this.survey_id = survey_id_param
        this.presentLoading()
        this.getSurveyDetail()

      }

    }


  }

  //Get Survey in server or storage
  getSurveyDetail() {

    //Get storage
    this.storage.get(`survey_${this.survey_id}`).then((survey) => {

      //No exist item storage
      if (survey === null) {

        //Server request
        this.getSurvey()

      } else {

        console.log(`Storage request...`)

        this.survey_provider.getSurveyResponse(this.survey_id, this.access_token).subscribe(survey_response => {

          if (survey_response.status === 'OK') {

            let responses = JSON.parse(survey_response.response)

            if (responses.length > 0) {

              responses.forEach(question_response => {

                let id_question_response = question_response.idPregunta

                survey.questions.forEach(question => {

                  if (id_question_response == question.nid) {

                    question.response = question_response.respuesta

                  }

                })

              })


              this.survey = survey

            }
            else {
              this.getSurvey();
            }

            //this.countdata = standRes.length
            console.log(`Survey Detail(storage): `, this.survey)
            this.loader.dismiss() //hide loader

          }


        })

      }

    })

  }

  //Get Survey in server
  getSurvey() {


    this.survey_provider.getSurvey(this.evento_id, this.survey_id).subscribe(survey => {

      this.survey = survey

      //this.countdata = data.length
      this.storage.set(`survey_${this.survey_id}`, this.survey)
      console.log(`Survey Detail(server): `, this.survey)

      this.survey_provider.getSurveyResponse(this.survey_id, this.access_token).subscribe(survey_response => {

        if (survey_response.status === 'OK') {

          let responses = JSON.parse(survey_response.response)

          if (responses.length > 0) {

            responses.forEach(question_response => {

              let id_question_response = question_response.idPregunta

              this.survey.questions.forEach(question => {

                if (id_question_response == question.nid) {

                  console.log("id pregunta de la respuesta", id_question_response)
                  question.response = question_response.respuesta
                  console.log("respuesta pregunta:", question)

                }

              })

            })

          }

          //Pull refresher
          if (this.refresher !== undefined) {

            console.log(`Refresher complete...`)
            this.refresher.complete()
            this.refresher = null

          }

          this.loader.dismiss() //hide loader

        }


      })


    })

  }

  //Pull refresher
  doRefresh(refresher) {

    this.presentLoading() //Show loader
    this.refresher = refresher
    this.getSurvey()

  }

  //Show loader
  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Un momento por favor...",
      spinner: 'bubbles'
    })

    this.loader.present()

  }

  onSubmit(values) {

    console.log("onSubmit()::values: ", values);

  }


}


export const Question = [

  {
    key: "textarea",
    label: "Pregunta 1?",
    value: "",
    type: "text",
    validation: { required: true },
  },
  {
    key: "opciones",
    label: 'Eliga ciudad',
    value: '39010',
    type: 'radio',
    options: [
      { label: "(choose one)", value: '' },
      { label: "Bolzano", value: '39100' },
      { label: "Meltina", value: '39010' },
      { label: "Appiano", value: '39057' }
    ],
  },
  {
    key: "opciones_2",
    label: 'Pais',
    value: '39010',
    type: 'checkbox',
    options: [
      { label: "Eliga pais", value: '' },
      { label: "Bolzano", value: '39100' },
      { label: "Meltina", value: '39010' },
      { label: "Appiano", value: '39057' }
    ],
  }


]
