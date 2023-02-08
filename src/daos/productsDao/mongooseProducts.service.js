import mongoose from 'mongoose'
import dotenv from 'dotenv'

import productsModel from '../../models/productsMongoose.model.js';

class ProductsClass{
    constructor(){
        this.createConnection();
    }

    async createConnection(){

        let MONGO_URI;
        const MONGO_USER = process.env.MONGO_USER;
        const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
        const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
        const MONGO_QUERY = process.env.MONGO_QUERY;
        const MONGO_HOST = process.env.MONGO_HOST;

        if (!MONGO_USER){
            MONGO_URI = `${process.env.MONGO_URI}/${MONGO_DB_NAME}`
        } else {
            MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?${MONGO_QUERY}`  
        }

        try{
            await mongoose.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.info('Mongoose connected');

        }catch(err){
            throw new Error(err);
        }
    }

    async getAllProducts(){
        try{
            const readDocuments = await productsModel.find();
            console.log(readDocuments);
            return ({
                success: true,
                data: readDocuments
            });
        } catch (err){
            console.error("falla");
            return ({
                success: false,
                data: err.message
            });
        }

    }

    async getProduct(uuid){
        try{
            const readDocument = await productsModel.findOne({_id : uuid});
            console.log(readDocument);
            return ({
                success: true,
                data: readDocument
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async createProduct(data){

        const productMock = {
            nombre:"producto 1",
            descripcion:"La descripcion del producto 1",
            price:10,
            codigo:31223,
            thumbnail:"https://cdn1.iconfinder.com/data/icons/city-flat-2/512/people_person_man_stand_men-512.png",
            stock:100,
            uuid:"514a733d-c962-4e52-821e-767ff404ba69",
            timestamp: Date.now()
        }

        try{
            const newProduct = new productsModel(data);
            const product = await newProduct.save();
            return ({
                success: true,
                data: `Product ${data.uuid} created successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async updateProduct(uuid, data){
        try{
            const updateDocuments = await productsModel.updateOne({_id: uuid}, {$set: data});
            return ({
                success: true,
                data: `Product ${uuid} updated successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async deleteProduct(uuid){
        try{
            const deleteDocument = await productsModel.deleteOne({_id: uuid})
            return ({
                success: true,
                data: `Product ${uuid} deleted successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }
}

export default ProductsClass;