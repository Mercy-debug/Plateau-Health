const express=require('express')
const router = express.Router()
const {registerPost, facilityPost, validateFacility, facilityApp, loginPost, facilityCount } = require('../../controller/defaultController')
const upload = require('../../config/multer')
const request = require('request')
// @route POST api/user/register
// @description register POST route
// @access public
router.post('/register',upload.single("avatar") ,registerPost)
// router.get("/all-services", allServices)

router.post('/facility', facilityPost)
router.post('/validation', validateFacility)
router.post('/facilityapp', facilityApp)
router.get('/verifyFacility', facilityApp)
router.get('/totalfacilities', facilityCount)
router.post('/login', loginPost)

router.get('/register', function(req, res, next){
    request({
        uri: 'https://pshs3.herokuapp.com/all/enrollments',

    }).pipe(res);
});





module.exports = router