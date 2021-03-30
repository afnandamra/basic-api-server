'use strict';

// Dependincies
const express = require('express');
const router = express.Router();

// validator middleware
const validator = require('../middleware/validator.js');

// model import
const Movie = require('../models/movies.js');
const movies = new Movie();

// route definitions
router.get('/', getMovies);
router.get('/:id', validator, getMoviesById);
router.post('/', createMovies);
router.put('/', validator, updateMovies);
router.put('/:id', validator, updateMovies);
router.delete('/', validator, deleteMovies);
router.delete('/:id', validator, deleteMovies);

// handlers functions
function getMovies(req, res) {
  const resObj = movies.read();
  if (resObj.length === 0) {
    res.json('No Data Available');
  } else res.json(resObj);
}

function getMoviesById(req, res) {
  const resObj = movies.read(req.params.id);
  if (resObj) res.json(resObj);
  else throw new Error(`ID doesn't exist`);
}

function createMovies(req, res) {
  const moviesObject = req.body;
  const resObj = movies.create(moviesObject);
  res.status(201).json(resObj);
}

function updateMovies(req, res) {
  const moviesObject = req.body;
  const resObj = movies.update(req.params.id, moviesObject);
  if (resObj) res.json(resObj);
  else throw new Error(`ID doesn't exist`);
}

function deleteMovies(req, res) {
  const resObj = movies.delete(req.params.id);
  if (resObj.length === 0) {
    res.json('No Data Available');
  } else res.json(resObj);
}

module.exports = router;
