const mongoose = require("mongoose");
const {Schema} = mongoose

const FacilitySchema = new Schema({
    status: {
        type: Boolean,
        default: false
    },
    facilityName: {
        type: String
        
    },
    facilityCode: {
        type: String
    },
    
});

module.exports = Facility =  mongoose.model("facility", FacilitySchema)