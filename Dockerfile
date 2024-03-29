FROM node:14 as build-deps

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./src ./src
COPY ./public ./public

RUN npm run build



FROM nginx

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/


