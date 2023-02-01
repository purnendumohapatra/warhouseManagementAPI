FROM node:14
WORKDIR /app
COPY ["package.json","package-lock.json","./"]
RUN npm install -g nodemon 
COPY . .
ENV PORT_NUM 8090
EXPOSE $PORT_NUM 
CMD ["npm","run","start"]