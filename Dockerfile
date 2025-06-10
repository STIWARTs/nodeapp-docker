FROM node 

ENV MONGO_DB_USERNAME=root \
    MONGO_DB_PWD=example

RUN mkdir -p delta/nodeapp

COPY . /delta

# RUN npm install

CMD ["node", "/delta/nodeapp/server.js"]

# docker build -t nodeapp:1.0 .