const mongoose = require('mongoose')
const express = require('express')
const User = require('../models/user')
const Payment = require('../models/payment')

module.exports = {

        paymentPost: async(req, res, err)=>{
       let {plan, amount, payID} = req.body
       let userID = req.body
       userID = payID
       if(!payID || !plan || !amount){
        res.json({
          message: "all field required"
        })
       } else{
      await User.findOne({userID}).then(userId=>{
         if(!userId){
           res.status(400).json({
            message: "No user with this ID",
           })
         }else{
          newPay = new Payment({
            payID,
            amount,
            plan,
            status:true
        })
        newPay
        .save()
        .then(res.status(200).json({
          message: "Payment successfull",
          newPay
        }))
         }
        
       })
      }
     },
     
      allPayment:  async(req, res, next) => {
      await Payment.find({}, (err, data) => {
          if(data) {
            res.json({
              message: `Confirmed Payment`,
              data
            })
          } else {
            return next(err);
          }
        });
      },

      myPayment:  async(req, res, next) => {
        let {plan, amount, payID} = req.body
        await Payment.findOne({}, (err, user) => {
          //no ID entered
          if(!payID){
           res.json({
             message:"Please enter a Payment ID to check status"
            })
          }
          // ID entered isnt registered 
          else if(req.body.payID != user.payID) {
            res.status(400).json({
              message:"No user with this ID"
            })
          } 
          // ID found but user hasnt paid
          else if(user.status != true){
            res.json({
              message:"No payment recorded for this user yet"
            })
          }
          //ID found and user has paid
          else {
            res.json({
              message: `Payment received from user ${user.payID}`,
            })
          }
          return err
        })
      }

  }