const express = require('express');
const cors = require('cors');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)
const port  = 3000;


app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})

app.get('/api/v1/books', (request, response) => {
    database('books').select()
    .then((books) => {
        response.status(200).json(books);
    })
    .catch((error) => {
        response.status(500).json({error})
    })
});

app.get('./api/v1/books/:id', (request, response) => {
    database('books').select()
    .then(books => {
        const id = parseInt(req.params.id);
        const found = books.find(book => book.id === id)
        response.status(200).json(found);
    })
    .catch(error => response.status(500).json({error}))
})

app.get('./api/v1/additional', (request, response) => {
    database('additional').select()
    .then((additional) => {
        response.status(200).json(additional);
    })
    .catch((error) =>{
        response.status(500).json({error})
    })
})

app.get('./api/v1/additional/:id', (request,response) => {
    database('additional').select()
    .then(additional => {
        const id = parseInt(req.params.id);
        const found = additional.find(info => info.id === id);
        response.status(200).json(found);
    })
    .catch(error => response.status(500).json({error}))
})