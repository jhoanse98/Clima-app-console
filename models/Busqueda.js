



const axios = require("axios");

class Busqueda{
    historial = ['Bogotá', 'Madrid', 'Valencia', 'Armenia', 'La plata']

    constructor(){

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
}

module.exports = Busqueda;
