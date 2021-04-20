# Trailhead

Trailhead is a starter point for your app, based on top of [Redwoodjs](https://github.com/redwoodjs/redwood) , it adds common functionalities so you don't have to!

- auth, provided by netlify identity
- user management, provided via lambda functions

## Step by step guide
This on how I built trailhead.

To be perfectly honest this is not how I actually build it. This is the "_clean_"  version.

There was pain, blood and tears, way many commits, errors, re-tries, deploys to get everything working.

### Create the app

```sh
yarn create redwood-app trailhead-rw
```
```sh
cd  trailhead-rw
```
### Setup the auth configuration
Using netlify
```sh
yarn rw setup auth netlify
```

### Setup the deployment configuration
Using netlify
```sh
yarn rw setup deploy netlify
```


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
