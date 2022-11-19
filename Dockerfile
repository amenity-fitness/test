FROM node:14

WORKDIR /app
COPY . .
RUN yarn
EXPOSE 3000
RUN yarn build
CMD [ "yarn", "start" ]
