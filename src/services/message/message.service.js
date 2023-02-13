import mongoose from 'mongoose';
import messageModel from '../../models/messageMongoose.models.js'


class MessageClass{
    constructor(){
        this.createConnection();
    }

    async createConnection(){
        try {
            const mongodb_URL = process.env.MONGODB_URL;
            const mongodb_db = process.env.MONGODB_DB;
            const URL = `${mongodb_URL}/${mongodb_db}`;
            await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.info('Mongoose connected');
        } catch (err) {
            throw new Error(err);
        }
    }

    async getAllMessage(){
        try {
            const readDocuments = await messageModel.find();
            console.log(readDocuments)
            return({
                success: true,
                data: readDocuments
            })            
        } catch (err) {
            return({
                success: false,
                message: err.message
            })
        }
    }

    async createMessage (data){
        try {
           const newMessage = new messageModel(data);
           const message = await newMessage.save();
           //console.log(message.author.email)
           return({
            success:true,
            data: `El correo se envió el mensaje correctamente`
        })
        } catch (err) {
            return({
                success: false,
                message: err.message
            })
        }
    }

    async deleteMessage(){
        try{
            const deleteDocument = await messageModel.deleteMany()
            return ({
                success: true,
                data: `Deleted successfully`
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

export default MessageClass;