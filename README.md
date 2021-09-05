# Twitter Clone

## Installation Instructions (Linux)

### Pre-requisites:

- Node.js
- npm
- MongoDB

After downloading files carry out the following instructions once inside the project directory.

### Install Packages

Install all packages for client side:

```
> cd client && npm install
```

Install all packages for server side:

```
> cd server && npm install
```

### Connect to Database

After these two steps there are two options regarding the database.

Either replace the MongoDB connection string on line 11 in `/server/server.js` with a local connection string or remote connection string.

Local connection string ( port is 27017 by default ):

`mongodb://localhost:<port>/twitterDB`

This option requires an extra step when using the project as you will have to run MongoDB, it's simple just enter the following command in your terminal:

`> mongod`

Remote connection string:

Read [this](https://docs.mongodb.com/manual/reference/connection-string/) for more information.

### Start Client & Server

Once all npm packages are installed run the following command in both `/client` & `/server`:

`> npm start`

## Description

This is the first iteration of this project, if you have any suggestions please leave it in the issues section.

This application is a clone of Twitter. Containing an almost identical UI, with a very similar user experience. For this project, I have written both the backend API and the front end.

At this current moment in time, users are able to register, sign in and make a post. Additionally, users can view their own and other user's profiles, to look at their tweets.

Users are only able to make a tweet if they are logged in, and only individual profiles may be viewed if not logged in.

## Future Plans

This is a project with a lot of potential to showcase a range of skills, which I will slowly add to as I learn new technologies that will take this project to the next level.

As of now, my plans include:

- Ability to delete tweets
- Improve the User data model, allowing for a biography and profile picture; also including email in the sign up process that must be verified before utilising protected routes

## Known Bugs

The only bug that I am aware of through my testing, is a memory leak of unmounted components, namely, `Feed.js` and `ProfileFeed.js`.

## Technologies Used

- HTML
- CSS
- React ( with react-router-dom )
- Node.js ( with Express )
- MongoDB ( with Mongoose )
- JavaScript ( with axios and )
