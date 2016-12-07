[![NPM version](https://img.shields.io/npm/v/vine-backup.svg)](https://www.npmjs.com/package/vine-backup) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Dependency Status](https://david-dm.org/phiphou/vine-backup.svg)](https://david-dm.org/phiphou/vine-backup) [![npm](https://img.shields.io/npm/dt/vine-backup.svg)](https://www.npmjs.com/package/vine-backup) [![MIT license](https://img.shields.io/npm/l/vine-backup.svg)](http://opensource.org/licenses/MIT) ![Size](https://reposs.herokuapp.com/?path=phiphou/vine-backup)


# vine-backup

A very basic project to backup your **[Vines](https://vine.co/)** (and optionnaly the ones you liked) or any other user Vines (and optionnaly the ones he liked) before the service shut down, as **[announced](http://blog.vine.co/post/152386882201/important-news-about-vine)** recently.

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
![GIF](https://dl.dropboxusercontent.com/u/55433448/vine-backup-anim.gif)

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

#### Owner's Vines

Run the app and provide it your Vine credentials with :

```bash
$ node ./src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD
```

The app will get the list of all your Vines and download them sequentially in the `./Vines/me` folder.

#### Liked Vines

You can also download the Vines you liked in addition to your own vines by adding a `--likes` flag:

```bash
$ node ./src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD --likes
```

The app will store liked Vines in the `./Vines/likes` folder.

#### Any user Vines

You can download the Vines from any user by adding a `--user` flag and providing any Twitter user screen_name.

You also can add a `--likes` flag if you want to download Vines liked by the user.

```bash
$ node ./src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD --user ANY_TWITTER_SCREEN_NAME
```

The app will store Vines in the `./Vines/[ANY_TWITTER_SCREEN_NAME]` folder and optionnaly likes in the `./Vines/[ANY_TWITTER_SCREEN_NAME]/likes` folder.

#### Export links list

You can export a list of the Vines URLs instead of download them by adding a `--list` flag.

```bash
$ node ./src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD --list
```

The app will create a links list in the `./Vines/vines_links_list.txt` file.

You can then use the list with `WGET` for instance :

```bash
$ wget -i vine_link_list.txt
```

#### Filenames

By default, Vines filenames are in the form `{POST_ID}.mp4`.

If you add a `--dates` flag, it will be `{YYYY-MM-DD_HH-MM-SS}_{POST_ID}.mp4`


#### No_reposts

By default, reposted Vines are downloaded. You can pass a `no_reposts` flag to avoid downloading them.

```bash
$ node ./src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD --no_reposts
```

## License

This project is licensed under the terms of the **[MIT license](https://opensource.org/licenses/MIT)**.
