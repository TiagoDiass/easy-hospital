exports.up = function (knex) {
  return knex.schema.createTable('patients', (table) => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('email').notNull().unique();
    table.string('phone').notNull().unique();
    table.string('cpf').notNull().unique();
    table.string('rg').notNull().unique();
    table.date('birth').notNull();
    table.string('gender').notNull();
    table.float('weight').notNull();
    table.integer('height').notNull();
    table.string('blood_type').notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('patients');
};