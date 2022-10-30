const { google } = require('googleapis')
require('dotenv').config()
const fs = require('fs')
const path = require('path')

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
)

const drive = google.drive({
    version: 'v3',
    auth: oAuth2Client,
})

module.exports = (filePath, mimeType, folderID, refreshToken) => {
    oAuth2Client.setCredentials({ refresh_token: refreshToken })
    return new Promise(async (resolve, reject) => {
        try {
            drive.files.create(
                {
                    requestBody: {
                        name: filePath.substring(filePath.lastIndexOf('/') + 1),
                        mimeType: mimeType,
                        parents: [folderID],
                    },
                    media: {
                        mimeType: mimeType,
                        body: fs.createReadStream(filePath),
                    },
                },
                (err, res) => {
                    if (err) {
                        reject(err)
                    } else resolve(res)
                }
            )
        } catch (err) {
            console.log(err)
            reject(err)
        }
    })
}
