const mongoose = require("mongoose");
const Item = require("../models/saleItem");
const fs = require("fs").promises;
//before create/destroy verify person is capable of doing so - how do we authenticate
async function deleteImage(image_path) {
  try {
    await fs.unlink(image_path);
    console.log("File has been deleted");
  } catch (err) {
    console.error(err);
  }
}

//get all items in the list sorted by publisher
exports.manga_list = async function (req, res, next) {
  //used
  try {
    const docs = await Item.find({
      item_name: { $ne: null },
      item_publisher: { $ne: null },
    })
      .sort({ item_name: 1 })
      .exec();
    if (!docs.length) {
      throw new Error({ error: "No matching documents found" });
    }
    let categories = [];
    for (let i = 0; i < docs.length; i++) {
      categories[i] = "";
      for (let j = 0; j < docs[i].item_categories.length; j++) {
        if (j == docs[i].item_categories.length - 1) {
          categories[i] += docs[i].item_categories[j].category;
          continue;
        }
        categories[i] += docs[i].item_categories[j].category + ", ";
      }
      console.log(categories[i]);
    }
    res.render("manga", { manga_list: docs, categories: categories });
  } catch (err) {
    console.log(err);
    res.render("errorPage", { error: "No items to populate page" });
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

    if (!docs.length) {
      throw new Error({ error: "No categories found" });
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
    res.render("errorPage", { error: "No listed categories found" });
  }
};
exports.manga_details = async function (req, res, next) {
  //used
  let mangaID = req.params.id;
  try {
    const doc = await Item.findById(mangaID).exec();
    if (doc === null) {
      throw new Error({ error: "DNE" });
    }
    res.render("viewItem", { doc: doc });
  } catch (err) {
    res.render("errorPage", { error: "No matching item found" });
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

    if (!docs.length) {
      throw new Error({ error: "No items in selected category" });
    }

    res.render("viewCategory", { category_list: docs });
  } catch (err) {
    res.render("errorPage", { error: "No items in selected category" });
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

    if (!req.file) {
      throw new Error({ error: "Bad file upload" });
    }
    console.log(req.file);
    let createdPath = req.file.destination.split("public/");
    let item_picture_path = createdPath[1] + req.file.filename;
    console.log(createdPath);
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
    item_categories = item_categories.split(", ");
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
      item_picture_path,
    });
    await citem.save();
    res.redirect("/manga");
  } catch (err) {
    console.log(err);
    res.render("errorPage", {
      error: "Bad file upload, only JPEG/JPG and PNG are allowed",
    });
  }
};
//update item
exports.select_manga_update = async function (req, res, next) {
  //used
  try {
    const docs = await Item.find({
      item_name: { $ne: null },
      item_publisher: { $ne: null },
    })
      .sort({ item_name: 1 })
      .exec();
    if (!docs.length) {
      throw new Error({ error: "No matching documents found" });
    }
    let categories = [];
    for (let i = 0; i < docs.length; i++) {
      categories[i] = "";
      for (let j = 0; j < docs[i].item_categories.length; j++) {
        if (j == docs[i].item_categories.length - 1) {
          categories[i] += docs[i].item_categories[j].category;
          continue;
        }
        categories[i] += docs[i].item_categories[j].category + ", ";
      }
      console.log(categories[i]);
    }
    res.render("selectUpdate", { manga_list: docs, categories: categories });
  } catch (err) {
    console.log(err);
    res.render("errorPage", { error: "No items to populate page" });
  }
};
exports.get_manga_update = async function (req, res, next) {
  let mangaID = req.params.id;
  try {
    const doc = await Item.findById(mangaID).exec();
    //request the manga item with the current ID
    //get manga item ID and return it to user
    if (doc === null) {
      throw new Error({ error: "Error getting updated item" });
    }
    res.render("updateItem", { doc: doc });
  } catch (err) {
    res.render("errorPage", { error: "Error getting updated item" });
  }
};
exports.manga_update = async function (req, res, next) {
  let mangaID = req.params.id;
  //take the submitted items, deconstruct, check if it is empty. only update non-empty portions of an item
  let ITEM_DETAILS = req.body;
  console.log(req.file);
  try {
    Object.keys(ITEM_DETAILS).forEach(
      (key) => !ITEM_DETAILS[key] && delete ITEM_DETAILS[key]
    );
    if (ITEM_DETAILS.item_categories) {
      ITEM_DETAILS.item_categories = ITEM_DETAILS.item_categories.split(" ");
      for (i = 0; i < ITEM_DETAILS.item_categories.length; i++) {
        ITEM_DETAILS.item_categories[i] = {
          category: ITEM_DETAILS.item_categories[i],
        };
      }
    }

    if (req.file) {
      let createdPath = req.file.destination.split("public/");
      let item_picture_path = createdPath[1] + req.file.filename;
      ITEM_DETAILS.item_picture_path = item_picture_path;
    }
    const doc = await Item.findByIdAndUpdate(mangaID, ITEM_DETAILS);
    if (doc === null) {
      throw new Error({ error: "Error updating item" });
    }
    if (doc !== null && req.file) {
      let image_path = `public/${doc.item_picture_path}`;
      deleteImage(image_path);
    }
    res.redirect("/manga");
  } catch (err) {
    res.render("errorPage", { error: "Error updating item" });
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
    if (doc === null) {
      throw new Error({ error: "There was an error deleting the document." });
    }
    //remove image from public directory if posting is currently deleted
    let image_path = `public/${doc.item_picture_path}`;
    deleteImage(image_path);

    res.redirect("/manga");
  } catch (err) {
    res.render("errorPage", {
      error: "There was an error deleting the document",
    });
  }
};

//Removed replace as it does not make sense here for me as far as I know. Update/Delete seems to be enough to cover for replace.
//I don't see a use case where I would have a shop item that I would want to replace for another (instead of replace)
