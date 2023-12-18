const express = require("express");
const multer = require('multer');
const path = require('path');

function checkFileType(req, file,cb) {
    const acceptedFiles = /jpeg|jpg|png/;
    const checkExtName = acceptedFiles.test((path.extname(file.originalname)).toLowerCase());
    //check MIME type (Multipurpose internet mail extensions) basically any form of possible attached media
    const checkMIME = acceptedFiles.test(file.mimetype);
    if(checkExtName && checkMIME) {
        return cb(null, true);
    } else {
        cb(null, false);
    }
}
const storage = multer.diskStorage({
    destination: function(req,file, cb) {
        cb(null, 'public/data/uploads/');
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 8000000,
        files: 1
    },
    fileFilter: function (req,file,cb) {
        checkFileType(req, file,cb);
    }
});
var router = express.Router();

const itemController = require("../controllers/saleItemController");

//Controller implenetation todo
//finish implementing update section, (findoneandupdate)
//implement replace

//home page will display all the manga
router.get("/", itemController.manga_list);
// route /manga/:id will display a single posting's information
router.get("/item/:id", itemController.manga_details);

//UPDATE POSTINGS
router.post("/update/:id", itemController.manga_update);
router.get("/update/:id", itemController.get_manga_update);
router.get("/update", itemController.select_manga_update); //user will selected an item and it will direct them to "/update/:id"

//get all manga within a certain category
router.get("/categories", itemController.get_manga_categories);
router.get("/category/:category", itemController.manga_category);

//render and post create item
router.get("/create", itemController.get_manga_create);
router.post("/create", upload.single('item_picture') ,itemController.manga_create);

router.post("/:id/delete", itemController.manga_delete);

module.exports = router;
