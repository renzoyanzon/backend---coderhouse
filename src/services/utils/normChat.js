import {normalize,schema} from 'normalizr';

const normalizeChat = (data) => {
    //const dataJSON = JSON.stringify(data)

    const authorSchema = new schema.Entity('author')
    const mensajeSchema = new schema.Entity('mensaje', {
        author: authorSchema
    })
    const mensajesSchema = new schema.Entity('mensajes', {
        mensajes: [mensajeSchema]
    })

    const chatNorm = normalize(data, mensajeSchema)

    return chatNorm
}

export default normalizeChat