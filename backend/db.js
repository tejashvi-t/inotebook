const mongoose = require('mongoose')
const mongoURI = "mongodb://0.0.0.0:27017/"


const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("CONNECTED SUCCESSFULLY ")

        })
        .catch((error) => {
            console.log("error found ", error)
        })
}

module.exports = connectToMongo