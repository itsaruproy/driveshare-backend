const linksCollection = require("../db").db().collection("links")

class Link {
    constructor(gid, linkID) {
        this.gid = gid
        this.linkID = linkID
    }

    save = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await linksCollection.insertOne({ gid: this.gid, linkID: this.linkID})
                resolve()
            } catch(err) {
                reject(err)
            }
        })
    }

    static findLinkByID = (link) => {
        return new Promise(async (resolve, reject) => {
            try {
                const linkDoc = await linksCollection.findOne({ linkID: link })
                if(!linkDoc) {
                    reject()
                }
                resolve(linkDoc)
            } catch(err) {
                reject(err)
            }
        })
    } 
}