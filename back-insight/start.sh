if [ "$CRON_INSIGHT" != "" ]; then
    if [ $NODE_ENV == 'docker' ]; then
        npm install
    fi
    npm run cron-insight
else
    if [ $NODE_ENV == 'docker' ]; then
        npm install
        npm run dev
    else
        npm start
    fi
fi