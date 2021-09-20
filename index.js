const { confirmar, inquirerMenu, pausa, leerInput } = require("./helpers/inquirer")
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
                console.log(ciudad)
                busqueda.ciudad(ciudad)

                //Buscar lugares

                //Seleccionar el lugar

                //Clima


                //Mostrar resultados

                console.log('\n Información de la ciudad \n '.green)
                console.log('Ciudad: ', )
                console.log('Lat: ', )
                console.log('Lng: ', )
                console.log('Temperatura: ', )
                console.log('Minima: ', )
                console.log('Maxima: ', )
                break
        }




        await pausa()
    }
    
}

main()