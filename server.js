const express = require("express");
const app = express();
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.get("/api/v1/books", (request, response) => {
  database("books")
    .select()
    .then(books => {
      response.status(200).json(books);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/additional", (request, response) => {
  database("additional")
    .select()
    .then(additional => {
      response.status(200).json(additional);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/books/:id", (request, response) => {
  database("books")
    .where("id", request.params.id)
    .select()
    .then(books => {
      if (books.length) {
        response.status(200).json(books);
      } else {
        response.status(404).json({
          error: `Could not find books with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/additional/:id", (request, response) => {
  database("additional")
    .where("id", request.params.id)
    .select()
    .then(additional => {
      if (additional.length) {
        response.status(200).json(additional);
      } else {
        response.status(404).json({
          error: `Could not find additional information with id ${
            request.params.id
          }`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/books", (request, response) => {
  const newBook = request.body;
  const format = ["title", "author", "description"];
  for (let requiredParam of format) {
    if (!newBook[requiredParam]) {
      return response
        .status(422)
        .send({
          error: `Expected format: ${format}. You are missing ${requiredParam}.`
        });
    }
  }
  database("books")
    .insert(newBook, "id")
    .then(book => {
      response.status(201).json({ id: book[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/additional", (request, response) => {
  const newInfo = request.body;
  const format = ["pages", "list_price"];
  for (let requiredParam of format) {
    if(!newInfo[requiredParam]){
      return response.status(422).send({
        error:`Expected format: ${format}. You are missing ${requiredParam}.`
      })
    }
  }
  database('additional')
  .insert(newInfo => {
    response.status(201).json({ id: newInfo[0]})
  })
  .catch(error=> {
    response.status(500).json({ error })
  })
});
