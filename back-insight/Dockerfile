FROM node:13-slim

ENV APP_NAME back-insight
ENV APP_PATH /opt/${APP_NAME}

RUN mkdir ${APP_PATH}

VOLUME ${APP_PATH}
WORKDIR ${APP_PATH}

COPY package.json .

RUN npm install

EXPOSE 8000

CMD ["bash", "./start.sh"]