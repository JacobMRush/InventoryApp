#! /usr/bin/env node

console.log("This script populates some test films, directors, and genres to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true");
  
  // Get arguments passed on command line
  let userArgs = process.argv.slice(2);
  /*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
  const Item = require("./models/saleItem");

  let MangaItems = [];

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  const mongoDB = userArgs[0];
  main().catch((err) => console.log(err));

  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    await createItems();
    mongoose.connection.close();
  }

  async function itemCreate(item_name, item_description, item_categories, price, number_in_stock, item_publisher, item_author) {
    let citem = new Item({item_name, item_description, item_categories, price, number_in_stock, item_publisher, item_author});
    await citem.save();
  }
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
        itemCreate(
            "Chainsaw Man Vol. 1-11",
            "Chainsaw Man Vol. 1-11: Part 1 Brand New",
            [{category: "Supernatural"}, {category: "Action"}],
            115.00,
            3,
            "VIZ BOOKS",
            "Tatsuki Fujimoto",
        ),
        itemCreate(
            "Kaguya-Sama Love is War Vol. 9-22",
            "Kaguya-Sama Love is war volumes 9-22 Brand New",
            [{category: "Comedy"}, {category: "Romance"}],
            115.00,
            2,
            "VIZ BOOKS",
            "Aka Akasaka",
        ),
        itemCreate(
            "Jujutsu Kaisen Vol. 1-19",
            "Jujutsu Kaisen volumes 1-19 Brand New",
            [{category: "Battles"}, {category: "Action"}, {category: "Supernatural"}],
            150.00,
            3,
            "VIZ BOOKS",
            "Gege Akutami",
        ),

    ])
  }
  
