'use strict';

const express = require('express');
const router = express.Router();
const { gradesModel } = require('../models/grades/model');
const basicAuth = require('../../auth/middleware/basic');
const bearerAuth = require('../../auth/middleware/bearer');
const authRouter = express.Router();
const acl = require('../../auth/middleware/acl');

authRouter.post('/grades', bearerAuth, acl('create'), async (req, res, next) => {
  try {
    let newGrade = await gradesModel.create(req.body);

    res.status(200).send(newGrade);
  } catch(err) {
    next(err);
  }
});


authRouter.get('/grades', basicAuth, async (req, res, next) => {
  try {
    let allGrades = await gradesModel.read();

    res.status(200).send(allGrades);
  } catch(err) {
    next(err);
  }
});


authRouter.get('/grade/:id', basicAuth, async (req, res, next) => {
  try {
    let singleGrade = await gradesModel.read(req.params.id);

    res.status(200).send(singleGrade);
  } catch(err) {
    next(err);
  }
});


authRouter.put('/grade/:id', bearerAuth, acl('update'), async (req, res, next) => {
  try {
    await gradesModel.update(req.body, req.params.id);
    let updatedGrade = await gradesModel.read(req.params.id);

    res.status(200).send(updatedGrade);
  } catch(err) {
    next(err);
  }
});


authRouter.delete('/grade/:id', bearerAuth, acl('delete'), async (req, res, next) => {
  try {
    const deletedGrade = await gradesModel.delete(req.params.id);
    res.status(200).send(deletedGrade);
  } catch(err) {
    next(err);
  }
});


module.exports = router;
