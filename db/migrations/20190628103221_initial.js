exports.up = function(knex) {
    return Promise.all([
      knex.schema.createTable("books", function(table) {
        table.increments("id").primary();
        table.string("title");
        table.string("author");
        table.string("description", 1000);
  
        table.timestamps(true, true);
      }),
  
      knex.schema.createTable("additional", function(table) {
        table.increments("id").primary();
        table.string("pages");
        table.string("list_price");
        table.integer("books_id").unsigned();
        table.foreign("books_id").references("books.id");
  
        table.timestamps(true, true);
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTable("additional"),
      knex.schema.dropTable("books")
    ]);
  };