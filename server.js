const express = require("express")
const app = express()
require("dotenv").config()
// const GoogleDrive = require("./drive")
const { OAuth2Client } = require("google-auth-library")
const User = require("./models/User")
app.use(express.json())
const path = require("path")
const jwtdecode = require("jwt-decode")

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'postmessage'
)




app.get("/", async (req, res) => {
    // const user = new GoogleDrive()
    // user.call((authClient) => {
    //     console.log("Printing auth client")
    //     console.log(authClient)
    //     res.json({url: authClient})
    // })
    const user = new User("arup", "roy")
    try {
        await user.save()
        res.json({ message: "User saved to database" })
    } catch {

        res.json({ message: "Problem saving user" })
    }
    
})


app.post("/getToken", async (req, res) => {
    try {

        const tokens = await oAuth2Client.getToken(req.body.code)

         const userDetails = jwtdecode(tokens.tokens.id_token)
         console.log(userDetails)

        console.log(new Date(tokens.expiry_date))
        // const credentials = await oAuth2Client.refreshAccessToken(tokens.refresh_token)
        // console.log(credentials)
        // console.log("Printing OPENID details")
        //console.log({tokens})
    
        res.json({tokens: tokens.tokens})
    } catch(err) {
        console.log(err)
        res.json({message: "Token expired try logging again"})
    }
    // Save this token into database with the users data inside of it from cookies
})

app.post("/upload", async (req, res) => {
    const upload = require("./drive/upload")
    try {
        const resp = await upload(path.join(__dirname, "reduxx.png"), "image/png", "1LSzKJVt8MK2c8vDHm2Ros3jTpbNkzHdF", process.env.REFRESH_TOKEN)
        // console.log(resp)
        res.json({message: resp})
    } catch(err) {
        console.log("file upload failed")
        res.json({message: err})
    }

})

module.exports = app
