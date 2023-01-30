import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
class CartServices{
    constructor(){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.ruta = __dirname + "/cart.json";
    }

    async getAllCarts(){
        try{
            const CartsRaw = await fs.promises.readFile(this.ruta);
            return ({
                success: true,
                data: JSON.parse(CartsRaw)
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async getCartbyId(uuid){
        try{
            const CartsRaw = await fs.promises.readFile(this.ruta);
            const CartsObject = JSON.parse(CartsRaw);
            const Cart = CartsObject.filter(it => it.uuid == uuid)
            return ({
                success: true,
                data: Cart[0]
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async createCart(data){
        try{
            const CartsRaw = await fs.promises.readFile(this.ruta);
            const CartsObject = JSON.parse(CartsRaw);
            CartsObject.push(data);
            await fs.promises.writeFile(this.ruta, JSON.stringify(CartsObject));
            return ({
                success: true,
                data: `Cart ${data.uuid} created successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async updateCartbyId(uuid, data){
        try{
            const CartsRaw = await fs.promises.readFile(this.ruta);
            const CartsObject = JSON.parse(CartsRaw);
            const CartsNew = CartsObject.map(it => (it.uuid == uuid) ? data : it)            
            await fs.promises.writeFile(this.ruta, JSON.stringify(CartsNew));
            return ({
                success: true,
                data: `Cart ${uuid} updated successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async deleteCartbyId(uuid){
        try{
            const CartsRaw = await fs.promises.readFile(this.ruta);
            const CartsObject = JSON.parse(CartsRaw);
            const filteredCarts = CartsObject.filter(it => it.uuid !== uuid)
            console.log(JSON.stringify(filteredCarts))
            await fs.promises.writeFile(this.ruta, JSON.stringify(filteredCarts));
            return ({
                success: true,
                data: `Cart ${uuid} deleted successfully`
            });
        } catch (err){
            console.error(err);
            return ({
                success: false,
                data: err.message
            });
        }
    }

    async deleteProductInCart(cartUuid, productUuid){
        try{
            const CartsRaw = await fs.promises.readFile(this.ruta);
            let CartsObject = JSON.parse(CartsRaw);

            const cartIndex = CartsObject.findIndex(it => it.uuid == cartUuid);
            let filteredCart = CartsObject[cartIndex].items.filter(it => it.uuid !== productUuid);
            CartsObject[cartIndex] = filteredCart;
            await fs.promises.writeFile(this.ruta, JSON.stringify(CartsObject));
            return ({
                success: true,
                data: `Product ${productUuid} in Cart ${cartUuid} deleted successfully`
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

export default CartServices;