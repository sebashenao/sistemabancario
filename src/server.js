var express = require('express')
var bodyParser = require('body-parser')
var https = require('https')
var mysql = require('mysql')
var app = express()

var port = 7004
var ipAddress = 'localhost'

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "banco",
    port: 3306
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

app.get('/', (req, res) => {
    res.send("Bienvenido Server Banco!!")
})

app.get('/getUsuarios', (req, res) => {
    con.query("SELECT * FROM usuarios", (err, result) => {
        res.send(result)
    })
})

app.post('/login', (req, res, next) => {
    con.query(`SELECT * FROM usuarios WHERE ced_usu = '${req.body.ced_usu}'`, (err, result) => {

        let response = {
            estado: '',
            mensaje: ''
        }

        if (result) {
            if (result.length == 0) {
                response.estado = 500
                response.mensaje = `El Usuario ${req.body.ced_usu}, No Existe!`
                res.send(response)
            }
            else if (result[0].pas_usu == req.body.pas_usu) {
                if (result[0].est_usu == 1) {
                    response.estado = 200
                    response.mensaje = 'Usuario Logueado'
                }
                else {
                    response.estado = 500
                    response.mensaje = 'Usuario Inactivo'
                }
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = 'Contraseña Erronea!'
                res.send(response)
            }
        }
        else {
            response.estado = 500
            response.mensaje = `Error!, ${err}`
            res.send(response)
        }
    })
})

app.post('/registro', (req, res, next) => {
    con.query(`INSERT INTO usuarios VALUES(${req.body.ced_usu},${req.body.pas_usu},${req.body.nom_usu},${req.body.dir_usu},
    ${req.body.ciu_usu},${req.body.dep_usu},${req.body.fec_nac_us},2,${req.body.id_su},1)`, (err, result) => {
        let response = {
            estado: '',
            mensaje: ''
        }

        if (result) {
            console.log(result);
            
        }
        else {
            response.estado = 500
            response.mensaje = `Error!, ${err}`
            res.send(response)
        }
    })
})

app.listen(port, ipAddress)
console.log('Servidor : ' + ipAddress + ':' + port)