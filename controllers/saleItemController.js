const mongoose = require('mongoose');
const Item = require("../models/saleItem");

//get all items in the list sorted by publisher
exports.manga_list = async function(req,res,next) { //used
    try {
        const docs = await Item.find({item_name: {$ne: null}, item_publisher: {$ne: null}}).sort({item_publisher: 1}).exec();
        res.render('manga', {manga_list: docs});
    } catch(err) {
        console.log(err);
    }
}
//get a single item's details
exports.manga_details = async function(req,res,next) { //used
    let mangaID = req.params.id;
    console.log(mangaID);
    try {
        const doc = await Item.findById(mangaID).exec();
        res.render("viewItem", {doc: doc});
    } catch(err) {
        res.render('404');
        console.log(err);
    }
};
//get items based on category
exports.manga_category = async function(req,res,next) {  //used
    let selectedCategory = req.params.category;
    try {
        const docs = await Item.find({item_categories: {$elemMatch: {category: selectedCategory}}}).exec();
        res.render("viewCategory", {category_list: docs});
    } catch(err) {
        res.render('404');
        console.log(err);
    }
}

//create item
exports.manga_create = function(req,res,next) { //used
    //create a new item via request body details?
    let itemdetails = req.body; //probably should verify that these are non-empty 
    let citem = new Item(itemdetails);
    citem.save();
};
//update item
exports.manga_update = function(req,res,next) {
    let mangaID = req.params.id;
    Item.findOneAndUpdate();

    //find item to update
    //change and update fields that are sent to us
    //create field/object if it does not already exist
};

//delete item
exports.manga_delete = function(req,res,next) {
    let mangaID = req.params.id;
    Item.findOneAndDelete()
};

exports.manga_replace = function(req,res,next) {
    let mangaID = req.params.id;
    Item.findOneAndReplace()
};
