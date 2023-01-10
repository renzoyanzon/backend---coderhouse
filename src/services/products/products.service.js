const fs = require ('fs');


class ProductServices {
    constructor(){
        this.ruta = __dirname + '/products.json'
    }

    async createProducts (data){
        try { 

            const productsList = await fs.promises.readFile(this.ruta)
            const productsListObject = JSON.parse(productsList);
            const id = productsListObject.length >=1 ? productsListObject.length + 1 : 1;
            productsListObject.push({id:id, ...data})
    
            const newProductsList = JSON.stringify(productsListObject)
    
       
            await fs.promises.writeFile(this.ruta,newProductsList)

            return({
                success:true,
                data: `El producto ${data.nombre} fue creado correctamente`
            })
            
        } catch (error) {
            return({
                success: false,
                data: error.message
            })
        }
    }


    async getAllProducts () {
        try {
            const productsDetail = await fs.promises.readFile(this.ruta);
            return ({
                success: true,
                data: JSON.parse(productsDetail)
            })

        } catch (error) {
            return({
                success:false,
                data: error.message
            })
        }
    }

    async getById (id) {
        try {
            const productList = await fs.promises.readFile(this.ruta);
            const productListObject = JSON.parse(productList);
            const productId = productListObject.filter(el=> el.id ==id);
            return({
                success: true,
                data: productId[0]
            })
            
            
        } catch (error) {
            return({
                success: false,
                data: error.message
            })
        }
    }

    async updateById(id,data){
        const productList = await fs.promises.readFile(this.ruta);
        const productListObject = JSON.parse(productList);
        const newProducts = productListObject.map(el=> (el.id==id)? {id:id,...data} : el);
        await fs.promises.writeFile(this.ruta,JSON.stringify(newProducts) )
        return({
            success:true,
            data: `Product ${id} updated successfully`
        })
    }

    async deleteById(id){
        const productList= await fs.promises.readFile(this.ruta);
        const productListObject = JSON.parse(productList);
        const newProducts = productListObject.filter(el=>el.id != id);
        await fs.promises.writeFile(this.ruta, JSON.stringify(newProducts))
        return ({
            success: true,
            data: `Product ${id} deleted successfully`

        })
    }
}



module.exports = ProductServices