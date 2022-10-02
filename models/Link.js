const linksCollection = require("../db").db().collection("links")

class Link {
    constructor(gid, linkID, folderID) {
        this.gid = gid
        this.linkID = linkID
        this.folderID = folderID
    }

    save = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await linksCollection.insertOne({ gid: this.gid, linkID: this.linkID, folderID: this.folderID })
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