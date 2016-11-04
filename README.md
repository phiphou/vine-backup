[![GitHub version](https://badge.fury.io/gh/phiphou%2Fvine-backup.svg)](https://badge.fury.io/gh/phiphou%2Fvine-backup) [![Code Climate](https://codeclimate.com/github/phiphou/vine-backup/badges/gpa.svg)](https://codeclimate.com/github/phiphou/vine-backup) [![Dependency Status](https://david-dm.org/phiphou/vine-backup.svg)](https://david-dm.org/phiphou/vine-backup) [![MIT license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](http://opensource.org/licenses/MIT) ![Size](https://reposs.herokuapp.com/?path=phiphou/vine-backup)

# vine-backup

A very basic project to backup your **[Vines](https://vine.co/)** (and optionnaly the one you liked) before the service shut down, as **[announced](http://blog.vine.co/post/152386882201/important-news-about-vine)** recently.

## Quick start

Clone or fork this repo and install the project.

```bash
$ git clone --depth 1 https://github.com/phiphou/vine-backup.git
$ cd vine-backup
$ npm install
```
Then run the app and provide it your Vine credentials with :

```bash
$ node src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD
```


## Install

First, make sure you've got **[NodeJS](http://nodejs.org)** installed. If not, go to **[nodejs.org](http://nodejs.org)** to download and install it. It will also install NPM.

Then, clone or fork this repo and install the project.

```bash
$ git clone --depth 1 https://github.com/phiphou/vine-backup.git
$ cd vine-backup
$ npm install
```

You can also use the new **[Yarn](https://yarnpkg.com/)** package manager.

```bash
$ yarn
```

## Usage

### Owner's Vines

Run the app and provide it your Vine credentials with :

```bash
$ node src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD
```

The app will get the list of all your Vines and download them sequentially in the `./Vines/me` folder.

### Liked Vines

You can also download the Vines you liked in addition to your own vines by adding a `--likes` flag:

```bash
$ node src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD --likes
```

The app will store liked Vines in the `./Vines/likes` folder.

![GIF](https://dl.dropboxusercontent.com/u/55433448/vine-backup-anim.gif)

## License

This project is licensed under the terms of the **[MIT license](https://opensource.org/licenses/MIT)**.
