exports.up = (knex, Promise) => {
  return knex.schema.createTable('bootuptime_score', bootuptimeTable => {
    bootuptimeTable.increments('id_bootup').primary();
    bootuptimeTable.float('score').notNullable();
    bootuptimeTable.float('timing').notNullable();
    bootuptimeTable
      .datetime('date_bootup')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('bootuptime_score');
};
