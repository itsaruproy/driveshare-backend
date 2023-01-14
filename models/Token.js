const tokensCollection = require('../db').db().collection('tokens')

class Token {
    constructor(gid, refreshToken) {
        this.gid = gid
        this.refreshToken = refreshToken
        this.tokenDate = new Date()
    }

    save = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await tokensCollection.insertOne({
                    gid: this.gid,
                    refreshToken: this.refreshToken,
                    tokenDate: this.tokenDate,
                })
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    static findTokenByUserID = userID => {
        return new Promise(async (resolve, reject) => {
            try {
                const tokenDetails = await tokensCollection.findOne({
                    gid: userID,
                })
                resolve(tokenDetails)
            } catch (err) {
                reject(err)
            }
        })
    }
    static deleteTokenByUserID = userID => {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedToken = await tokensCollection.deleteOne({
                    gid: userID,
                })
                if (deletedToken.deletedCount === 0) {
                    throw new Error(`No token found for user ID: ${userID}`)
                }
                resolve(deletedToken)
            } catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = Token
