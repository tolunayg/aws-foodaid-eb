exports.isUserExist = async (user) => {
    if (!user) {
        let error = new Error(`Incorrect username or password`)
        error.name = "IncorrectUsernameOrPassword"
        console.log("User exist!")
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}

exports.isCorrectPassword = async (isLoggedIn) => {
    if (!isLoggedIn) {
        let error = new Error(`Incorrect username or password`)
        error.name = "IncorrectUsernameOrPassword"
        console.log("Password wrong!")
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}