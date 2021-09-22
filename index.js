require('dotenv').config()

console.log(process.env)

const { confirmar, inquirerMenu, pausa, leerInput, listadoLugares } = require("./helpers/inquirer")
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
                const lugarSeleccionado = lugares.find(l => l.id === id)
                console.log(lugarSeleccionado)

                //Clima


                //Mostrar resultados

                console.log('\n Información de la ciudad \n '.green)
                console.log('Ciudad: ', lugarSeleccionado.nombre )
                console.log('Lat: ', lugarSeleccionado.lat)
                console.log('Lng: ', lugarSeleccionado.lng)
                console.log('Temperatura: ', )
                console.log('Minima: ', )
                console.log('Maxima: ', )
                break
        }




        await pausa()
    }
    
}

main()