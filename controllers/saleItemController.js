const mongoose = require('mongoose');
import Item from "../models/saleItem";

//create item
exports.manga_list = function(req,res,next) {
    Item.find({item_title: {$ne: null}, item_publisher: {$ne: null}}).sort({item_publisher: 1}).exec((err, manga) => {
        if(err) return next(err);
        res.json(manga);
    });
}
//update item
//delete item
//replace item