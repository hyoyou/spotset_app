# SpotSet Client [![Build Status](https://travis-ci.com/hyoyou/spotset_app.svg?branch=master)](https://travis-ci.com/hyoyou/spotset_app)

## Prerequisites

- Node, Download [here](https://nodejs.org/en/download/)
- Yarn, to install Node.js dependencies (Ways to install yarn can be found [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable))

## Setup

- Clone this repo and `cd` into directory

### Setting up Environment Variables

- Copy the .env.sample file into a .env file with command

```
$ cp .env.sample .env
```

or create a `.env` file in root and copy the contents of the [.env.sample](https://github.com/hyoyou/spotset_app/blob/master/.env.sample) file

- Insert your Spotify Client ID where specified and save

- Run the following command to install dependencies:

```
$ yarn
```

## Running the App

- To run the app on development server, use the following command (make sure the [server](https://github.com/hyoyou/spotset_api) is already running):

```
$ yarn start
```

then navigate to http://localhost:3000/

## Running the Tests

- To run unit tests, use the following command:

```
$ yarn test
```

## How to Use The App

If server is already running, navigating to http://localhost:3000/ should take you to the page below:

<p align="center">
  <img width="650" src="https://spotset.s3.amazonaws.com/Screen+Shot+2019-07-17+at+11.21.44+AM.png"s>
</p>

Find a setlist that you're interested in, from [setlist.fm](https://www.setlist.fm), and grab the setlist ID from the URL. It is an 8-character alphanumeric combination just before the `.html` at the end.

<p align="center">
  <img width="650" src="https://spotset.s3.amazonaws.com/Screen+Shot+2019-07-18+at+12.54.30+AM.png">
</p>

Once you click on `Display Setlist` with a valid setlist ID, you should see the setlist with the availability of the songs on Spotify.

**Please login to Spotify at this point if you want any customizations on your playlist.**

Songs that are unavailable are greyed out. You can click on each song to remove/add before saving to your playlist. Note: Removing and then adding back the same track will not preserve order.

Click on `Save as Playlist` to save. Upon success, you should see the button has changed to `Go to Playlist`. Clicking this button will take you to your new playlist :) Enjoy!

<p align="center">
  <img width="650" src="https://spotset.s3.amazonaws.com/Screen+Shot+2019-07-17+at+11.26.17+AM.png">
</p>

## Troubleshoot

I am currently working on fixing the issue where a user has been logged out after an hour due to an expired token, but the setlist is still saved. Please open the developer tools in a Chrome browser and run `localStorage.removeItem("setlist_id")` to remove it. Sorry for the inconvenience!
