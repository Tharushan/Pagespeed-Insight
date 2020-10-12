exports.up = (knex, Promise) => {
  return knex.schema.createTable('performance_score', performanceScoreTable => {
    performanceScoreTable.increments('id_performance').primary();
    performanceScoreTable.float('score').notNullable();
    performanceScoreTable
      .datetime('date_performance')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('performance_score');
};
