FROM node:lts-alpine
WORKDIR /Ev1-Html
COPY package.json package-lock.json ./
RUN npm install --production
COPY . . 
EXPOSE 7103
CMD ["node", "reto-1-evaluacion/js/server.js"]
