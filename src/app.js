const fs = require('fs')
const Vineapple = require('vineapple')
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
  vine.login(argv.email, argv.password, function (error, client) {
    if (error) {
      console.log('Unable to connect, please check your credentials.')
    } else {
      if (argv.user) {
        getUserVines(client, argv.user)
      } else {
        if (argv.likes) {
          getLikes(client)
        } else {
          getList(client, client.userId, 'Me')
        }
      }
    }
  })
}

function getLikes (client, page = 0) {
  client.likes(client.userId, {page: page}, (error, user) => {
    if (!error) {
      for (let r of user.records) {
        videos.push({type: 'likes', data: r})
      }
      if (user.nextPage !== null) {
        getLikes(client, user.nextPage)
      } else {
        getList(client, client.userId, 'Me')
      }
    }
  })
}

function getUserVines (client, twitterScreenName) {
  client.searchUsers(twitterScreenName, (error, user) => {
    if (!error) {
      if (user.records.count === 0) {
        console.log('user not found')
      } else {
        getList(client, user.records[0].userId, twitterScreenName)
      }
    }
  })
}

function getList (client, userId, userName, page = 0) {
  client.user(userId, {page: page}, (error, user) => {
    if (!error) {
      for (let r of user.records) {
        videos.push({type: userName, data: r})
      }
      if (user.nextPage !== null) {
        getList(client, userId, userName, user.nextPage)
      } else {
        if (argv.list) {
          exportList()
        } else {
          console.log(videos.length + ' Vines to download.')
          dl()
        }
      }
    }
  })
}

function exportList () {
  let output = ''
  for (let vine of videos) {
    output += vine.data.videoUrl.replace(/\?[^\?]+$/, '') + '\n'
  }
  fs.writeFile('./Vines/vine_link_list.txt', output, err => {
    if (err) {
      return console.log(err)
    }
    console.log('The list of links was saved in ./Vines/vines_links_list.txt !')
  })
}

function dl () {
  download(videos[0].data.videoUrl, {
    directory: 'Vines/' + videos[0].type,
    filename: videos[0].data.postId + '.mp4'
  }, err => {
    if (err) {
      console.log(err, videos[0].data.postId)
    }
    videos.shift()
    if (videos.length > 0) {
      console.log('Vine with id: ' + videos[0].data.postId.substr(0, 5) +
      '...' + videos[0].data.postId.substr(-5, 5) +
      ' downloaded, ' + videos.length + ' remaining.')
      dl()
    } else {
      console.log('Finish !')
    }
  })
}
