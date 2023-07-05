#! /usr/bin/env node

console.log("This script populates some test films, directors, and genres to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true");
  
  // Get arguments passed on command line
  var userArgs = process.argv.slice(2);
  /*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
  var async = require("async");
  var { Item } = require("./models/saleItem");
  var { Cateogry } = require("./models/saleItem");
  
  var mongoose = require("mongoose");
  var mongoDB = userArgs[0];
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  const Item = require("./models/saleItem.js");
  var MangaItems = [];
  
  function itemCreate(item_name, item_description, item_categories, price, number_in_stock, item_publisher, item_author, cb) {
    var citem = new Item({ name: name });
    
    citem.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log("New Item: " + citem);
      MangaItems.push(citem);
      cb(null, citem);
    });
  }
  function createItems(cb) {
    async.series(
      [

      ],
      // optional callback
      cb
    );
  }
  
