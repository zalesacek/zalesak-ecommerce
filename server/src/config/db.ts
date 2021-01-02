import mongoose from 'mongoose';

let mongoURI;

if(process.env.NODE_ENV === 'production'){
    mongoURI = process.env.MONGO_URI;
  } else {
    mongoURI = 'mongodb+srv://petr123:petr123@cluster0.aw8kw.mongodb.net/shop?retryWrites=true&w=majority';
}

const db = mongoURI as string;

const connectDb = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDb;