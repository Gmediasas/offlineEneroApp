export class MapScale{

    public map_origin = {
        width:0,
        height:0
    }
    
    public map_scale = {
        width:0,
        height:0
    }

    constructor(){

    }

    pixelToPercentOrigin( point, height ){

        return  ( 100 * point ) / height

    }

    pixelScale( point_percent, height ){

        console.log(`
            pixelScale: 
            ${( point_percent * height ) / 100} = ( ${point_percent} * ${height} ) / 100
        `)

        return ( point_percent * height ) / 100

    }

    getMapOrigin(){
        return this.map_origin
    }

    setMapOrigin( map_origin ){
        this.map_origin = map_origin
    }

    getMapScale(){
        return this.map_scale
    }

    setMapScale( map_scale ){
        this.map_scale = map_scale
    }

    
    approximate(number){
        return Math.round(number)
    }
    

}