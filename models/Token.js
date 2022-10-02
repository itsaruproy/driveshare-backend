const tokensCollection = require("../db").db().collection("tokens")

class Token {
    constructor(gid, refreshToken) {
        this.gid = gid
        this.refreshToken = refreshToken
    }

    save = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await tokensCollection.insertOne({gid: this.gid, refreshToken: this.refreshToken})
                resolve()
            } catch(err) {
                reject(err)
            }
        })
    }

    static findTokenByUserID = (userID) => {
        return new Promise(async (resolve, reject) => {
            try {
                const tokenDetails = await tokensCollection.findOne({gid: userID})
                resolve(tokenDetails)
            } catch(err) {
                reject(err)
            }
        })
    }
}

module.exports = Token