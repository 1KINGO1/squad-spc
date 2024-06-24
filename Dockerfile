FROM node
LABEL authors="KINGO"

WORKDIR spc
COPY ./ ./

RUN cd ./client
RUN npm install
RUN npm run build
RUN cd ..

RUN npm install
RUN npm run build

ENTRYPOINT node ./dist/main.js

