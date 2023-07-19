const express = require("express");
var router = express.Router();

const itemController = require("../controllers/saleItemController");

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
router.post("/create", itemController.manga_create);

router.post("/:id/delete", itemController.manga_delete);

router.get("/:id/replace", itemController.get_manga_replace);
router.post("/:id/replace", itemController.manga_replace);

module.exports = router;
