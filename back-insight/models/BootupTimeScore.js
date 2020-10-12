const { Model } = require('objection');
const knex = require('knex');
const dbConfig = require('../knexfile');

const dbInfo = knex(dbConfig);
Model.knex(dbInfo);

class BootupTimeScore extends Model {
  static get tableName() {
    return 'bootuptime_score';
  }

  static get idColumn() {
    return 'id_bootup';
  }
}

module.exports = BootupTimeScore;
