const booksData = require("../../../data");

const createBook = (knex, book) => {
  return knex("books")
    .insert(
      {
        title: book.title,
        author: book.author_name,
        description: book.description
      },
      "id"
    )
    .then(bookID => {
      let additionalPromise = [];
        additionalPromise.push(
          createAdditional(knex, {
            pages: book.additional.pages,
            list_price: book.additional.list_price,
            books_id: bookID[0]
          })
        );
        return Promise.all(additionalPromise);
      });
};

const createAdditional = (knex, additional) => {
  return knex("additional").insert(additional);
};

exports.seed = function(knex) {
  return knex("additional")
    .del()
    .then(() => knex("books").del())
    .then(() => {
      let bookPromise = [];
      booksData.forEach(book => {
        bookPromise.push(createBook(knex, book));
      });
      return Promise.all(bookPromise);
    })
    .catch(error => console.log(`Error sending data: ${error}`));
};
