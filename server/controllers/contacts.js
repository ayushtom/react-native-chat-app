const model = require('../model');

const getAllUsers = async () => {
    try {
        const result = model.User.find({})
        return result
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = { getAllUsers }