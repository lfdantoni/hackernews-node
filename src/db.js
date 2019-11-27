import mongoose from 'mongoose';

const MONGO_URL = process.env.DB_CS || 'mongodb://127.0.0.1:27017/blog'

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('DB Connected'))
    .catch((error) => console.log('DB connected error', error))

mongoose.set('useCreateIndex', true)

const linkSchema = new mongoose.Schema({
    description: {type: String, required: true},
    url: String,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Link' }], default: []}
})

var Links = mongoose.model('Link', linkSchema);
var Users = mongoose.model('User', userSchema);

export {
    Links,
    Users
}


