const mongoose = require("mongoose");
const {Schema} = mongoose

const paymentSchema = new Schema({
    status: {
        type: Boolean,
        default: false
    },
    payID: {
        type: Number,
        required: true,
        ref: "user"
    },
    plan: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required:true
    },
    // createdAt
    // more: [
    //     {

    //     }
    // ]
});

module.exports = Payment =  mongoose.model("payment", paymentSchema)