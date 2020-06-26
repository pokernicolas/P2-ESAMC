const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')


const server = express()

server.set('view engine', 'ejs')
server.use(express.static('public'))

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'negrolas@123',
    database: 'db_projetos'
})

db.connect((err) => {
    if (err)
        throw err.sqlMessage;
    console.log('Conectado com o Banco de Dados MySQL')
})
server.get('/', (req, res) => {

    return res.render("index")
})

server.get('/alunos', (req, res) => {
    db.query('SELECT * FROM tb_alunos', (err, rows) => {
        res.render('alunos', { aluno: rows })
    })
})

server.get('/formAlunos', (req, res) => {
    res.render('formAlunos', { aluno: {} })
})

server.post('/formAlunos', (req, res) => {

    db.query('INSERT tb_alunos SET ?', req.body, function (err, rows, fields) {
        if (!err)
            res.redirect('/alunos')
        else
            res.status(400).json(err);
    })
})

server.get('/excluirAluno', function (req, res) {
    db.query('DELETE FROM tb_alunos WHERE id = ?', req.query.id, function (err, rows, fields) {
        if (!err)
            res.redirect('/alunos')
        else
            res.status(400).json(err);
    })
})

server.get('/atualizarAluno', function (req, res) {
    db.query('SELECT * FROM tb_alunos WHERE id = ?', req.query.id, function (err, rows, fields) {
        if (!err)
            res.render('formAlunos', { aluno: rows[0] })
        else
            res.status(400).json(err);
    })
})

server.post('/atualizarAluno', function (req, res) {
    var param
    db.query('UPDATE tb_alunos SET ? WHERE id = ?', [req.body, req.query.id], function (err, rows, fields) {
        if (!err)
            res.redirect('/alunos')
        else
            res.status(400).json(err);
    })
})

server.post('/')
server.listen(3000, () => {
    console.log('Servidor em execução...')
})

