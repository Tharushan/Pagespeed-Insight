require('dotenv').config();

// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    database: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'knex_migrations'
  }
  // seeds: {
  //   directory: './db/seeds'
  // }
};
