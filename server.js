const express = require("express");
const app = express();
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

const port = process.env.PORT || 3000;

app.set('port', process.env.PORT || 3000)

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
    if (!newBook[requiredParam] && !newBook[requiredParam] === "") {
      return response
        .status(422)
        .send({
          error: `Expected format: ${format}. You are missing ${requiredParam}.`});
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
//need to submit a book with it as well so it add a proper object 
app.post("/api/v1/additional", (request, response) => {
  const newInfo = request.body;
  const format = ["pages", "list_price"];
  for (let requiredParam of format) {
    if(!newInfo[requiredParam] && !newInfo[requiredParam] === ""){
      return response.status(422).send({
        error:`Expected format: ${format}. You are missing ${requiredParam}.`
      })
    }
  }
  database('additional')
  .insert(newInfo, 'id')
  .then(newInfo => {
    response.status(201).json({ id: newInfo[0]})
  })
  .catch(error=> {
    response.status(500).json({ error })
  })
});

// app.delete('/api/v1/books/:id', (request, response) => {
//   let found = false
//   database('books').select()
//     .then(book => {
//       book.forEach(book => {
//         if (book.id === parseInt((request.params.id))) {
//           found = true
//         }
//       })
//       if (!found) {
//         return response.status(404).json(`Book not found - delete unsuccessful`)
//       } else {
//         database('books').where('id', parseInt(request.params.id)).del()
//           .then(() => {
//             return response.status(202).json(`Deleted book with id of ${request.params.id}`)
//           })
//       }
//     })
//     .catch(error => {
//       response.status(500).json({ error })
//     })
// })


// app.delete('/api/v1/additional/:id', (request, response) => {
//   let found = false
//   database('additional').select()
//     .then(info => {
//       info.forEach(info => {
//         if (info.id === parseInt((request.params.id))) {
//           found = true
//         }
//       })
//       if (!found) {
//         return response.status(404).json(`Additional information about book not found - delete unsuccessful`)
//       } else {
//         database('books').where('id', parseInt(request.params.id)).del()
//           .then(() => {
//             response.status(202).json(`Deleted additional information about book with id of ${request.params.id}`)
//           })
//       }
//     })
//     .catch(error => {
//       response.status(500).json({ error })
//     })
// })