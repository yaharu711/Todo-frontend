FROM node:22.8.0-alpine3.20
WORKDIR /src
CMD ["/bin/sh", "-c", "npm install && npm run dev"]
