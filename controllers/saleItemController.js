const mongoose = require("mongoose");
const Item = require("../models/saleItem");

//finish implementing findoneandupdate
//implement replacements

//get all items in the list sorted by publisher
exports.manga_list = async function (req, res, next) {
  //used
  try {
    const docs = await Item.find({
      item_name: { $ne: null },
      item_publisher: { $ne: null },
    }).sort({ item_publisher: 1 }).exec();
    if(!docs.length) {
      throw new Error({error: "No matching documents found"});
    }
    res.render("manga", { manga_list: docs });

  } catch (err) {
    res.render("errorPage", {error: "No items to populate page"});
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

    if(!docs.length) {
      throw new Error({error: "No categories found"});
    }
    let unique = docs.map((it) => it.item_categories);
    let newUnique = unique.map((cat_arr) => {
      return cat_arr;
    });
    //loop through newUnique and make a new object only holding one of each item and their counts
    let uniqueCategories = {};
    for (let i = 0; i < newUnique.length; i++) {
      for (let j = 0; j < newUnique[i].length; j++) {
        if (uniqueCategories[newUnique[i][j].category]) {
          uniqueCategories[newUnique[i][j].category] += 1;
        } else {
          uniqueCategories[newUnique[i][j].category] = 1;
        }
      }
    }
    let categoryKeys = Object.keys(uniqueCategories);
    res.render("viewAllCategories", {
      categoryKeys: categoryKeys,
      uniqueCategories: uniqueCategories,
    });
  } catch (err) {
    res.render("errorPage", {error: "No listed categories found"});
  }
};
exports.manga_details = async function (req, res, next) {
  //used
  let mangaID = req.params.id;
  try {
    const doc = await Item.findById(mangaID).exec();
    if(doc === null) {
      throw new Error({error: "DNE"});
    }
    res.render("viewItem", { doc: doc });
  } catch (err) {
    res.render("errorPage", {error: "No matching item found"});
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

    if(!docs.length) {
      throw new Error({error: "No items in selected category"});
    }
    
    res.render("viewCategory", { category_list: docs });
  } catch (err) {
    res.render("errorPage", {error: "No items in selected category"});
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
    
    if(!req.file) {
      throw new Error({error: "Bad file upload"});
    }
    
    let item_picture = req.file;
    let {
      item_name,
      item_description,
      item_categories,
      price,
      number_in_stock,
      item_publisher,
      item_author,
    } = itemDetails;
    //handling categories
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
    res.render("errorPage", {error: "Bad file upload, only JPEG/JPG and PNG are allowed"}); 
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
  let mangaID = req.params.id;
  try {
    const doc = await Item.findById(mangaID).exec();
    //request the manga item with the current ID
    //get manga item ID and return it to user

    res.render("updateItem", { doc: doc });
  } catch (err) {
    res.render("404");
    console.log(err);
  }
};
exports.manga_update = async function (req, res, next) {
  let mangaID = req.params.id;
  //take the submitted items, deconstruct, check if it is empty. only update non-empty portions of an item
  let ITEM_DETAILS = req.body;

  try {
    Object.keys(ITEM_DETAILS).forEach(
      (key) => !ITEM_DETAILS[key] && delete ITEM_DETAILS[key]
    );
    ITEM_DETAILS.item_categories = ITEM_DETAILS.item_categories.split(" ");
    for (i = 0; i < ITEM_DETAILS.item_categories.length; i++) {
      ITEM_DETAILS.item_categories[i] = {
        category: ITEM_DETAILS.item_categories[i],
      };
    }
    const doc = await Item.findByIdAndUpdate(mangaID, ITEM_DETAILS);
    res.redirect("/manga");
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
    if(doc === null) {
      throw new Error({error: "There was an error deleting the document."});
    }
    res.redirect("/manga");
  } catch (err) {
    res.render("errorPage", {error: "There was an error deleting the document"});
  }
};

//Removed replace as it does not make sense here for me as far as I know. Update/Delete seems to be enough to cover for replace.
//I don't see a use case where I would have a shop item that I would want to replace for another (instead of replace)
