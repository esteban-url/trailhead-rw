# Trailhead

Trailhead is a starter point for your app, based on top of [Redwoodjs](https://github.com/redwoodjs/redwood) , it adds common functionalities so you don't have to!

- auth, provided by netlify identity. [docs](https://docs.netlify.com/visitor-access/identity/)
- user management, provided via custom pages, component and services
- Error Loggin



There are two ways to use trailhead,

## Getting started the *super easy way*

[Click here](https://github.com/esteban-url/trailhead-rw/generate) to generate a new repository from the latesr version of trailhead.

## Step by step guide
If you are starting from scratch you can follow this steps:
### Create the app

```sh
yarn create redwood-app app-name
```
```sh
cd  app-name
```
### Setup the auth configuration
```sh
yarn rw setup auth netlify
```
### Install got
```sh
yarn workspace api add got
```
### Setup the deployment configuration
Using netlify
```sh
yarn rw setup deploy netlify
```
### Components

Copy all the folders and files from `web/src/components`
### Layouts

Copy all the folders and files from `web/src/layouts`

### Pages

Copy all the folders and files from `web/src/pages`
### Edit routes


This will add the pages to the router, the file is located at `web/src/routes.js`

[Click here for the latest version](https://github.com/esteban-url/trailhead-rw/blob/main/web/src/Routes.js#L1-L500)
### Services
Copy all the folders and files from `api/src/services`

### SDL
Copy all the folders and files from `api/src/graphql`
You are done! you can start the dev server now

```sh
yarn rw dev
```

## Deploying to netlify

To deploy the app to netlify, I higly recommend configuring  your site for [continuous deployment](https://docs.netlify.com/configure-builds/get-started/) by connecting your site to a git repository. [click here to create a new site](https://app.netlify.com/start) and follow the steps there

---
# Redwood
 **WARNING:** RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase.

## Getting Started
- [Tutorial](https://redwoodjs.com/tutorial/welcome-to-redwood): getting started and complete overview guide.
- [Docs](https://redwoodjs.com/docs/introduction): using the Redwood Router, handling assets and files, list of command-line tools, and more.
- [Redwood Community](https://community.redwoodjs.com): get help, share tips and tricks, and collaborate on everything about RedwoodJS.

### Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn install
```

### Fire it up

```terminal
yarn redwood dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app. Lambda functions run on `http://localhost:8911` and are also proxied to `http://localhost:8910/.redwood/functions/*`.
