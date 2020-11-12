const mongoose = require('mongoose')
const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const key = require('../config/keys')
const User = require('../models/user')
const Facility = require('../models/facility')
const FacilityApp = require ('../models/facilityapp')
const randomString = require('randomstring')


module.exports = {
    registerPost: async (req, res, err) => {
        const { name,email, phoneNumber, userName, password } = req.body
        const userID = randomString.generate({
            length: 5,
            charset: 'numeric'
        })
        console.log(req.body)
        User.findOne({ userName}).then((user) => {
            if (user) {
                return res.status(500).json({
                    message:"Username already exist",
                    data:null
                })
            } else {
                User.findOne({phoneNumber}).then((user)=>{
                    if(user){
                        return res.status(500).json({
                            message:"Phone number already registered",
                            data: null
                        })
                    }else{

                newUser = new User({
                    name,
                    userName,
                    password,
                    email,
                    phoneNumber,
                    userID
                })
                bcrypt.genSalt(10,(err, salt)=>{
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                        if (err)throw err
                        newUser.password = hash
                        newUser
                        .save()
                     .then(user => {res.json(user)})
                    .catch(err => { console.log(err) })
                    })
                })
                    }
                })      
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
        console.log(facilityCode)
        if(!facilityCode){
            res.json({
                message:"Enter a facility code to validate"
            })
        }else{
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
        .catch(err)
        }

        
    },
    facilityApp: async(req, res)=>{
        const { facilityName, facilityCode, facilityAdd, message } = req.body
        if(!facilityName || !facilityCode || !facilityAdd){
            res.json({
                message:"All field required"
            })
        }else{
              await Facility.findOne({facilityCode})
        .then(facility =>{

            if(!facility){
                res.json({
                    success: false,
                    message: 'No facility with this code',
                    data: null
                })
            }else {
                let newFacility = new FacilityApp({
                    facilityName,
                    facilityCode,
                    facilityAdd,
                    message
                })

                newFacility.save()
                .then(facility =>{
                    res.json({
                        success: true,
                        message: 'application for accreditation successful',
                        data: facility
                    })
                })
            }
           
        })
        }
      
    },
    loginPost: async(req, res, next)=>{
        const {userName, password} = req.body
        console.log(req.body)
        User.findOne({userName}).then((user)=>{
            if (!user){
                res.status(400).json({
                    message: 'no user with this username found'
                })
            }
            bcrypt.compare(password, user.password).then((isMatch)=>{
                if(isMatch){
                    const payload ={
                        id: user.id,
                        name: user.name
                    };
                    jwt.sign(
                        payload,
                        key.secretOrKey,
                        {expiresIn: 3600},
                        (err, token)=>{
                            if(err) throw err
                            return res.json({
                                success: true,
                                token:"Bearer " + token,
                                data: user
                            })
                        }
                    )
                }
                else{
                    return res.status(400).json({
                        message:"password incorrect",
                        success: false
                    })
                }
            })
        })
    },


}