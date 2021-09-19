const { confirmar } = require("./helpers/inquirer")

const main = async () => {
    const afirmacion = await confirmar("de verdad?")

    console.log(afirmacion)
}

main()