const axios = require("axios");

class Busqueda{
    historial = ['Bogotá', 'Madrid', 'Valencia', 'Armenia', 'La plata']

    constructor(){

    }

    async ciudad(lugar){
        try{
            const resp = await axios.get("https://reqres.in/api/users?page=2")
            console.log(resp.data)
        } catch(error) {
            console.log(error)

            return []
        }

    }
}

module.exports = Busqueda;
