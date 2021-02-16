FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./backend ./backend
COPY ./src ./src

RUN npm run build-backend

EXPOSE 5000
CMD [ "node", "backend_dist/backend/app.js" ]
