const axios = require('axios');
const { CronJob } = require('cron');
const knex = require('knex');

const dbConfig = require('./knexfile');
const PerformanceScore = require('./models/PerformanceScore');
const BootupTimeScore = require('./models/BootupTimeScore');

const initKnex = knex(dbConfig);

require('dotenv').config();

const { GOOGLE_API_KEY } = process.env;

const WEBSITE_URL = encodeURIComponent('https://www.voici.fr/');

const insightUrl = `https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?category=PERFORMANCE&strategy=mobile&url=${WEBSITE_URL}&key=${GOOGLE_API_KEY}`;

const job = new CronJob(
  '* * * * *',
  async () => {
    try {
      const performanceTable = await initKnex.schema.hasTable('performance_score');
      if (!performanceTable) {
        console.log('No performance_score table, exiting...');
        return;
      }
      const { data } = await axios.get(insightUrl);
      if (!data) {
        console.error('Error on request', data);
        return;
      }
      const date = data.lighthouseResult.fetchTime;
      await PerformanceScore.query().insert({
        date_performance: date,
        score: data.lighthouseResult.categories.performance.score
      });

      const bootupTime = data.lighthouseResult.audits['bootup-time'];
      await BootupTimeScore.query().insert({
        score: bootupTime.score,
        timing: Math.ceil(bootupTime.numericValue) / 1000,
        date_bootup: date
      });

      console.log(
        `Date: %s | Performance Score: ${data.lighthouseResult.categories.performance.score}`,
        date
      );
    } catch (error) {
      console.error(error.message);
    }
  },
  null,
  false,
  'Europe/Paris'
);

job.start();
