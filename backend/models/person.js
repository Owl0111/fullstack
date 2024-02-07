require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
console.log("connecting to" + uri);
mongoose.connect(uri);
const personSchema = new mongoose.Schema({
    number: Number,
    name: String,
});

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})
const Person =

    module.exports = mongoose.model("person", personSchema);