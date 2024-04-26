const { connect } = require('mongoose');

async function connectToMongoDB(uri) {
    return connect(uri);
}

module.exports = connectToMongoDB;