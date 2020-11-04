const mongoose = require('mongoose')
const express = require('express')
const User = require('../models/user')
const Facility = require('../models/facility')
const FacilityApp = require ('../models/facilityapp')
const randomString = require('randomstring')


module.exports = {
    registerPost: async (req, res, err) => {
        const { name, email, phoneNumber } = req.body
        const userID = randomString.generate({
            length: 5,
            charset: 'numeric'
        })
        // console.log(req.body)
        User.findOne({ phoneNumber: req.body.phoneNumber }).then((user) => {
            if (user) {
                return res.status(500).json({ phoneNumber: "phone number already registered" })
            } else {

                newUser = new User({
                    name,
                    email,
                    phoneNumber,
                    userID
                })
                newUser
                    .save()
                    .then(user => {res.json(user)})
                    .catch(err => { console.log(err) })
            }
        })
    },
    facilityPost: async(req, res)=>{
        let facilityName = req.body.facilityName;
        let facilityCode = randomString.generate({
            length: 5,
            charset: 'numeric'
        })
        await Facility.findOne({facilityCode})
        .then(facility =>{
            if(facility){
                return res.json({
                    success: false,
                    message: 'facility code already exists, please register again',
                    data: null
                })

            }
            let newFacility = new Facility({
                facilityName,
                facilityCode
            })
            newFacility.save()
            .then(facility =>{
                res.json({
                    success: true,
                    message: 'facility registered successfully',
                    data: facility
                })
            })
        })
        .catch(err => res.json({
            success: false,
            message: 'facility code already exists, please register again',
            data: null
        }))
    },
    validateFacility: async(req, res)=>{
        let facilityCode = req.body.facilityCode

        await Facility.findOne({facilityCode})
        .then(facility =>{
            if(!facility){
                return res.json({
                    success: false,
                    message: 'unable to find this facility code, register to get a facility code',
                    data: null
                })
            }
            facility.status = true;
            facility.save()

            res.json({
                success: true,
                message: 'porceed to fill accreditation form',
                data: facility
            })
        })
        .catch(err => res.json({
            success: false,
            message: 'unable to find this facility code, register to get a facility code',
            data: null
        }))
    },
    facilityApp: async(req, res)=>{
        const { facilityName, facilityCode, facilityAdd } = req.body
        await Facility.findOne({facilityCode})
        .then(facility =>{
            if(!facility){
                return res.json({
                    success: false,
                    message: 'Facility code does not exist',
                    data: null
                })

            }
            let newFacility = new FacilityApp({
                facilityName,
                facilityCode,
                facilityAdd
            })
            newFacility.save()
            .then(facility =>{
                res.json({
                    success: true,
                    message: 'application for accreditation successful',
                    data: facility
                })
            })
        })
        .catch(err => res.json({
            success: false,
            message: 'facility already exists',
            data: null
        }))
    },

    facilityApp:  async(req, res, next) => {
        await facility.find({}, (err, data) => {
            if(data) {
              res.json({
                success: true,
                message: `Application for accreditation pending`,
                data
              })
            } else {
              return next(err);
            }
          });
        },
}