
const mongoose = require('mongoose');
const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];
const uri = `mongodb+srv://sarthakkalla09:${password}@phonebook.pyrzcpv.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(uri);
const personSchema = new mongoose.Schema({
    name: String,
    number: Number,

})

const Person = mongoose.model('Person', personSchema);
if (process.argv.length == 3) {
    Person.find({}).then((result) => {
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close();

    })
}
else {
    const person = new Person({
        name: personName,
        number: personNumber,
    })



    person.save().then(result => {
        console.log("person has been saved");
        mongoose.connection.close();
    })
}
