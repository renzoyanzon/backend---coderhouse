const knexConfig = require('../config');
const knex = require('knex');
const {v4: uuidv4} = require('uuid');

class ProductService {
    constructor(){
        this.knex = knex(knexConfig);
    }

    async createProduct (product){
        try {
            Object.assign(product,{
                code: uuidv4()
            })

            const data = await this.knex('products').insert(product)
            return({
                success:true,
                data: `Products ${product.name} created successfully`
            })

        } catch (error) {
            return({
                success:false,
                data: error.message
            })
        }
    }

    async getAll (){
        try {
            const data = await this.knex('products').select('*');
            const product = JSON.parse(JSON.stringify(data));
            return({
                success: true,
                data: product
            })
            
        } catch (error) {
            return({
                success:false,
                data: error.message
            })
        }
    }

    async getById(id){
        try {
            const data = await this.knex('products').where('code','=',id).select('*');
            const product = JSON.parse(JSON.stringify(data))
            return({
                success: true,
                data: product
            })
        } catch (error) {
            return({
                success:false,
                data: error.message
            })
        }
    }

    async updateById(id,product){

        try {
            const data = await this.knex('products').where('code','=',id).update(product);
            return({
                success:true,
                data: `Products ${product.name} updated successfully`
            })
        } catch (error) {
            return({
                success:false,
                data: error.message
            })
        }
     

    }

    async deleteById(id){
        try {
            const data = await this.knex('products').where('code','=',id).del();
            return({
                success:true,
                data: `Products ${id} deleted successfully`
            })
            
        } catch (error) {
            return({
                success:false,
                data: error.message
            }) 
        }

    }

}

module.exports = ProductService