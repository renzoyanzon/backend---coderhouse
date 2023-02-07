import mongoose, {Schema } from 'mongoose';

const messagesCollection = 'messages';

const messageSchema = Schema({
    message: {
        type: String,
        required: true
    }
})

const authorSchema= Schema({
    author: Object,
    message: messageSchema
}

);

const messageModel = mongoose.model (messagesCollection,authorSchema);

export default messageModel;