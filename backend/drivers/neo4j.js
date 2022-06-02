const neo4j = require ('neo4j-driver');
const REACT_APP_NEO4J_URI = require('../config/keys').NEO4J_URI;
const REACT_APP_NEO4J_USER = require('../config/keys').NEO4J_USER;
const REACT_APP_NEO4J_PASSWORD = require('../config/keys').NEO4J_PASSWORD;

const driver = neo4j.driver(
    REACT_APP_NEO4J_URI,
    neo4j.auth.basic(
        REACT_APP_NEO4J_USER,
        REACT_APP_NEO4J_PASSWORD
    )
)

exports.driver = driver;