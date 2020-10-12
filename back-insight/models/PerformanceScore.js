const { Model } = require('objection');
const knex = require('knex');
const dbConfig = require('../knexfile');

const dbInfo = knex(dbConfig);
Model.knex(dbInfo);

class PerformanceScore extends Model {
  static get tableName() {
    return 'performance_score';
  }

  static get idColumn() {
    return 'id_performance';
  }
}

module.exports = PerformanceScore;