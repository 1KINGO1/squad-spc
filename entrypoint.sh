#!/bin/sh

npm install

if [ $? -eq 0 ]; then
  echo "npm install succeeded. Running the application..."

  node ./dist/main.js
else
  echo "npm install failed. Exiting."
  exit 1
fi