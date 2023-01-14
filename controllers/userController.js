const jwtdecode = require('jwt-decode')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
// Models
const User = require('../models/User')
const Token = require('../models/Token')

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage'
)

exports.getTokenAndLogin = async (req, res) => {
    try {
        const { tokens } = await oAuth2Client.getToken(req.body.code)

        const userDetails = jwtdecode(tokens.id_token)
        console.log(userDetails)

        try {
            const userDoc = await User.findUserById(userDetails.sub)
            if (!userDoc) {
                let user = new User(userDetails.sub, userDetails.email)
                await user.save()

                let userToken = new Token(userDetails.sub, tokens.refresh_token)
                await userToken.save()
            } else {
                // Check refresh tokens date from Tokens collection and if necessary update it
                let token = await Token.findTokenByUserID(userDetails.sub)
                const oneDayInMilliseconds = 86400000
                const diffInMilliseconds = Math.abs(
                    new Date().getTime() - new Date(token.tokenDate).getTime()
                )

                if (diffInMilliseconds / oneDayInMilliseconds >= 6) {
                    try {
                        let resp = Token.deleteTokenByUserID(userDetails.sub)
                        let userToken = new Token(
                            userDetails.sub,
                            tokens.refresh_token
                        )
                        await userToken.save()
                    } catch (err) {
                        throw new Error('Unexpected error')
                    }
                }
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Something went wrong' })
        }

        // console.log(new Date(tokens.expiry_date))
        res.json({
            token: jwt.sign(
                {
                    gid: userDetails.sub,
                    email: userDetails.email,
                },
                process.env.JWTSECRET,
                {
                    expiresIn: '365d',
                }
            ),
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Token expired try logging again' })
    }
    // Save this token into database with the users data inside of it from cookies
}
