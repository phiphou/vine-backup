const Vineapple = require('vineapple');
const download = require('download-file')
const argv = require('yargs').argv
const vine = new Vineapple()
let videos = []

if (!argv.email) {
  console.log('You must specify an email arg, like -email MY_EMAIL@MY_PROVIDER.COM')
} else if (!argv.password) {
  console.log('You must specify a password arg, like -password MY_PASSWORD')
} else {
  console.log('Getting Vines list...')
  vine.login(argv.email, argv.password, function(error, client) {
    if(error)
      console.log('Unable to connect, please check your credentials.')
    else
      getList(client)
  })
}

function getList(client, page = 0) {
  client.user(client.userId, {page: page}, (error, user) => {
    for (let r of user.records)
      videos.push(r)
    if (user.nextPage !== null) {
      getList(client, user.nextPage)
    } else {
      console.log(videos.length + ' Vines to download.')
      dl()
    }
  })
}

function dl() {
  download(videos[0].videoUrl, {
    directory: "Vines",
    filename: videos[0].postId + '.mp4'
  }, err => {
    if (err)
      console.log(err, videos[0].postId)
    videos.shift()
    if (videos.length > 0) {
      console.log('Vine with id: ' + videos[0].postId + ' downloaded, ' + videos.length + ' remaining.')
      dl()
    } else {
      console.log('Finish !')
    }
  })
}
