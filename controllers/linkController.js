const Link = require('../models/Link')
const uniqueAlphaNumericId = require('../utils/generateLink')

exports.getAllUserLinks = async (req, res) => {
    try {
        let links = await Link.getAllLinksByID(req.apiUser.gid) // Need to modify it before sending
        console.log(links)
        res.json({ links: links })
    } catch (err) {
        res.status(500).json({ message: 'Error retriving the links' })
    }
}

exports.deleteLink = async (req, res) => {
    /*
        1. First check if the link exists or check what mongodb returns if there is no document.
    */

    try {
        await Link.deleteLinkByID(req.params.id)
        res.json({ message: 'Link deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete the link' })
    }
}

exports.createLink = async (req, res) => {
    const { folderID, targetName } = req.body

    if (folderID && targetName) {
        try {
            let uniqueLinkString = uniqueAlphaNumericId()
            let link = new Link(
                req.apiUser.gid,
                uniqueLinkString,
                folderID,
                targetName
            )
            const linkDoc = await link.save()
            res.json({ ...linkDoc, linkID: uniqueLinkString })
        } catch (err) {
            res.sendStatus(500).json({ message: 'Link creation failed' })
        }
    } else {
        res.status(500).json({
            message: 'Please provide appropriate information',
        })
    }
    // Folder id needed where it is going to upload
    // Get the name for which it is uploading
    // Get the gid from the user
    // generate a random number or string
    // Store the name, gid and random string into database and return it to the user also
}
