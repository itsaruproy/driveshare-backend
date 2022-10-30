const jwt = require('jsonwebtoken')

/*
    It will be better if we also check inside the database if the user exist there or not
*/

const auth = (req, res, next) => {
    console.log(req.body)
    try {
        if (!req.body.token) {
            res.status(500).json({ message: 'No token found' })
            return
        }
        req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET) // Later we can use the gid and email from the req.apiUser
        next()
    } catch (err) {
        res.status(500).json({ message: 'You are not authorized' })
    }
}

module.exports = auth
