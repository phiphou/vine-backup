# vine-backup

A very basic project to backup your Vines before the service shut down, as [announced](http://blog.vine.co/post/152386882201/important-news-about-vine) recently.

## Usage

First, clone or fork this repo and install the project.

```bash
$ git clone --depth 1 https://github.com/phiphou/vine-backup.git
$ cd vine-backup
$ npm install
```
Then, update [`./src/app.js`](https://github.com/phiphou/vine-backup/blob/master/src/app.js) file, [lines 4 and 5](https://github.com/phiphou/vine-backup/blob/master/src/app.js#L4-L5), with your Vines credentials:

```javascript
const email = "YOUR_EMAIL"
const password = "YOUR_PASSWORD"
```

Finally, run the app with

```bash
$ npm start
```

The app will get the list of all your Vines and download them sequentially in the `Vines` folder.

## License

This project is licensed under the terms of the [MIT license](https://opensource.org/licenses/MIT).
