const express = require('express');
const router = express.Router();
const TravelListController = require('../controllers/TravelListController');

router.get('/', TravelListController.getTravelLists);
router.get('/:id', TravelListController.getTravelListById);
router.post('/', TravelListController.createTravelList);
router.delete('/:id', TravelListController.deleteTravelList);
router.put('/:id', TravelListController.updateTravelList);
router.patch('/:id', TravelListController.patchTravelList);

module.exports = router;
