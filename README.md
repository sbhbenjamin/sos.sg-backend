# sos.sg

Backend repository to the sos.sg mobile application. The frontend repository is available [here](https://github.com/iztanpy/sos.sg-frontend).

<strong>sos.sg</strong> is envisioned as a companion app for the Samaritans of Singapore's 24/7 [hotline](https://www.sos.org.sg/) which seeks to provide access to help for mental health. With the increased use of mobile phones of the newer generation, coupled with increased stress levels of the education system and the neoliberal society, the application re-envisions this help as a mobile application, to make mental health help even more accessible.

## Functions

The key feature of the application is the real-time chat system. It seeks to enable users to anonymously chat with a volunteer from SoS, circumventing phone call anxiety. The second feature of the application is the forum, which encourages persons afflicted with various mental issues to find a voice in a community

## Technical Aspect

The frontend of the application is built on [React Native](https://reactnative.dev/) with [Expo](https://expo.dev), with [Redux](https://redux.js.org/) as the state manager of choice. The backend of the application is built on [Express](https://expressjs.com/) and [Node](https://nodejs.org/en/), with [MongoDB](https://www.mongodb.com/) for the database. The chat system was built with web sockets using [socket.io](https://socket.io/).

## Limitations

Given the short period of time we had to build the application (24 hours), we had to rush to build a Minimum Viable Product for the showcase and judging. Therefore, the coding practices adopted was unfortunately not the best. Given more time, we would polish up the application to use better abstractions, spend more time working on state management in the frontend, and include a more comprehensive error catching set up.

## Moving forward

We want to polish up the application to push out a more polished version of what we have now, and then continue to seek a potential partnership with the Samaritans of Singapore.

## Usage
### ES Modules 
We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

### Environment Variables
Create a .env file in then root and add the following
```
NODE_ENV = 'test'
PORT = 4000
MONGODB_URI = your mongodb uri
TEST_MONGODB_URI = your test mongodb uri
SECRET = 'abc123'
```

### Install Dependencies
```
npm install
```

### Run
```
# Run backend on Port 4000
npm run dev
```

## Screenshots
<div>
  <img src="screenshots/home.png" height='400' width="auto" />&nbsp;
  <img src="screenshots/post.png" height='400' width="auto" />&nbsp;
  <img src="screenshots/create-post.png" height='400' width="auto" /><br /> 
  <em>Home Screen, Post Screen, Create Post Screen<br /></em> <br /> 
  
  <img src="screenshots/pre-chat.png" height='400' width="auto" />&nbsp;
  <img src="screenshots/chat.png" height='400' width="auto" /><br /> 
  <em>Chat Screens</em><br /> <br /> 
  
  <img src="screenshots/login.png" height='400' width="auto" /><br /> 
  <em>Login Screen</em><br /> <br /> 
</div>
