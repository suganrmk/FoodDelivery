// ./express-server/routes/product.server.route.js
import express from 'express';

//import controller file
import * as productController from './controllers/products.server.controller';

var multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../angular-client/src/assets/uploads/')
    },
    filename: function(req, file, cb) {
        console.log('File Name', file);
        cb(null, Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage });

// get an instance of express router
const router = express.Router();

// //Home Slider
// router.route('/slider').get(homeslider.getHomeSliders);
// router.route('/slider').post(homeslider.addHomeSlider);
// router.route('/slider').put(homeslider.updateHomeSlider);
// router.route('/slider/:id').delete(homeslider.deleteHomeSlider);
// //Room Type
// router.route('/roomtype').get(listingprops.getAll);
// router.route('/roomtype').post(listingprops.addNew);
// router.route('/roomtype').put(listingprops.updateData);
// router.route('/roomtype/:id').delete(listingprops.deleteData);
// //bathroom Type
// router.route('/bathroomtype').get(listingprops.getAll);
// router.route('/bathroomtype').post(listingprops.addNew);
// router.route('/bathroomtype').put(listingprops.updateData);
// router.route('/bathroomtype/:id').delete(listingprops.deleteData);
// //house Type
// router.route('/housetype').get(listingprops.getAll);
// router.route('/housetype').post(listingprops.addNew);
// router.route('/housetype').put(listingprops.updateData);
// router.route('/housetype/:id').delete(listingprops.deleteData);
// //building size
// router.route('/buildingsize').get(listingprops.getAll);
// router.route('/buildingsize').post(listingprops.addNew);
// router.route('/buildingsize').put(listingprops.updateData);
// router.route('/buildingsize/:id').delete(listingprops.deleteData);
// //Bed Type
// router.route('/bedtype').get(listingprops.getAll);
// router.route('/bedtype').post(listingprops.addNew);
// router.route('/bedtype').put(listingprops.updateData);
// router.route('/bedtype/:id').delete(listingprops.deleteData);
// //essentialamenities Type
// router.route('/essentialamenities').get(listingprops.getAll);
// router.route('/essentialamenities').post(listingprops.addNew);
// router.route('/essentialamenities').put(listingprops.updateData);
// router.route('/essentialamenities/:id').delete(listingprops.deleteData);
// //essentialamenities Type
// router.route('/houserules').get(listingprops.getAll);
// router.route('/houserules').post(listingprops.addNew);
// router.route('/houserules').put(listingprops.updateData);
// router.route('/houserules/:id').delete(listingprops.deleteData);
// //safetyamenities Type  
// router.route('/safetyamenities').get(listingprops.getAll);
// router.route('/safetyamenities').post(listingprops.addNew);
// router.route('/safetyamenities').put(listingprops.updateData);
// router.route('/safetyamenities/:id').delete(listingprops.deleteData);
// //spaces Type
// router.route('/spaces').get(listingprops.getAll);
// router.route('/spaces').post(listingprops.addNew);
// router.route('/spaces').put(listingprops.updateData);
// router.route('/spaces/:id').delete(listingprops.deleteData);


//New Products
router.route('/products').get(productController.getProducts);
router.route('/products').post(productController.addProducts);
router.route('/products').put(productController.updateProducts);
router.route('/products/:id').get(productController.getProduct)
router.route('/products/:id').delete(productController.deleteProducts);


//search

// router.route('/search').post(searchController.searchProducts);


// file upload
// router.post('/upload', upload.array("myfile[]", 12), function(req, res, next) {
//     return res.send({
//         success: true,
//         file: req.files
//     });
// });

export default router;