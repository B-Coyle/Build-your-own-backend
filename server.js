const express = require("express");
//require the app to require express
const app = express();
//creates a new app using express
const environment = process.env.NODE_ENV || "development";
//set variable name of environment which references our configuration file used in my knexfile
const configuration = require("./knexfile")[environment];
//set variable name of configuration which references the database used in the knex file
const database = require("knex")(configuration);
//set variable name of database and require knex and the configuration file
const port = process.env.PORT || 3000;
//set variable name of port and require it to be our current port or default of 2000

app.set("port", process.env.PORT || 3000);
//sets the name of the post used as either the current port or a default of 3000

app.use(express.json());
//Allow the apps to ensure express is setup to parse json()

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
//Has the app listen to changes, sends a message on which port the app is running on

app.get("/api/v1/books", (request, response) => {
  //App is making a get request to api/v1/books
  database("books")
    //reference the books database
    .select()
    //select that database
    .then(books => {
      response.status(200).json(books);
      //if everything is ok send a 200 response with the json object of books data
    })
    .catch(error => {
      response.status(500).json({ error });
      //if not ok, send a 500 status code and a json error message
    });
});

app.get("/api/v1/additional", (request, response) => {
  //App is making a get request to api/v1/additional
  database("additional")
    //reference teh additional database
    .select()
    //select that database
    .then(additional => {
      response.status(200).json(additional);
      //if everything is ok with grabbing information send a 200 status code with the json object of additional data
    })
    .catch(error => {
      response.status(500).json({ error });
      //if not ok, send a 500 status code and a json error message
    });
});

app.get("/api/v1/books/:id", (request, response) => {
  //App is making a get request to api/v1/books/:id (targetting a specific book)
  database("books")
    //reference to the database
    .where("id", request.params.id)
    //find a book in the database where the id matches the id form the request params
    .select()
    //select it
    .then(books => {
      //if there is a book that matches (ie there is a books.length)
      if (books.length) {
        response.status(200).json(books);
        //send a response code of 200 and the associated item
      } else {
        response.status(404).json({
          error: `Could not find books with id ${request.params.id}`
          //if there is no book by that id, send a 404 message with a message that the book wasn't found
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
      //if there was a problem with the request itself, send a status code of 422 and a error message
    });
});

app.get("/api/v1/additional/:id", (request, response) => {
  //App is making a get request to api/v1/additional/:id (targetting a specific additional information about a book)
  database("additional")
    //targeting the additional database
    .where("id", request.params.id)
    //find a book in the database where the id matches the id form the request params
    .select()
    //select it
    .then(additional => {
      //if there is additional information that matches (ie there is a additional.length)
      if (additional.length) {
        response.status(200).json(additional);
        //send a response code of 200 and the associated item
      } else {
        response.status(404).json({
          error: `Could not find additional information with id ${
            request.params.id
          }`
          //if there is no additional information by that id, send a 404 message with a message that the info wasn't found
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
      //if there was a problem with the request itself, send a status code of 422 and a error message
    });
});

app.post("/api/v1/books", (request, response) => {
  //App is making a post request to /api/v1/books to add a new book to the database
  const newBook = request.body;
  //the book info from the request body is used to make a new book
  const format = ["title", "author", "description"];
  //setting a variable for the required format
  for (let requiredParam of format) {
    //if the book we want to add is missing one of the required params
    if (!newBook[requiredParam] && !newBook[requiredParam] === "") {
      return response.status(422).send({
        error: `Expected format: ${format}. You are missing ${requiredParam}.`
      });
      //Return a status code of 422 with an error message of what they are missing
    }
  }
  database("books")
    .insert(newBook, "id")
    //if the user includes all the required parameters, add the new book to the books database.
    .then(book => {
      response.status(201).json({ id: book[0] });
      //once the book is added in correctly, send a status code of 201 with the json of the new book's id
    })
    .catch(error => {
      response.status(500).json({ error });
      //if there was an error with the request send a status code of 500 and a error message
    });
});

app.post("/api/v1/additional", (request, response) => {
  //App is making a post request to /api/v1/additional to add a additional information about a book to the database
  const info = request.body;
  //the additional info from the request body is used to make a additional information
  const format = ["pages", "list_price"];
  //setting a variable for the required format
  for (let requiredParam of format) {
        //if the additional information we want to add is missing one of the required params
    if (!info[requiredParam]) {
      return response.status(422).send({
        error: `Expected format: ${format}. You are missing ${requiredParam}.`
      });
            //Return a status code of 422 with an error message of what they are missing
    }
  }
  let newInfo = {
    pages: info.pages,
    list_price: info.list_price
  };
  //setting a variable with new information including what it should include/target
  database("additional")
  //target the additional database
    .where({ id: info.pages })
    //where the id is the info pages
    .select("id")
    //select the id
    .then(additionalID =>
      database("additional").insert(
        { ...newInfo, book_id: additionalID[0].id },
        "id"
      )
      //insert into the database the newinfomation, the bookID that was targeted
    )
    .then(newID => {
      response.status(201).json({ id: newID[0] });
    })
    //then once it's successful send a status code of 201 with the json new id
    .catch(error => {
      response.status(500).json({ error });
    });
    //otherwise, if it didn't work send a status code of 500  and an error message
});

app.delete("/api/v1/books/:id", (request, response) => {
  const { id } = request.params;
  database("books")
    .where({ id })
    .del()
    .then(deleted => {
      if (deleted) {
        response.sendStatus(204);
      } else {
        response.status(404).json({ error: `No books with id of ${id} found` });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});
