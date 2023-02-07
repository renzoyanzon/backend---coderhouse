import { faker } from '@faker-js/faker';

class ProductMock{
    constructor(){}

        getProductsMock () {
          /*   const name = ['Renzo','Leo','Nati'];
            const price = [100,200,300];
            const thumbnail = ['url1','url2','url3']; */
            const productsMock = [];
            
            for (let i=0; i<=5; i++){
                productsMock.push({
                    name: faker.commerce.product(),
                    price: faker.commerce.price(),
                    thumbnail: faker.image.business()
                })
            }

            return productsMock

        }
   
}

export default ProductMock;