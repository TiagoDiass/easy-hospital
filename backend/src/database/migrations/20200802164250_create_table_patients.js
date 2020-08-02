exports.up = function (knex) {
  return knex.schema.createTable('patients', (table) => {
    table.increments('id').primary();
    table.string('name').notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('patients');
};
