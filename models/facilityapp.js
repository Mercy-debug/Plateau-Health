const mongoose = require("mongoose");
const {Schema} = mongoose

const FacilityAppSchema = new Schema({
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
    facilityAdd: {
        type: String
    }
    
});

module.exports = FacilityApp =  mongoose.model("facilityapp", FacilityAppSchema)