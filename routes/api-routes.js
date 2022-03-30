const express = require('express');
const router = express.Router();
const dataStorageController = require('../controllers/data-storage-controller');

/* PUT to update existing data (idempotent) 
    can add Swagger API doc strings later */
router.put('/:repo', dataStorageController.create);

/* GET available data: can add Swagger API doc strings later */
router.get('/:repo/:id', dataStorageController.get);

/* DELETE data (idempotent) 
    can add Swagger API doc strings later */
router.delete('/:repo/:id', dataStorageController.remove);

/* This applies to all requests if we'd like a middleware to do 
    something, for instance, logging. 
*/
router.use(function(req, res, next) {
    // do logging
    // console.log('Something is happening.');
    next();
});

module.exports = router;