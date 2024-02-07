require("dotenv").config();
const Person = require('./models/person.js');
const express = require('express')
const morgan = require('morgan')
const cors = require("cors");
const app = express()
const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformed ID" });
    }
    next(error);
}
const unknownEndpoint = (req, res) => {
    res.status(404).send(
        {
            error: 'This path does not exist',
        }
    )
}
let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];
app.use(express.static('dist'));
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', function (req, res) {
    return JSON.stringify(req.body);
});

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const date = Date.now();
    response.send(`Phonebook has info for ${persons.length} people`)
    console.log(date);
})
app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        console.log(result);
        response.json(result);
    })
})

app.post('/api/persons', (request, response) => {

    const person = new Person({
        name: request.body.name,
        number: request.body.number,
    })
    person.save()
        .then(result =>
            response.json(result)
        ).catch(error => {
            response.status(400).end();
        }
        )
})
app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    Person.findById(id).then(person => {
        if (person) {
            response.json(person);
        }
        else {
            response.status(404).send({
                error: 'Person not found'
            });
        }
    }).catch(error => {
        next(error);
    });
});

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    Person.findByIdAndUpdate(id, body, { new: true }).then(updatedPerson => {
        if (updatedPerson) {
            res.json(updatedPerson);
        }
        else {
            res.status(404).send({
                error: 'Person not found'
            });
        }
    }).catch(error => {
        res.status(400).send({
            error: 'Invalid id'
        });
    });
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    Person.findByIdAndDelete(id).then(deletedPerson => {
        if (deletedPerson) {
            console.log(deletedPerson)
            response.status(204).end();
        }
        else {
            response.status(404).send({
                error: 'Person not found'
            });
        }
    }).catch(error => {
        response.status(400).send({
            error: 'Invalid id'
        });
    });
})
app.use(unknownEndpoint);
app.use(errorHandler);
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
