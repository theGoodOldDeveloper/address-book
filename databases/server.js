const express = require('express')
const sqlite = require('sqlite3').verbose()
const axios = require('axios')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const { nanoid } = require("nanoid")

const app = express()
let sql
let port = process.env.SERVERPORT
app.use(bodyParser.json())

app.use(cors({
    origin: "*",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
}))

//INFO - database connection - https://youtu.be/_Q-i0LiRd0A?t=289
const db = new sqlite.Database("./addressbook.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('database connection OK')
    }
})

//BUG - db.all ** https://youtu.be/xDYx5UdHwv0?t=489
//INFO - get ALL contacts
app.get('/contacts', (req, res) => {
    sql = 'SELECT * FROM contacts;'
    db.all(sql, [], (err, response) => {
        console.log('response:(get ALL contacts) 😁 ', response)
        if (err) return console.error(err)
        res.send(response)
    })
})
//INFO - get ALL groups
app.get('/groups', (req, res) => {
    console.log('✔')
    sql = 'SELECT * FROM groups;'
    db.all(sql, [], (err, response) => {
        //console.log('response:(get ALL groups) 😁 ', response)
        if (err) return console.error(err)
        res.send(response)
    })
})
//INFO - get group(contact)
app.get('/groups/:groupId', (req, res) => {
    //console.log('✔')
    var groupId = (req.params.groupId)
    console.log('req.params.groupId:(get ONE groupName) 😁 ', [groupId])
    sql = (`SELECT * FROM groups WHERE id = ${groupId}`)
    console.log(sql)
    db.all(sql, [], (err, response) => {
        console.log('response:(get ONE groupName) 😁 ', response)
        if (err) return console.error(err)
        res.send(response)
    })
})
//INFO - get ONE contact(contactId)
app.get('/contacts/:id', (req, res) => {
    var id = (req.params.id)
    console.log('req.params.id:(get ONE contact) 😁 ', [id])
    sql = `SELECT * FROM contacts WHERE id = "${id}"`
    console.log(sql)
    db.all(sql, [], (err, response) => {
        console.log('response:(get ONE contact) 😁 ', response)
        if (err) return console.error(err)
        res.send(response)
    })
})
//BUG - db.run * https://youtu.be/xDYx5UdHwv0?t=402
//INFO - create contact
app.post('/createcontacts/', bodyParser.json(), async (req, res) => {
    //NOTE - id generator -> nanoid
    var id = nanoid(10)
    console.log('req.body (id): ', req.body, id)
    var contact = req.body
    console.log('req.params.contact:(POST contact) 😁 ', [contact])
    sql = "INSERT INTO contacts (id, name, company, email, title, mobile, photo, groupId) VALUES (?,?,?,?,?,?,?,?)"
    await db.run(sql, [id, contact.name, contact.company, contact.email,
        contact.title, contact.mobile, contact.photo, contact.groupId],
        (err) => {
            console.log('New contact ADDED 😁😁😁👍👍✔ ')
            if (err) return console.error(err)
        })
    //res.end()
    res.header("Access-Control-Allow-Origin", "*");
    res.send('new person added...')
})
//INFO - update contact
// https://youtu.be/QH4_omtTe9c
app.put('/contacts/:id', (req, res) => {
    var id = (req.params.id)
    var contact = req.body
    console.log('req.params.id:(get ONE contact) 😁 ', [id])
    sql = `SELECT * FROM contacts WHERE id = "${id}"`
    sql = `UPDATE contacts SET name=?, company=?, email=?, title=?, mobile=?, photo=?, groupId =? WHERE id = ?`
    console.log(sql)
    db.run(sql, [contact.name, contact.company, contact.email, contact.title, contact.mobile, contact.photo, contact.groupId, id],
        (err, response) => {
            console.log('response:(get ONE contact) 😁 ', response)
            if (err) return console.error(err)
            res.header("Access-Control-Allow-Origin", "*");
            res.send(response)
        })
})
//INFO - delete contact
app.delete('/contacts/:id', (req, res) => {
    var id = (req.params.id)
    console.log('req.params.id:(get ONE contact) 😁 ', [id])
    sql = `DELETE FROM contacts WHERE id=?`
    console.log(sql)
    db.run(sql, [id], (err, response) => {
        console.log('response:(get ONE contact) 😁 ', response)
        if (err) return console.error(err)
        res.send(response)
    })
})

//NOTE - server listen 
app.listen(port, () => (console.log('the server listen: ' + port)))

//INFO - get data
//getAllData()
async function getAllData() {
    sql = 'SELECT * FROM users;'
    await db.all(sql, [], (err, response) => {
        console.log('response: 😁 ', response)
        if (err) return console.error(err)
        response.forEach((row) => {
            console.log(row.emil)
        })
    })
}

//INFO - getData('https://random-data-api.com/api/users/random_user?search=20')
async function getData(url) {
    try {
        const { data } = await axios.get(url)
        console.log(data)
    } catch (error) {
        console.log(error + ' eztElBaltaztad')
    }
}

//creater table
/* sql = 'CREATE TABLE users(ID INTEGER PRIMARY KEY, username, emil, password)'
db.run(sql) */

/* 
sql = `"INSERT INTO contacts ("id": "${contact.id}",
        "name": "${contact.name}",
        "company": "${contact.company}",
        "email": "${contact.email}",
        "title": "${contact.title}",
        "mobile": "${contact.mobile}",
        "photo": "${contact.photo}",
        "groupId": "${contact.groupId}");`
         */
/*
sql = `"INSERT INTO contacts 
(id, name, company, email, title, mobile, photo, groupId) 
VALUES ("${contact.id}", "${contact.name}", "${contact.company}", "${contact.email}", "${contact.title}", "${contact.mobile}", "${contact.photo}", "${contact.groupId}");`
*/