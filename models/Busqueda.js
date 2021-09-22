const fs = require('fs');

const axios = require("axios");

class Busqueda{
    historial = []
    dbPath = './db/DBhistorial.json'

    constructor(){
        this.leerDB()
    }

    get paramsApi() {
        return {
            "access_token": process.env.MAPBOX_KEY,
            "limit": "5",
            "language": "es"
        }
    }

    async ciudad(lugar){
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsApi
            })

            const resp = await instance.get()
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
        } catch(error) {
            console.log(error)

            return []
        }

    }

    get paramsApiOpenWeather(){
        return{
            "appid": process.env.OPENWEATHER_KEY,
            "units": "metric",
            "lang": "es"
        }
    }

    get historialCapitalizado(){
        return this.historial.map(lugar => {
            let palabras = lugar.split(" ")
            palabras = palabras.map(palabra => palabra[0].toUpperCase()+ palabra.substring(1))
            return palabras.join(" ")
        })
    }

    async clima(lat, lon){
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon, 
                    ...this.paramsApiOpenWeather}
            })

            const resp = await instance.get()
            return resp
        } catch(error) {
            console.log(error)
            return []
        }

    }

    guardarHistorial(lugar=""){
        if(this.historial.includes(lugar.toLowerCase())) return

        this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar.toLowerCase());

        this.guardarDB()
    }


    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB(){

        if( !fs.existsSync(this.dbPath)) return 
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
        this.historial = JSON.parse(info).historial;
    }
}

module.exports = Busqueda;
