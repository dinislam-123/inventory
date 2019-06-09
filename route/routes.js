
const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('../controller/controller.js');


// a simple test url to check that all of our files are communicating correctly.

router.get('/test', controller.test);

router.get('/api/look/user/', controller.login)

router.get('/api/ship/pqty/', controller.prodship)

router.post('/api/user/', controller.newuser)

router.get('/api/masprod/', controller.new_mas_prod)

router.put('/api/masprod/update/', controller.masprod_update)

router.post('/api/masprod/post/', controller.mas_post)

router.post('/api/production/', controller.new_prod)

router.get('/api/production/date/', controller.production_date)

router.get('/api/masprod/totalqty/', controller.totalqty)

router.post('/api/shipment/', controller.new_shipment)

router.get('/api/masprod/inventory/', controller.inventory)

router.get('/api/shipment/date/', controller.shipment_date)

router.post('/api/Login/', controller.Login)

router.get('/api/Login_data/', controller.Login_data)

router.post('/api/Logout/', controller.Logout)

router.delete('/api/production/delete/', controller.Prod_delete)

module.exports = router;