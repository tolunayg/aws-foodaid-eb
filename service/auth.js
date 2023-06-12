const userRepository = require('../repository/user.js')
const validation = require('./validations/authValidation.js')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = async (authRequest) => {
    var token =""
    try {
        let user = await userRepository.getByUsername(authRequest.username)
        console.log('user', user)
        await validation.isUserExist(user)
        let isLoggedIn = bcrypt.compareSync(authRequest.password, user.password)
        await validation.isCorrectPassword(isLoggedIn)

        token = jwt.sign(
            {
                user_id: user._id,
                roles: user.roles, 
                name: user.firstName + " " + user.lastName, 
                email: user.email, 
                mobile: user.mobile, 
                username: user.username
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
    } catch (error) {
        throw error
    }

    return token
}