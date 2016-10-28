const Vineapple = require('vineapple');
const download = require('download-file')
const vine = new Vineapple()
const email = "YOUR_EMAIL"
const password = "YOUR_PASSWORD"
let videos = []

console.log('Getting Vines list...')
vine.login(email, password, function(error, client) {
  getList(client)
});

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
  download(videos[0].videoUrl, {directory: "Vines", filename: videos[0].postId + '.mp4'}, err => {
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
