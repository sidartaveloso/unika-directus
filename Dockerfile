FROM directus/directus:10.8.3
WORKDIR /directus
COPY docker-files/package.json docker-files/yarn.lock ./
COPY ./extensions ./extensions
RUN yarn

CMD yarn directus bootstrap && yarn directus start
