import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { LoadingController } from 'ionic-angular'
import { ElementRef, ViewChild } from '@angular/core';

//Providers
  import { InteractiveMapProvider } from '../../providers/interactive-map/interactive-map'

//Class
  import { MapScale } from './map-scale.class'

/**
 * Generated class for the InteractiveMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var Phaser
var game = undefined
var img_mapa = null
var pins = []
var mapScale = undefined
const pin_img = 'assets/pin.png'

var scope = undefined


@IonicPage()
@Component({
  selector: 'page-interactive-map',
  templateUrl: 'interactive-map.html',
})
export class InteractiveMapPage {

  refresher:any
  loader:any
  maps:any
  interactive_map_id:any
  // evento_id= null

  @ViewChild('mapInteractive') mapInteractive: ElementRef;
  @ViewChild('phaserMapInteractive') phaserMapInteractive: ElementRef;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public interactiveMapProvider: InteractiveMapProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    
    scope = this

  }

  getInteractiveMaps(){

    //Get storage
    this.storage.get(`map_interactive_${this.interactive_map_id}`).then((maps) => {
                
        //No exist item storage
        if( maps === null ){

          //Server request
          this.getAllInteractiveMaps()

        }else{

          console.log(`Storage request...`)
          this.maps = maps
          console.log(`Maps interactive(storage): `,this.maps)
          this.loader.dismiss() //hide loader
        
        }
      
    })

  }

  //Get all maps in server
    getAllInteractiveMaps(){

      console.log(`Server request: all interactive maps in event(${this.interactive_map_id}) ...`)

      this.interactiveMapProvider.getInteractiveMapDetail(this.interactive_map_id).subscribe(maps => {

        this.maps = maps
        this.storage.set(`map_interactive_${this.interactive_map_id}`, this.maps )
        console.log(`Maps interactive(server): `,this.maps)

        //Pull refresher
        if(this.refresher !== undefined){
    
          console.log(`Refresher complete...`)
          this.refresher.complete()
          this.refresher = null
          this.imgMapLoad()

        }

        this.loader.dismiss() //hide loader
  

      })
  
    }

  //Image map is load
    imgMapLoad() {

      console.log("imgMapLoad()...")

      let canvas_phaser_width = this.mapInteractive.nativeElement.offsetWidth
      let canvas_phaser_height = this.mapInteractive.nativeElement.offsetHeight
  
      
      console.log(`
       Dimension imagen en celular:  
        Height: ${this.mapInteractive.nativeElement.offsetHeight}
        Width: ${this.mapInteractive.nativeElement.offsetWidth}
      `);

  
      img_mapa = this.maps.img_mapa
      pins = this.maps.mapa.pins
    
      mapScale = new MapScale()
      mapScale.setMapOrigin({
        width: this.maps.mapa.canvas.width,
        height: this.maps.mapa.canvas.height
      })
    
      console.log(`Map(origin)`, mapScale.getMapOrigin());
      console.log(`Map(scale)`, mapScale.getMapScale());            

      this.initPhaser( canvas_phaser_width, canvas_phaser_height )

    }

  //Phaser
    initPhaser( canvas_phaser_width, canvas_phaser_height ){
        
      //Phaser instance
          console.log(`initPhaser()...`)


          this.phaserMapInteractive.nativeElement.innerHTML = ''

          
          game = new Phaser.Game( canvas_phaser_width, canvas_phaser_height, Phaser.CANVAS, 'phaser-map-interactive', { 
            preload: this.preload, 
            create: this.create, 
            update: this.update,
            render: this.render
          })      

    }

    preload(){

      game.load.image('map_img', img_mapa)
      game.load.image('pin_img', pin_img)

    }

    create(){
 
      var map_sprite = game.add.sprite(0, 0, 'map_img')
      map_sprite.width = game.world.width
      map_sprite.height = game.world.height

      console.log(`

        Mundo:
          width: ${game.world.width} 
          Height: ${game.world.height} 
        Dimensiones reales:
          width: ${map_sprite.width} -> ${game.cache.getImage('map_img').width}
          Height: ${map_sprite.height} 

      `)

      mapScale.setMapScale({
        width: game.world.width,
        height: game.world.height
      })

      let delay = 100

      pins.forEach(pin => {

        console.log(pin.coords.lat)

        //Scale coordenate x
          let x_percent = mapScale.pixelToPercentOrigin( pin.coords.lat, mapScale.getMapOrigin().width )
          let x_pixel_scale = mapScale.pixelScale( x_percent, mapScale.getMapScale().width )

        //Scale coordenate y
          let y_percent = mapScale.pixelToPercentOrigin( pin.coords.long, mapScale.getMapOrigin().height )
          let y_pixel_scale = mapScale.pixelScale( y_percent, mapScale.getMapScale().height )

          console.log(`
          
            origin(x,y): (${pin.coords.lat},${pin.coords.long})
            origin(x,y)<percent>: (${x_percent},${y_percent})
            scale(x,y): (${ mapScale.approximate(x_pixel_scale) },${ mapScale.approximate(y_pixel_scale) })

          `)

        var sprite = game.add.sprite( mapScale.approximate(x_pixel_scale) , mapScale.approximate(y_pixel_scale) , 'pin_img' )
        sprite.anchor.setTo(0, 1);
        sprite.alpha = 0;
        game.add.tween(sprite).to( { alpha: 1 }, 1500, Phaser.Easing.Bounce.Out, true, delay, 0, false);
        
        sprite.label = pin.title
        sprite.description = pin.Description

        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(function(sprite){
          // alert(`Click en pin ${sprite.label}`)
          scope.showAlert( sprite.label, sprite.description )

        }, game);

        delay+= delay


      });

    }

    update(){

    }

    render(){

    }

    showAlert(title,subTitle) {

      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: ['OK'],
        cssClass: 'alertPersonalizada'
      });
      
      alert.present();
  
    }

  //Pull refresher
    doRefresh(refresher) {

      this.presentLoading() //Show loader
      this.refresher = refresher
      this.getAllInteractiveMaps()
      

    }

  //Show loader
    presentLoading() {

      this.loader = this.loadingCtrl.create({
        content: "Un momento por favor...",
        spinner: 'bubbles'
      })
  
      this.loader.present()

    }

  ionViewDidLoad() {

    console.log('ionViewDidLoad InteractiveMapPage')
    // this.mapInteractive.nativeElement.style.display = 'block'

    console.log(`Maps interactive page run...`)

    this.presentLoading() //Show loader
    
    let interactive_map_id_param = this.navParams.get('interactive_map_id')

    //App: One event
    if (interactive_map_id_param === null || interactive_map_id_param === undefined) {

      this.loader.dismiss() //hide loader
      alert("El mapa no existe")

    } else {

      this.interactive_map_id = interactive_map_id_param
      this.getInteractiveMaps()

    }
  
  }

}
