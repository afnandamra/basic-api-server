'use strict';

// Dependincies
const express = require('express');
const router = express.Router();

// validator middleware
const validator = require('../middleware/validator.js');

// model import
const Clothes = require('../models/clothes.js');
const clothes = new Clothes();

// route definitions
router.get('/', getClothes);
router.get('/:id', validator, getClothesById);
router.post('/', createClothes);
router.put('/', validator, updateClothes);
router.put('/:id', validator, updateClothes);
router.delete('/', validator, deleteClothes);
router.delete('/:id', validator, deleteClothes);

// handlers functions
function getClothes(req, res) {
  const resObj = clothes.read();
  if (resObj.length === 0) {
    res.json('No Data Available');
  } else res.json(resObj);
}

function getClothesById(req, res) {
  const resObj = clothes.read(req.params.id);
  if (resObj) res.json(resObj);
  else throw new Error(`ID doesn't exist`);
}

function createClothes(req, res) {
  const clothesObject = req.body;
  const resObj = clothes.create(clothesObject);
  res.status(201).json(resObj);
}

function updateClothes(req, res) {
  const clothesObject = req.body;
  const resObj = clothes.update(req.params.id, clothesObject);
  if (resObj) res.json(resObj);
  else throw new Error(`ID doesn't exist`);
}

function deleteClothes(req, res) {
  const resObj = clothes.delete(req.params.id);
  if (resObj.length === 0) {
    res.json('No Data Available');
  } else res.json(resObj);
}

module.exports = router;
