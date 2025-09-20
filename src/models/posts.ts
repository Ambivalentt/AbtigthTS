import moongose from 'mongoose';

const postSchema = new moongose.Schema({
    userId : { type: moongose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, default:null},
    createdAt: { type: Date, default: Date.now}
})

export default moongose.model('Post', postSchema);

