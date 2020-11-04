const express=require('express')
const router = express.Router()
const {registerPost, facilityPost, validateFacility, facilityApp } = require('../../controller/defaultController')

// @route POST api/user/register
// @description register POST route
// @access public
router.post('/register', registerPost)
// router.get("/all-services", allServices)

router.post('/facility', facilityPost)
router.post('/validation', validateFacility)
router.post('/facilityapp', facilityApp)
router.get('/verifyFacility', facilityApp)




module.exports = router