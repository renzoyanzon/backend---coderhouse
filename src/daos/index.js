import dotenv from 'dotenv'
dotenv.config();

export const getProductModule = async () =>{
    const dataCore = process.env.DATACORE;
    if(dataCore == 'MEMORY'){
        const ModuleSource = await import('./productsDao/memoryProducts.service.js');
        return ModuleSource.default;
    } else if (dataCore == 'FS'){
        const ModuleSource = await import('./productsDao/fsProducts.service.js');
        return ModuleSource.default;
    } else if (dataCore == 'FIRESTORE'){
        const ModuleSource = await import('./productsDao/firestoreProducts.service.js');
        return ModuleSource.default;
    } else if (dataCore == 'MONGOOSE'){
        console.log("mongoose aqui")
        const ModuleSource = await import('./productsDao/mongooseProducts.service.js');
        return ModuleSource.default;
    }
}

export const productService = async ()=>{
    const ProductClass = await getProductModule();
    const productService = new ProductClass();
    productService.createProduct("");
}