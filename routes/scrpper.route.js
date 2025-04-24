const getGitHubData = require("../controllers/scrapper.controller");

const scapRoute = require("express").Router()

scapRoute.get("/:username", getGitHubData);


module.exports = scapRoute