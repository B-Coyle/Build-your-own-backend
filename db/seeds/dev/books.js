const { booksData } = require('../../../data')

const createBook = (knex, book) => {
  return knex('book').insert({
    title: book.title,
    author: book.author,
    description: book.description
  }, 'id')
  .then(bookId => {
    let bookPromise = [];
    book.additional.forEach(book => {
      bookPromise.push(
        createAdditional(knex, {
          pages: book.pages,
          list_price: book.list_price,
          bookId: bookId[0]
        })
      )
    });
    return Promise.all(bookPromise)
  })
}

const createAdditional = (knex, book) => {
  return knex('book').insert(book)
}

exports.seed = function(knex) {
  return knex("additional")
    .del()
    .then(() => knex("books").del())
    .then(() => {
      return Promise.all([
        knex("books")
          .insert(
            {
              title: "The Lord Of The Rings Trilogy",
              author: "J.R.R. Tolkien",
              description: "Tolkien's seminal three-volume epic chronicles the War of the Ring, in which Frodo the hobbit and his companions set out to destroy the evil Ring of Power and restore peace to Middle-earth. The beloved trilogy still casts a long shadow, having established some of the most familiar and enduring tropes in fantasy literature."
            },
            "id"
          )
          .then(paper => {
            return knex("additional").insert([
              { pages: "", list_price: "" ,books_id: paper[0] },
              { pages: "", list_price: "" ,books_id: paper[0] }
            ]);
          })
          .then(() => console.log("Seeding complete"))
          .catch(error => `There is an error with seeding footnotes, ${error}`)
      ]);
    })
    .catch(error => console.log(`Error sending data: ${error}`));
};
