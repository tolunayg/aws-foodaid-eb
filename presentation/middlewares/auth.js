const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (roles) => {

    return (req, res, next) => {
        const bearerToken =
            req.headers["authorization"];

        var token = ""
        if (bearerToken.startsWith("Bearer ")) {
            token = bearerToken.substring(7, bearerToken.length);
        } else {
            return res.status(401).json({ message: "Invalid Token." });
        }

        if (!token) {
            return res.status(401).json({ message: "Invalid Token." });
        }
        try {
            const decoded = jwt.verify(token, config.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({ message: "Invalid Token." });
        }


        // let isAuthorized = false
        // for (let index = 0; index < roles.length; index++) {
        //     const role = roles[index];
        //     isAuthorized = req.user.roles.includes(role)
        //     if (isAuthorized == true) break
        // }
        // if (isAuthorized == false)
        //     return res.status(403).json({ message: "You are not authorized for this operation." });

        return next();
    };
}

module.exports = verifyToken;