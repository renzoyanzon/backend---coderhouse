const fs = require('fs');

class ProductService {
    constructor (){
        this.ruta = __dirname + "/products.json";
        
    }

    async save (_obj){
        try{
            const contenidoExistente = await this.getAll();
            const id = contenidoExistente.length >=1 ? contenidoExistente.length +1 :1;
            contenidoExistente.push({id:id,..._obj})
            const data = JSON.stringify(contenidoExistente);
            await fs.promises.writeFile(this.ruta, data)
            return id

        }catch(err){
            console.log('Error al guardar el objeto',err);
        }
    }


    async getAll(){
       try{
            const contenido = await fs.promises.readFile(this.ruta);
            if (contenido == ''){
                let data = [];
                return data
            } else{
                let data = JSON.parse(contenido);
                return data
            }
       }catch(err){
            console.log('No existe archivo en la base de datos',err.message);
       }
        
    }

    async getById (id){
        try{
            const contenidoExistente = await fs.promises.readFile(this.ruta)
            const productObject = JSON.parse(contenidoExistente)
            const product = productObject.filter(el=> el.id==id);
            return product[0]
        }catch(err){
            console.log('Error en la busqueda mediante Id',err.message);
        }
    }

    async updateProduct(id,obj){
        try{
            const contenidoExistente = await fs.promises.readFile(this.ruta);
            const productObject = JSON.parse(contenidoExistente);
            const newProduct = productObject.map(el=> (el.id == id)? {...obj, id:id}  : el);
            await fs.promises.writeFile(this.ruta, JSON.stringify(newProduct));
            return ({
                success: true,
                data: `Product ${id} updated successfully`
            })

        }catch(err){
            console.log('Error en la busqueda mediante Id',err.message);
        }
    }

    async deleteById (id){
        try{
            const contenidoExistente = await fs.promises.readFile(this.ruta);
            const productObject = JSON.parse(contenidoExistente);
            const newProduct = productObject.filter(el=> el.id != id);
            
            await fs.promises.writeFile(this.ruta,JSON.stringify(newProduct));
            return ({
                success: true,
                data: `Product ${id} deleted successfully`
            })

        }catch(err){
            console.log('Error en el proceso de delete by id',err.message);
        }
    }

    async deleteAll (){
        try{
            await fs.promises.writeFile(this.ruta,'');

        }catch(err){
            console.log('Error en el proceso de delete all',err.message);
        }
    }

}

module.exports = ProductService;