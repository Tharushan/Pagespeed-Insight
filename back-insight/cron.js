const axios = require('axios');
const { CronJob } = require('cron');
const knex = require('knex');

const dbConfig = require('./knexfile');
const PerformanceScore = require('./models/PerformanceScore');

const _knex = knex(dbConfig);

require('dotenv').config()

const { GOOGLE_API_KEY } = process.env;

const WEBSITE_URL = encodeURIComponent('https://www.voici.fr/');

const insightUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=PERFORMANCE&strategy=mobile&url=${WEBSITE_URL}&key=${GOOGLE_API_KEY}`;

const job = new CronJob(
  '* * * * *',
  async () => {
    try {
      const performanceTable = await _knex.schema.hasTable('performance_score');
      if (!performanceTable) {
        console.log('No performance_table, exiting...')
        return;
      }
      const { data } = await axios.get(insightUrl);
      if (!data) {
        console.error('Error on request', data);
        return;
      }
      const date = new Date();
      await PerformanceScore.query()
        .insert({
          date_performance: date,
          score: data.lighthouseResult.categories.performance.score
      });
      console.log(`Date: %s | Score: ${data.lighthouseResult.categories.performance.score}`, date);
    } catch (error) {
      console.error(error.message);
    }
  },
  null,
  false,
  'Europe/Paris'
);

job.start();