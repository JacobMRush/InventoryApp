const express = require('express');
var router = express.Router();

const itemController = require('../controllers/saleItemController');

router.get('/', function(req,res,next) {
    res.render('index', { title: 'Manga Inventory tracker' });
});

router.get('/manga', itemController.manga_list);

router.get('/:id', function(req,res, next) {
    //give all the information on the selected manga
});

router.get('/create', function(req,res,next) { 
    //get the create manga page
});

router.post('/create', function(req,res,next) {
    //post the manga created
});