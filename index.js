const express = require('express')
const sqlite3 = require('sqlite3')
const session = require('express-session')
const { authenticator } = require('otplib')
const bodyParser = require('body-parser')
const QRCode = require('qrcode')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(session({
    secret: 'supersecret',
}))

app.use(bodyParser.urlencoded({ extended: false }))

const db = new sqlite3.Database('db.sqlite')
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS `users` (`user_id` INTEGER PRIMARY KEY AUTOINCREMENT, `email` VARCHAR(255) NOT NULL, `secret` varchar(255) NOT NULL)')
})
db.close()

app.listen(port, () => {
    console.log(`2FA Node app listening at http://localhost:${port}`)
})