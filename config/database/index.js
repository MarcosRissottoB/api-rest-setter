const mongoose = require("mongoose");

const uriDB = "mongodb://localhost/setterDB"
const connectDB = async () => {
    try {
        await mongoose.connect(uriDB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('Mongodb is connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;