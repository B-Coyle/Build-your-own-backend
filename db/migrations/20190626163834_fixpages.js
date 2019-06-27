exports.up = function(knex) {
    return Promise.all([
      knex.schema.table('additional', function(table) {
        table.dropColumn('#_of_pages');
        table.string('pages');
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.table('books', function(table) {
        table.string('pages')
        table.dropColumn('#_of_pages');
    })
    ]);
  };