[![GitHub version](https://badge.fury.io/gh/phiphou%2Fvine-backup.svg)](https://badge.fury.io/gh/phiphou%2Fvine-backup)
[![Dependency Status](https://david-dm.org/phiphou/vine-backup.svg)](https://david-dm.org/phiphou/vine-backup)
[![MIT license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](http://opensource.org/licenses/MIT)
![Size](https://reposs.herokuapp.com/?path=phiphou/vine-backup)

# vine-backup

A very basic project to backup your **[Vines](https://vine.co/)** before the service shut down, as **[announced](http://blog.vine.co/post/152386882201/important-news-about-vine)** recently.

## Install

First, clone or fork this repo and install the project.

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

Then, run the app and provide it your Vine credentials with :

```bash
$ node src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD
```

The app will get the list of all your Vines and download them sequentially in the `Vines` folder.

![GIF](https://dl.dropboxusercontent.com/u/55433448/vine-backup-anim.gif)

## License

This project is licensed under the terms of the **[MIT license](https://opensource.org/licenses/MIT)**.
