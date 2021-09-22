require('dotenv').config()

const {  inquirerMenu, pausa, leerInput, listadoLugares } = require("./helpers/inquirer")
const Busqueda = require("./models/Busqueda")

const main = async () => {
    
    let opt = null
    const busqueda = new Busqueda()
    while(opt !== 0){
        opt = await inquirerMenu()
        console.log(opt)
        switch(opt){
            case 1:
                //Mostrar mensaje
                const {ciudad} = await leerInput('Escriba la ciudad que desea buscar: ')
                

                //Buscar lugares
                const lugares = await busqueda.ciudad(ciudad)
                
                //Seleccionar el lugar
                const id = await listadoLugares(lugares)
                if(id === '0') continue
                const lugarSeleccionado = lugares.find(l => l.id === id)

                //Guardar en la BD
                busqueda.guardarHistorial(lugarSeleccionado.nombre)
                

                //Clima
                const {lat, lng} = lugarSeleccionado
                const clima = await busqueda.clima(lat, lng)
                const {weather, main } = clima.data


                //Mostrar resultados

                console.log('\n Información de la ciudad \n '.green)
                console.log('Ciudad: ', lugarSeleccionado.nombre )
                console.log('Lat: ', lugarSeleccionado.lat)
                console.log('Lng: ', lugarSeleccionado.lng)
                console.log('Temperatura: ', main.temp)
                console.log('Minima: ', main.temp_min)
                console.log('Maxima: ', main.temp_max )
                console.log('Descripción; ', weather[0].description)
                break

                case 2:
                    busqueda.historialCapitalizado.forEach((lugar, i) => {
                        const idx = `${i+1}`.green
                        console.log(`${idx} ${lugar}`)
                    })
                break
        }




        await pausa()
    }
    
}

main()