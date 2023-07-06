const express = require('express');
var router = express.Router();

const itemController = require('../controllers/saleItemController');

//home page will display all the manga
router.get('/', itemController.manga_list);

// route /manga/:id will display a single posting's information
router.get('/:id', itemController.manga_details);

router.post('/:id/update')
router.get('/:id/update', function(req,res,next) {
    //show the form
});

//get all manga within a certain category
router.get('/category/:category', itemController.manga_category);

router.get('/create', function(req,res,next) { 
    //get the create manga page
});

router.post('/create', itemController.manga_create);