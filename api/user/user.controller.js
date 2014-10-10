var User = require('../../db/tables/db_users.js');
var UserModel = require('../../db/tables/db_users.js').User;

'use strict';

exports.index = function(request, response) {
  console.log('index was accessed.')
  return response.json(404, 'Nothing to see here.');
};

exports.byUsername = function(request, response){
  console.log('Requests username: ', request.params.username);
  UserModel.findOne({ username: request.params.username }, 
  function(err, user){
    if(err) console.log('user.controller: User was not found')
    response.json(200, user);
  });
};

exports.storeMessage = function(request, response){
  UserModel.findOne({username: request.params.username}, function(err,user){
    if(err){
      console.log("Unable to store message", err);
      response.send(404);
    }
    if(user){
      var newMessage = request.body;
      user.receivedMessages.push(newMessage);
      user.save(function(err){
        if(err) console.log("There was an error saving the new message.")
      });

      response.send(202);
    }else{
      console.log("Message not stored: User was not found");
      response.send(404);
    }
  });
}

exports.storeTransaction = function(request, response){
  UserModel.findOne({username: request.params.username}, function(err,user){
    if(err){
      console.log("Unable to store transaction", err);
      response.send(404);
    }
    if(user){
      var newTransaction = request.body;
      user.transactions.push(newTransaction);
      user.save(function(err){
        if(err) console.log("There was an error saving the new user info.")
      });

      response.send(202);
    }else{
      console.log("Transaction not stored: User was not found");
      response.send(404);
    }
  });
}

exports.registerSitterInfo = function(request, response){
  console.log(request.body);
  UserModel.findOne({ username: request.params.username }, function(err, user){
      if(err){
        console.log("Unable to register sitter info", err);
        response.send(404);
      }
      if(user){
        var userInfo = request.body;
        console.log("About to add userInfo to database:", userInfo);
        user.isSitter = true;
        user.location = userInfo.location;
        user.zip = userInfo.zip;
        user.cost = userInfo.cost;
        user.rating = userInfo.rating;
        user.bio = userInfo.bio;
        user.dogs = userInfo.dogs
        user.cats = userInfo.cats
        user.save(function(err){
          if(err) console.log("There was an error saving the new user info.")
        });

        response.send(200);
      }else{
        console.log("User not found.")
        response.send(404);
      }
    });


}