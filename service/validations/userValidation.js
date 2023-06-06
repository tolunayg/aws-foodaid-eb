exports.isExist = async (entity) => {
    console.log(entity)
    if (!entity) {
        let error = new Error(`User not found`)
        error.name = "UserNotFound"
        error.statusCode = 404
        error.isBusinessException = true
        throw error
    }
}

exports.isUsernameDuplicated = async (entity) => {
    if (entity) {
        let error = new Error(`Username is using by another user.`)
        error.name = "UsernameInUse"
        error.statusCode = 400
        error.isBusinessException = true
        throw error
    }
}