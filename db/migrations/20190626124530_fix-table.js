exports.up = function(knex) {
    return Promise.all([
      knex.schema.table('additional', function(table) {
        table.dropColumn('title');
      })
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.table('additional', function(table) {
        table.string('publisher');
    })
    ]);
  };