const busboy = require('busboy')
const fs = require('fs')
const path = require('path')
const upload = require('../drive/upload')

//Models
const Link = require('../models/Link')
const Token = require('../models/Token')

exports.uploadToDrive = async (req, res) => {
    /*
        1. find user token from the id
        2. if it has no link associated with it then send a response that invalid link
        3. otherwise pipe the request to busboy and upload that file to server
        4. on finish uploading use the upload function
    
    */
    try {
        const linkDoc = await Link.findLinkByID(req.params.id)
        const folderID = linkDoc.folderID
        const { refreshToken } = await Token.findTokenByUserID(linkDoc.gid)

        if (linkDoc && refreshToken) {
            const bb = busboy({ headers: req.headers })
            let fileName = ''
            let mimeType
            let fpath = ''
            bb.on('file', (_, file, info) => {
                fileName = info.filename
                mimeType = info.mimeType
                const pathText = `../uploads/${fileName}`
                fpath = path.join(__dirname, pathText)
                file.pipe(fs.createWriteStream(fpath, { flags: 'a+' }))
            })

            bb.on('finish', async () => {
                const resp = await upload(
                    fpath,
                    mimeType,
                    folderID,
                    refreshToken
                )
                try {
                    fs.unlink(fpath, () => {
                        console.log('File has been deleted')
                    })
                } catch (e) {
                    console.log('Error deleting file')
                }

                res.json({ message: resp })
            })

            bb.on('error', () => {
                res.status(500).json({ message: 'File upload failed' })
            })

            req.pipe(bb)
        } else {
            res.status(500).json({ message: 'No token found' })
        }
    } catch (err) {
        console.log('file upload failed')
        res.status(500).json({ message: err })
    }
}

exports.getUploadInformation = async (req, res) => {
    try {
        const linkDoc = await Link.findLinkByID(req.params.id)
        console.log('Upload Information :', linkDoc)
        res.json({ info: linkDoc })
    } catch (err) {
        res.status(500).json({ message: 'No information found' })
    }
}
