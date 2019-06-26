const express = require('express');
const cors = require('cors');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)
const port  = 3000;


app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log(`App is running on port ${port}`)
})

app.get('/api/v1/books', (request, response) => {
    database('summerread').select()
    .then((books) => {
        response.status(200).json(books);
    })
    .catch((error) => {
        response.status(500).json({error})
    })
});

//update this get because it's not targeting the id specifically
app.get('./api/v1/books:id', (request, response) => {
    database('summerread').select()
    .then((books) => {
        response.status(200).json(books);
    })
    .catch((error) =>{
        response.status(500).json({error})
    })
})