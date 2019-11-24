import mongoose from 'mongoose';

const MONGO_URL = process.env.DB_CS || 'mongodb://127.0.0.1:27017/blog'

mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('DB Connected'))
    .catch((error) => console.log('DB connected error', error))

var linkSchema = new mongoose.Schema({
    description: {type: String, required: true},
    url: String
});

var Links = mongoose.model('Link', linkSchema);

export {
    Links
}


