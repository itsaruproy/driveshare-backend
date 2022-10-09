const linksCollection = require('../db').db().collection('links')

class Link {
    constructor(gid, linkID, folderID, targetName) {
        this.gid = gid
        this.linkID = linkID
        this.folderID = folderID
        this.targetName = targetName
    }

    save = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let linkDoc = await linksCollection.insertOne({
                    gid: this.gid,
                    linkID: this.linkID,
                    folderID: this.folderID,
                    targetName: this.targetName,
                })
                resolve(linkDoc)
            } catch (err) {
                reject(err)
            }
        })
    }

    static findLinkByID = link => {
        return new Promise(async (resolve, reject) => {
            try {
                const linkDoc = await linksCollection.findOne({ linkID: link })
                if (!linkDoc) {
                    reject()
                }
                resolve(linkDoc)
            } catch (err) {
                reject(err)
            }
        })
    }

    static deleteLinkByID = link => {
        return new Promise(async (resolve, reject) => {
            try {
                await linksCollection.deleteOne({
                    linkID: link,
                })
                resolve()
            } catch (err) {
                reject(err)
            }
        })
    }

    static getAllLinksByID = gid => {
        return new Promise(async (resolve, reject) => {
            try {
                let links = await linksCollection.find({ gid: gid }).toArray()
                resolve(links)
            } catch (err) {
                reject(err)
            }
        })
    }
}

module.exports = Link
