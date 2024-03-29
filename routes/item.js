
const express = require('express');
const router = express.Router();
const itemController = require('../controller/item_controller');



router.get('/',itemController.getAllItem);
router.post('/add',itemController.addItem);
router.delete('/delete/:id',itemController.deleteItem);
router.put('/update/:id',itemController.updateItem);
router.get('/get-item/:id',itemController.getItem);
router.put('/increase-quantity/:id',itemController.increaseQuantityItem);
router.put('/decreased-quantity/:id',itemController.decreaseQuantityItem);



module.exports = router;