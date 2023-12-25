const express = require('express')
const mysql = require('mysql2')

const app = express()
const port = 3000

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'node_db',
}

const db = mysql.createConnection(dbConfig)

db.connect(err => {
    if (err) {
        console.error(err)
        process.exit(1);
    } else {
        console.log('DB is up and running')
    }
})

app.get('/', (req, res) => {
    const date = new Date().toISOString().replace('T', ' ').substring(0, 19)
    const insertSql = `INSERT INTO people (name) VALUES ('nome criado em ${date}')`

    db.query(insertSql, (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).send('internal server error')
        } else {
            const selectSql = `SELECT * FROM people`;
            db.query(selectSql, (err, rows) => {
                if (err) {
                    console.error(err)
                    res.status(500).send('internal server error')
                } else {
                    let response = '<h1>Full Cycle Rocks!</h1>'
                    response += '<br>'
                    response += '<table><thead>'
                    response += '<tr><th>Id</th><th>Nome</th></tr>'
                    response += '</thead><tbody>'

                    rows.forEach(element => {
                        response += `<tr><td>${element.id}</td><td>${element.name}</td></tr>`
                    });

                    response += '</tbody></table>'

                    res.status(200).send(response)
                }
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})