
var express = require('express');
const product = require('../models');
var path = require('path');

exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.login = function (req, res) {

    product.Invuser.find({ user_id: req.query.user_id, user_pwd: req.query.user_pwd })
        .then(result => { res.json(result) })
};

exports.prodship = function (req, res) {

    product.Production.find({ pqty })
        .then(function (dbproduction) {
        })
        .catch(function (err) {
            console.log(err.message)
        });
}

exports.newuser = function (req, res) {

    product.Invuser.create(req.body)
        .then(function (dbuser) {
        })
        .catch(function (err) {
            console.log(err.message)
        });
}

exports.new_mas_prod = function(req, res){
    product.Masprod.find({ prod_no: req.query.prod_no })
    .then(result => { res.json(result) })
}

exports.masprod_update = function(req, res) {
        // console.log(req.body)
        product.Masprod.updateOne({ prod_no: req.query.prod_no }, { $set: { prod_qty: req.body.prod_qty } })
        .then(response => { res.json() })
}
    
exports.mas_post =function(req, res){
    
        product.Masprod.create(req.body)
          .then(response => res.json())
}

exports.new_prod =function(req, res){

        product.Production.create(req.body)
          .then(dbproduction => res.json())
          .catch(function (err) {
            console.log(err.message)
          });
}

exports.production_date =function(req, res){

        product.Production.find({ prod_date: req.query.prod_date })
          .then(response => res.json(response))
          .catch(function (err) {
            console.log(err.message)
          });
}

exports.totalqty = function(req, res){
    
        product.Masprod.find({prod_no:req.query.prod_no})
        .then(result=>{res.json(result)})
}

exports.new_shipment =function(req, res){
      
        product.Shipment.create(req.body)
          .then(function (dbshipment) {
          })
          .catch(function (err) {
            console.log(err.message)
          });
}

exports.inventory = function(req, res){

        product.Masprod.find({})
          .then(result => { res.json(result) })
}

exports.shipment_date =function(req, res){

        product.Shipment.find({ ship_date: req.query.ship_date })
          .then(response => res.json(response))
          .catch(function (err) {
            console.log(err.message)
        });
}

exports.Login =function(req, res){        

    product.Login.create(req.body)
    .then(response => res.json())

      console.log("data posted..")
    }

exports.Login_data = (req, res)=>{

    product.Login.find({})
    .then(response => res.json(response))
}

exports.Logout = (req, res)=>{
    product.Login.remove({})
    .then(response=>res.json())
    console.log('document deleted...');
}

exports.Prod_delete = (req, res) =>{
    console.log(req.query)
    product.Production.deleteOne({_id:req.query})
    .then(response=>res.json(response))
    console.log("data deleted..")
}