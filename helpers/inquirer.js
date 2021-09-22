const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name: 'opcion',
        message: '¿Qué vas a hacer hoy?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log("\n============================".green)
    console.log("   Seleccione una opción".white)
    console.log("============================\n".green)

    const {opcion} = await inquirer.prompt(preguntas)
    return opcion;
}


const pausa = async () => {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'respuesta',
            message: `\n Oprime la tecla ${'ENTER'.green} para continuar`
        }        
    ])
    
}


const listadoLugares = async ( lugares = []) => {

    const choices = lugares.map( (lugar, i) => {
        const idx = `${i+1}.`.green
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value:'0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [{
        type:'list',
        name: 'id',
        message: 'Seleccione lugar: ',
        choices
    }]


    const { id } = await inquirer.prompt(preguntas)
    return id
}

const leerInput = async(mensaje ) => {
    const question = [{
        type: 'input',
        name: 'ciudad',
        message: mensaje
    }]

    return await inquirer.prompt(question)
}

const leerDescripcion = async () => {
    const question = [
        {
            type: 'input',
            name: 'descripcion',
            message: 'Descripcion tarea: ',
            validate(value){
                if( value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const {descripcion} = await inquirer.prompt(question)
    return descripcion
}

module.exports = {
    inquirerMenu,
    pausa,
    leerDescripcion,
    listadoLugares,
    leerInput
}
