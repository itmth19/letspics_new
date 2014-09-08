var sys = require('sys');
var db = require('mysql');
var my_http = require('http');
var url = require('url');
var sendpic = require('./sendpic');
var formidable = require('formidable');

/* Variables */
var port ='8888';
var db_host = 'localhost';
var db_user = 'root';
var db_pass = 'root';
var db_name = 'letspic';
var db_port = '3306';

var upload_dir = '/pics';
var pic_name = '[sender]_[receiver]_[date].jpg';

/*Database connection*/
var cnn = db.createConnection({
  "hostname":db_host,
  "user":db_user,
  "password":db_pass,
  "database":db_name,
  "port":db_port
});

cnn.connect();

/*Handle database connection close*/
cnn.on('close',function(error){
  if(error){
    console.log('Connection closed unexpectedly!');
  }else{
    cnn.createConnection(cnn.config);
  }
});

/*Create server*/
my_http.createServer(function(req,res){
  sys.puts('Request received!');
   responseTo(req,res);
}).listen(port);

sys.puts("Server is listening on port" + port);

/*Reponse*/
function responseTo(req,res){// 作成中
  var header = '';
  var body = '';
  var url_params = url.parse(req.url,true);
  var query = url_params.query;


  /*switch params*/
  switch(url_params.pathname){
    case "/":
      sys.puts('Index');
      returnSuccess(res);
      break;
      
    case "/user":
      getUserInfo(query["user_id"],res);
      break;

    case "/user/send/pic":
      /*if is post request*/
      if (req.method.toLowerCase() == 'post') {
        uploadFile(req,res,query);
      }
      break;


    case "/user/update/message":
    case "/user/send/message":
    case "/user/get/friends":
  }
}

function getUserInfo(id, res) {
  var query = "SELECT * FROM Users ";
  query += "WHERE ID = ?;";
  sys.puts(query);
  cnn.query(query, [id], function(error, rows, fields) {
    if (error) {
      returnError(res);
    } else {
      /* get the result */ 
      var result = JSON.stringify(rows[0]);
      returnJsonString(result,res);
    }
  });
}

function getFriendsList(id, res) {
  var query = "SELECT * FROM Users WHERE ID IN (";
  query += "SELECT ID1 FROM FriendList WHERE ID2 = ? UNION ";
  query += "SELECT ID2 FROM FriendList WHERE ID1 = ?);";
  cnn.query(query, [id, id], function(error, rows, fields) {
    if (error) {
      returnError(res);
    } else {
      var result = JSON.stringify(rows[0]);
      returnJsonString(result,res);
    }
  });
  
  return JSON.stringify(result);
}

function makeFriendWith(user_id,friend_id) {
  if (user_id > friend_id) {
    var tmp = user_id;
    user_id = friend_id;
    friend_id = tmp;
  }
  var query = "INSERT IGNORE INTO FriendList (ID1, ID2) ";
  query += "VALUES (?, ?);";
    cnn.query(query, [user_id, friend_id], function(error, fields) {
      if (error) {
        throw error;
      }
    });
}

function sendMessage(user_id, friend_id, message, reply_id) {
  if (friend_id == 0) {
    var query = "SELECT ID FROM Users ORDER BY RAND() limit 1;"
    cnn.query(query, function(error, rows, fields) {
      if (error) {
        throw error;
      } else {
        friend_id = rows[0].ID;
      }
    });
  }
  var query = "INSERT INTO Messages (fromID, toID, message, replyMsgID)";
  query += "VALUES (?, ?, ?, ?)";
  cnn.query(query, [user_id, friend_id, message, reply_id], function(error, fields) {
    if (error) {
      throw error;
    }
  });
  
}

function userRegistration(facebook_id, name, country, sex) {
  var query = "INSERT IGNORE INTO Users (FacebookID, name, country, sex) VALUES (?, ?, ?, ?)";
  cnn.query(query, [facebook_id, name, country, sex], function(error, fields) {
    if (error) {
      throw error;
    }
  });
  
}

function returnError(res){
  res.writeHeader(404,{"Content-Type":"text/plain"});
  res.write('Not found');
  res.end();
}

function returnSuccess(res){
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write('OK');
  res.end();
}

function returnJsonString(json_string,res){
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write(json_string);
  res.end();
}

function uploadFile(req,res,query){
  /*upload file code*/
  var form = new formidable.IncomingForm();
  var imgFileName = 'hoge.jpg';

  form.uploadDir = upload_dir;
  form.keepExtensions = true;

  form.on('error',function(error){
    res.writeHeader(404,{"Content-Type":"text/plain"});
    res.write('ERROR');
    res.end();
  });
  
  form.on ('fileBegin', function(name, file){
            //rename the incoming file to the file's name
            file.path = form.uploadDir + "/" + file.name;
    });

  var queryText = "SELECT ID FROM Users ORDER BY RAND() limit 1;"
  var friend_id = query["friend_id"];
  if (query["reply_id"] == 0) {
    cnn.query(queryText, function(error, rows, fields) {
      if (error) {
        throw error;
      } else {
        friend_id = rows[0].ID;
      }
    });
  }
  queryText = "INSERT INTO Messages (fromID, toID, imgName, replyMsgID) ";
  queryText += "VALUES (?, ?, ?, ?);";
  cnn.query(queryText, [query["user_id"], friend_id, imgFileName, query["reply_id"]], function(error, rows, fields) {
    if (error) {
      throw error;
    } 
  });


  /*override the events when finish uploading*/
  form.on('end',function(error){
    returnSuccess(res);
  });

  form.parse(req, function(err,fields,files){
    returnSuccess(res);
  });

  return;
}
