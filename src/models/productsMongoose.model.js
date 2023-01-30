import mongoose, { Schema } from 'mongoose';


const productsCollection = 'products';

const productsSchema = Schema({
    nombre: {
        type: String,
        required: true,
        max: 100
    },
    descripcion: {
        type: String,
        required: true,
        max: 100
    },
    price: {
        type: Number,
        required: true,
    },
    codigo: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
        max: 100
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    uuid: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
})

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel