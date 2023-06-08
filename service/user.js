const repository = require('../repository/user.js')
const validation = require('./validations/userValidation.js')
const bcrypt = require("bcrypt")

exports.getAll = async () => {
    try {
        var users = await repository.getAll();
        console.log(users)
        users.forEach(user => {
            delete user.password
        });
    } catch (error) {
        throw error
    }
   

    return users
}

exports.getById = async (id) => {
    try {
        var user = await repository.getById(id)
        await validation.isExist(user)
        delete user.password
    } catch (error) {
        throw error
    }

    return user
}

exports.create = async (user) => {
    try {
        let userDb = await repository.getByUsername(user.username)
        await validation.isUsernameDuplicated(userDb)

        user.password = bcrypt.hashSync(user.password, 10)

        for (let index = 0; index < user.roles.length; index++) {
            user.roles[index] = user.roles[index].toLowerCase()
        }

        let result = await repository.create(user)
        user._id = result.insertedId;
        delete user.password
    } catch (error) {
        throw error
    }

    return user
}

exports.update = async (id, user) => {
    try {
        let userDb = await repository.getById(id)
        await validation.isExist(userDb)

        if (userDb.username != user.username) {
            let userDbByUsername = await repository.getByUsername(user.username)
            await validation.isUsernameDuplicated(userDbByUsername)
        }

        user.password = userDb.password

        for (let index = 0; index < user.roles.length; index++) {
            user.roles[index] = user.roles[index].toLowerCase()
        }

        let updated = await repository.update(id, user)
        await validation.isExist(updated.value)
    } catch (error) {
        throw error
    }

    return true;
}

exports.delete = async (id) => {
    try {
        let deleted = await repository.delete(id)
        await validation.isExist(deleted.value)
    } catch (error) {
        throw error
    }
    return true
}

