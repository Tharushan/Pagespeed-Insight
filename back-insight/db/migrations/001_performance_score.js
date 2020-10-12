exports.up = (knex, Promise) => {
  return knex.schema.createTable('performance_score', userTable => {
    userTable.increments('id_performance').primary();
    userTable.float('score').notNullable();
    userTable
      .datetime('date_performance')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('performance_score');
};
