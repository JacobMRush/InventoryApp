const mongoose = require("mongoose");
const Item = require("../models/saleItem");

//get all items in the list sorted by publisher
exports.manga_list = async function (req, res, next) {
  //used
  try {
    const docs = await Item.find({
      item_name: { $ne: null },
      item_publisher: { $ne: null },
    })
      .sort({ item_publisher: 1 })
      .exec();
    res.render("manga", { manga_list: docs });
  } catch (err) {
    console.log(err);
  }
};
//get a single item's details
exports.get_manga_categories = async function (req, res, next) {
  try {
    //querydb for all categories accross all documents
    const docs = await Item.find({
      item_categories: { $elemMatch: { category: { $ne: null } } },
    })
      .select("item_categories -_id")
      .exec();

    let unique = docs.map((it) => it.item_categories);
    let newUnique = unique.map((cat_arr) => {
      return cat_arr;
    });
    //loop through newUnique and make a new object only holding one of each item and their counts
    let uniqueCategories = {};
    for (let i = 0; i < newUnique.length; i++) {
      for (let j = 0; j < newUnique[i].length; j++) {
        console.log(newUnique[i][j]);
        if (uniqueCategories[newUnique[i][j].category]) {
          uniqueCategories[newUnique[i][j].category] += 1;
        } else {
          uniqueCategories[newUnique[i][j].category] = 1;
        }
      }
    }
    console.log(uniqueCategories);
    let categoryKeys = Object.keys(uniqueCategories);
    res.render("viewAllCategories", {
      categoryKeys: categoryKeys,
      uniqueCategories: uniqueCategories,
    });
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};
exports.manga_details = async function (req, res, next) {
  //used
  let mangaID = req.params.id;
  try {
    const doc = await Item.findById(mangaID).exec();
    res.render("viewItem", { doc: doc });
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};
//get items based on category
exports.manga_category = async function (req, res, next) {
  //used
  let selectedCategory = req.params.category;
  try {
    const docs = await Item.find({
      item_categories: { $elemMatch: { category: selectedCategory } },
    }).exec();
    res.render("viewCategory", { category_list: docs });
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};
//get create item page
exports.get_manga_create = async function (req, res, next) {
  try {
    await res.render("createItem");
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};

//create item
exports.manga_create = async function (req, res, next) {
  //used
  //create a new item via request body details?
  try {
    let itemDetails = req.body; //probably should verify that these are non-empty
    let {
      item_name,
      item_description,
      item_categories,
      price,
      number_in_stock,
      item_publisher,
      item_author,
    } = itemDetails;
    item_categories = item_categories.split(" ");
    for (i = 0; i < item_categories.length; i++) {
      item_categories[i] = { category: item_categories[i] };
    }
    let citem = new Item({
      item_name,
      item_description,
      item_categories,
      price,
      number_in_stock,
      item_publisher,
      item_author,
    });
    await citem.save();
    res.redirect("/manga");
  } catch (err) {
    res.send("Error creating item");
    console.log(err);
  }
};
//update item
exports.select_manga_update = async function (req, res, next) {
  try {
    //get all manga postings
    const docs = await Item.find({
      item_name: { $ne: null },
      item_publisher: { $ne: null },
    }).exec();
    res.render("selectUpdate", { manga_list: docs });
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};
exports.get_manga_update = async function (req, res, next) {
  let mangaID = req.params._id;
  try {
    const doc = await Item.findById(mangaID).exec();
    //request the manga item with the current ID
    res.render("updateItem", {mangaInfo: doc});
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};
exports.manga_update = async function (req, res, next) {
  let mangaID = req.params.id;
  try {
    const doc = await Item.findOneAndUpdate();
  } catch (err) {
    res.render("404");
    console.log(err);
  }

  //find item to update
  //change and update fields that are sent to us
  //create field/object if it does not already exist
};

//delete item
exports.manga_delete = async function (req, res, next) {
  let mangaID = req.params.id;
  try {
    const doc = await Item.findOneAndDelete({ _id: mangaID }).exec();
    res.redirect("/manga");
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};

//get manga replace
exports.get_manga_replace = async function (req, res, next) {
  try {
    res.render();
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};

exports.manga_replace = async function (req, res, next) {
  let mangaID = req.params.id;
  try {
    const doc = await Item.findOneAndReplace();
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};
