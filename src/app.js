const express = require("express");
const app = express().use(express.json());

const accounts = [];
let nextId = 1;

// Get All And Create Account
app
  .route("/accounts")
  .get((_, res) => res.json(accounts))
  .post((req, res) => {
    const a = { id: nextId++, ...req.body };
    accounts.push(a);
    return res.status(201).json(a);
  });

// Get, Update, and Delete Account by ID
app
  .route("/accounts/:id")
  .all((req, res, next) => {
    const account = accounts.find((a) => a.id === +req.params.id);
    if (!account) return res.status(404).send("Account not found");
    req.account = account;
    next();
  })
  .get((req, res) => res.json(req.account))
  .put((req, res) => {
    Object.assign(req.account, req.body);
    return res.status(200).json(req.account);
  })
  .delete((req, res) => {
    const index = accounts.indexOf(req.account);
    accounts.splice(index, 1);
    return res.status(204).send(index);
  });

module.exports = app;
