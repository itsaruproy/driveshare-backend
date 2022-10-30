const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

//Middlewares
const auth = require('./utils/auth')

//Controllers
const driveController = require('./controllers/driveController')
const userController = require('./controllers/userController')
const linkController = require('./controllers/linkController')

//Routes
app.get('/', (req, res) => res.json({ message: 'API working correctly' }))
app.post('/getToken', userController.getTokenAndLogin)
app.post('/link/create', auth, linkController.createLink)
app.post('/link/delete/:id', auth, linkController.deleteLink)
app.post('/link/get', auth, linkController.getAllUserLinks)
app.post('/upload/:id', driveController.uploadToDrive)
app.get('/upload/:id', driveController.getUploadInformation)

module.exports = app
