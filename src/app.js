const fs = require('fs');
const Vineapple = require('vineapple');
const download = require('download-file');
const argv = require('yargs').argv;
const vine = new Vineapple();
const defaults = {
  page_size: 100
};
let videos = [];

if (!argv.page_size) {
  argv.page_size = defaults.page_size;
} else {
  if (typeof(argv.page_size) != "number") {
    console.log('The page size arg was not a number');
  }
}

if (!argv.email) {
  console.log('You must specify an email arg, like -email MY_EMAIL@MY_PROVIDER.COM');
} else if (!argv.password) {
  console.log('You must specify a password arg, like -password MY_PASSWORD');
} else {
  console.log('Getting Vines list...');
  vine.login(argv.email, argv.password, function (error, client) {
    if (error) {
      console.error('Unable to connect, please check your credentials.', error);
      return;
    }

    if (argv.user) {
      getUserVines(client, argv.user);
    } else {
      if (argv.likes) {
        getLikes(client, client.userId, client.username);
      } else {
        getList(client, client.userId, client.username);
      }
    }
  });
}

function getLikes (client, userId, userName, page = 0) {
  client.likes(userId, {page: page}, (error, user) => {
    if (error) {
      console.error(error);
      return;
    }

    for (let r of user.records) {
      videos.push({type: userName + '/likes', data: r});
    }
    if (user.nextPage !== null) {
      getLikes(client, userId, userName, user.nextPage);
    } else {
      getList(client, userId, userName);
    }
  });
}

function getUserVines (client, twitterScreenName) {
  client.searchUsers(twitterScreenName, (error, user) => {
    if (error) {
      console.error(error);
      return;
    }

    if (user.records.count === 0) {
      console.log('user not found');
    } else {
      if (argv.user && argv.likes) {
        getLikes(client, user.records[0].userId, twitterScreenName);
      } else {
        getList(client, user.records[0].userId, twitterScreenName);
      }
    }
  });
}

function getList (client, userId, userName, page = 0) {
  client.user(userId, {page: page,size: argv.page_size}, (error, user) => {
    if (error) {
      console.log("AREN");
      console.error(error);
      return;
    }

    for (let r of user.records) {
      isRepost = r.repost !== undefined;
      if (
        (argv.no_reposts   && isRepost) ||
        (argv.only_reposts && !isRepost)
      ) {
        continue;
      }
      videos.push({type: userName, data: r});
    }
    if (user.nextPage !== null) {
      getList(client, userId, userName, user.nextPage);
    } else {
      if (argv.list) {
        exportList();
      } else {
        console.log(videos.length + ' Vines to download.');
        dl();
      }
    }
  });
}

function exportList () {
  let output = '';
  for (let vine of videos) {
    output += vine.data.videoUrl.replace(/\?[^\?]+$/, '') + '\n';
  }
  fs.writeFile('./Vines/vine_link_list.txt', output, err => {
    if (err) {
      return console.log(err);
    }
    console.log('The list of links was saved in ./Vines/vines_links_list.txt !');
  })
}

function make_filename(data){
  let da = videos[0].data.created.split('T');
  let time = ('' + da[1].split('.')[0]).replace(/:/g, '-');
  return (argv.dates ? da[0] + '_' + time + '_' : '') + data.postId + '.mp4';
}

function dl () {
  download(videos[0].data.videoUrl, {
    directory: 'Vines/' + videos[0].type,
    filename: make_filename(videos[0].data),
  }, err => {
    if (err) {
      console.log(err, videos[0].data.postId);
    }
    videos.shift();
    if (videos.length > 0) {
      console.log('Vine with id: ' + videos[0].data.postId.substr(0, 5) +
      '...' + videos[0].data.postId.substr(-5, 5) +
      ' downloaded, ' + videos.length + ' remaining.');
      dl();
    } else {
      console.log('Finish !');
    }
  });
}
