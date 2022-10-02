const usersCollection = require("../db").db().collection("users")

class User {
    constructor(sub, email) {
        this.gid = sub
        this.email = email
    }

    save = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await usersCollection.insertOne({gid: this.gid, email: this.email})
                resolve()
            } catch(err) {
                reject(err)
            }
        })
    }

    static findUserById = (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userDocument = await usersCollection.findOne({gid: userId})
                resolve(userDocument)
            } catch(err) {
                reject()
            }
        })
    }
}

module.exports = User