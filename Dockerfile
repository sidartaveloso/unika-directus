FROM directus/directus:9.11.0
WORKDIR /directus
COPY docker-files/package.json docker-files/yarn.lock ./
COPY ./extensions ./extensions
RUN yarn

CMD yarn directus bootstrap && yarn directus start
