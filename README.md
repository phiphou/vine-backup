# vine-backup

A very basic project to backup your Vines before the service shut down, as [announced](http://blog.vine.co/post/152386882201/important-news-about-vine) recently.

## Usage

First, clone or fork this repo and install the project.

```bash
$ git clone --depth 1 https://github.com/phiphou/vine-backup.git
$ cd vine-backup
$ npm install
```

Then, run the app with

```bash
$ node src/app.js --email YOUR_EMAIL --password YOUR_PASSWORD
```

The app will get the list of all your Vines and download them sequentially in the `Vines` folder.

## License

This project is licensed under the terms of the [MIT license](https://opensource.org/licenses/MIT).
