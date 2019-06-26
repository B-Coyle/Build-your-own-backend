exports.up = function(knex) {
    return Promise.all([
      knex.schema.table('books', function(table) {
        table.dropColumn('description');
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.table('books', function(table) {
        table.string('description', 1000)
        table.dropColumn('description');
    })
    ]);
  };