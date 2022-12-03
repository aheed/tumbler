# Tumbler

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run build-backend`

### `npm run start-backend`

### Standard create-react-app scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Running backend + frontend locally

For running backend+frontend locally:
Place .env file in the repo root dir. It should look like this:
DB_CONN=<MongoDB connection string>
REACT_APP_BACKEND_URL=http://localhost:5000

## Deployment

### Using helm

See github workflow. Requires Actions secrets set up correctly in github repo for MongoDB connection string (Atlas), Docker hub credentials and virtual machine SSH credentials.

### Using docker-compose

Place .env in the repo root dir on the server. It should look like this:
DB_CONN=<MongoDB connection string>

Place privkey.pem and fullchain.pem on the server root directory. These files are created by certbot.

To create cert files:
sudo certbot certonly --standalone

To renew expired cert files:
sudo certbot renew --force-renewal to recreate expired files.

To install certbot:
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

To deploy:
docker-compose build
docker-compose up -d

## Alternative ways to use docker

---

docker build -f backend.Dockerfile -t backend .
winpty docker run -d --rm -p 5000:5000 --env-file .env --name running_backend backend

--
docker build -f nginx_dbg.Dockerfile -t frontend .
winpty docker run -d --rm -p 3000:80 --name running_frontend frontend

--
docker build -f Dockerfile -t frontend .
docker run -d --rm -p 80:80 -p 443:443 --name running_frontend frontend

## Virtual machine for deployment, Azure

See azure dir for ARM templates

Manual steps after VM creation:
Install docker
Install microk8s
microk8s enable ingress
Install helm
Create ~/scribble/myremotesubdir/tumbler and clone the repo there
Install certbot, copy .pem files to ~/scribble/myremotesubdir/tumbler


## Admin

### TLS certificate

See above above about certbot
<https://letsencrypt.org/>

### domain

<https://www.dotspin.se/>

<https://www.one.com/>
Login with email and password to manage

### MongoDb Atlas

<https://cloud.mongodb.com/>
Log in with Google to manage the DB.
DB name: dev

### Google sign-in

<https://console.cloud.google.com/>
Project name: tumbler

At the moment the app is in Testing status. Only registered test users can log in.
APIs & Services > OAuth Consent screen > Test users

More info: <https://developers.google.com/identity/sign-in/web/sign-in>

### Update certificate
microk8s disable ingress
sudo certbot certonly --standalone
cd /home/conrad/scribble/myremotesubdir/tumbler
sudo cp /etc/letsencrypt/live/www.dotspin.se/privkey.pem .
sudo cp /etc/letsencrypt/live/www.dotspin.se/privkey.pem .
kc delete secret tumbler-secret-tls
microk8s enable ingress
rerun deployment workflow