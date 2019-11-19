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

var response = {
    estado: '',
    mensaje: '',
    data: {
        nombre: '',
        documento: '',
        direccion: '',
        ciudad: '',
        depto: '',
        fecha_nacimiento: '',
        tip_usuario: '',
        sucursal: '',
        estado: ''
    }
}


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

app.get('/getUsuariosForCuentas', (req, res) => {
    con.query("SELECT ced_usu,nom_usu,est_usu FROM usuarios", (err, result) => {
        res.send(result)
    })
})

app.post('/login', (req, res, next) => {
    con.query(`SELECT *, roles.nom_rol, sucursales.nom_suc FROM usuarios LEFT JOIN roles ON roles.id_rol = 
    usuarios.id_rol LEFT JOIN sucursales ON sucursales.id_suc = usuarios.id_suc where usuarios.ced_usu = '${req.body.ced_usu}'`,
        (err, result) => {
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
                        response.data.nombre = result[0].nom_usu
                        response.data.documento = result[0].ced_usu
                        response.data.direccion = result[0].dir_usu
                        response.data.ciudad = result[0].ciu_usu
                        response.data.depto = result[0].dep_usu
                        response.data.fecha_nacimiento = result[0].fec_nac_usu
                        response.data.tip_usuario = result[0].id_rol
                        response.data.sucursal = result[0].id_suc
                        response.data.estado = result[0].id_est
                        response.data.nombre_sucu = result[0].nom_suc
                        response.data.nombre_rol = result[0].nom_rol
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

// USUARIOS
app.get('/getUsuarios', (req, res) => {
    con.query(`SELECT *, roles.nom_rol, sucursales.nom_suc FROM usuarios LEFT JOIN roles ON roles.id_rol = usuarios.id_rol 
    LEFT JOIN sucursales ON sucursales.id_suc = usuarios.id_suc`, (err, result) => {
        res.send(result)
    })
})

app.post('/registrarUsuario', (req, res, next) => {
    con.query(`INSERT INTO usuarios VALUES('${req.body.ced_usu}','${req.body.pas_usu}','${req.body.nom_usu}','${req.body.dir_usu}',
    '${req.body.ciu_usu}','${req.body.dep_usu}','${req.body.fec_nac_usu}',2,${req.body.id_suc},1)`, (err, result) => {
        if (result) {
            response.estado = 200
            response.mensaje = `Usuario Insertado Exitosamente!`
            res.send(response)
        }
        else {
            response.estado = 500
            response.mensaje = `Error!, ${err.sqlMessage}`
            res.send(response)
        }
    })
})

app.post('/editarUsuario', (req, res, next) => {
    con.query(`UPDATE usuarios SET pas_usu = '${req.body.pas_usu}', nom_usu = '${req.body.nom_usu}', dir_usu = '${req.body.dir_usu}', 
    ciu_usu = '${req.body.ciu_usu}', dep_usu = '${req.body.dep_usu}', fec_nac_usu = '${req.body.fec_nac_usu}', id_rol = ${req.body.id_rol},
    id_suc = ${req.body.id_suc}, est_usu = ${req.body.est_usu} WHERE ced_usu = '${req.body.ced_usu}'`, (err, result) => {
        if (result) {
            response.estado = 200
            response.mensaje = `Usuario Editado Exitosamente!`
            res.send(response)
        }
        else {
            response.estado = 500
            response.mensaje = `Error!, ${err.sqlMessage}`
            res.send(response)
        }
    })
})

// ROLES
app.get('/getRoles', (req, res) => {
    con.query(`SELECT * FROM roles`, (err, result) => {
        res.send(result)
    })
})

app.post('/registrarRoles', (req, res, next) => {
    con.query(`INSERT INTO roles VALUES(DEFAULT,'${req.body.nom_rol}',${req.body.est_rol})`, (err, result) => {
        if (result) {
            response.estado = 200
            response.mensaje = `Rol Insertado Exitosamente!`
            res.send(response)
        }
        else {
            response.estado = 500
            response.mensaje = `Error!, ${err.sqlMessage}`
            res.send(response)
        }
    })
})

app.post('/editarRoles', (req, res, next) => {
    con.query(`UPDATE roles SET nom_rol = '${req.body.nom_rol}', est_rol = ${req.body.est_rol} WHERE id_rol = '${req.body.id_rol}'`,
        (err, result) => {
            if (result) {
                response.estado = 200
                response.mensaje = `Rol Editado Exitosamente!`
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = `Error!, ${err.sqlMessage}`
                res.send(response)
            }
        })
})

// SUCURSALES
app.get('/getSucursales', (req, res) => {
    con.query("SELECT * FROM sucursales", (err, result) => {
        res.send(result)
    })
})

app.get('/getSucursalesUsuarios/:id', (req, res) => {
    con.query(`select sucursales.id_suc, sucursales.nom_suc nom_suc, subquery.nom_usu, 
    subquery.total from (select sum(transacciones.valor) as total, usuarios.ced_usu, usuarios.nom_usu as nom_usu, 
    usuarios.id_suc as id_suc from usuarios inner join cuentas on usuarios.ced_usu = cuentas.ced_usu inner join transacciones
    on transacciones.num_cue = cuentas.num_cue GROUP by usuarios.ced_usu ORDER BY total desc) as subquery inner join sucursales
    on subquery.id_suc = sucursales.id_suc where sucursales.id_suc = ${req.params.id} ORDER by nom_suc asc`, (err, result) => {
        res.send(result)
    })
})

app.post('/registrarSucursal', (req, res, next) => {
    con.query(`INSERT INTO sucursales VALUES(DEFAULT,'${req.body.nom_suc}','${req.body.dir_suc}','${req.body.tel_suc}', ${req.body.est_suc})`,
        (err, result) => {
            if (result) {
                response.estado = 200
                response.mensaje = `Sucursal Insertada Exitosamente!`
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = `Error!, ${err.sqlMessage}`
                res.send(response)
            }
        })
})

app.post('/editarSucursal', (req, res, next) => {
    con.query(`UPDATE sucursales SET nom_suc = '${req.body.nom_suc}',dir_suc = '${req.body.dir_suc}',tel_suc = '${req.body.tel_suc}',
     est_suc = ${req.body.est_suc} WHERE id_suc = '${req.body.id_suc}'`,
        (err, result) => {
            if (result) {
                response.estado = 200
                response.mensaje = `Sucursal Editada Exitosamente!`
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = `Error!, ${err.sqlMessage}`
                res.send(response)
            }
        })
})

// TIPO_CUENTA
app.get('/getTipoCuenta', (req, res) => {
    con.query("SELECT * FROM tipo_cuentas", (err, result) => {
        res.send(result)
    })
})

app.post('/registrarTipoCuenta', (req, res, next) => {
    con.query(`INSERT INTO tipo_cuentas VALUES(DEFAULT,'${req.body.des_tip}',${req.body.est_tip})`,
        (err, result) => {
            if (result) {
                response.estado = 200
                response.mensaje = `Tipo Cuenta Insertado Exitosamente!`
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = `Error!, ${err.sqlMessage}`
                res.send(response)
            }
        })
})

app.post('/editarTipoCuenta', (req, res, next) => {
    con.query(`UPDATE tipo_cuentas SET des_tip = '${req.body.des_tip}',est_tip = ${req.body.est_tip} WHERE id_tip = '${req.body.id_tip}'`,
        (err, result) => {
            if (result) {
                response.estado = 200
                response.mensaje = `Tipo Cuenta Editado Exitosamente!`
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = `Error!, ${err.sqlMessage}`
                res.send(response)
            }
        })
})

// CUENTAS
app.get('/getCuentas', (req, res) => {
    con.query(`select cuentas.num_cue, cuentas.ced_usu, cuentas.id_tip, cuentas.est_cue, usuarios.nom_usu, 
    tipo_cuentas.des_tip from cuentas inner join usuarios on cuentas.ced_usu = usuarios.ced_usu INNER JOIN tipo_cuentas 
    on cuentas.id_tip = tipo_cuentas.id_tip`, (err, result) => {
        res.send(result)
    })
})

app.post('/registrarCuenta', (req, res, next) => {
    con.query(`INSERT INTO cuentas VALUES('${req.body.num_cue}','${req.body.pas_cue}','${req.body.ced_usu}',${req.body.id_tip},${req.body.est_cue})`,
        (err, result) => {
            if (result) {
                response.estado = 200
                response.mensaje = `Cuenta Insertada Exitosamente!`
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = `Error!, ${err.sqlMessage}`
                res.send(response)
            }
        })
})

app.post('/editarCuenta', (req, res, next) => {
    con.query(`UPDATE cuentas SET ced_usu = ${req.body.ced_usu}, id_tip = ${req.body.id_tip}, est_cue = ${req.body.est_cue} WHERE num_cue = '${req.body.num_cue}'`,
        (err, result) => {
            if (result) {
                response.estado = 200
                response.mensaje = `Cuenta Editada Exitosamente!`
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = `Error!, ${err.sqlMessage}`
                res.send(response)
            }
        })
})

app.get('/getCuentasPorUsuario/:ced_usu', (req, res) => {
    con.query(`SELECT cuentas.num_cue, cuentas.ced_usu, cuentas.id_tip, cuentas.est_cue, usuarios.nom_usu, 
    tipo_cuentas.des_tip from cuentas inner join usuarios on cuentas.ced_usu = usuarios.ced_usu INNER JOIN tipo_cuentas 
    on cuentas.id_tip = tipo_cuentas.id_tip WHERE cuentas.ced_usu = '${req.params.ced_usu}'`, (err, result) => {
        res.send(result)
    })
})

// TRANSACCIONES
app.get('/getTransacciones', (req, res) => {
    con.query(`SELECT transacciones.*, usuarios.nom_usu FROM transacciones INNER JOIN cuentas ON cuentas.num_cue = transacciones.num_cue 
    INNER JOIN usuarios ON cuentas.ced_usu = usuarios.ced_usu`, (err, result) => {
        res.send(result)
    })
})

app.get('/getTransaccionesFecha/:fec_ini/:fec_fin/:num', (req, res) => {
    con.query(`select COUNT(transacciones.id_tra) as cantidad, SUM(transacciones.valor) as total, transacciones.fec_tra from
     transacciones INNER JOIN cuentas on transacciones.num_cue = cuentas.num_cue where transacciones.num_cue = '${req.params.num}' 
     and transacciones.fec_tra >= '${req.params.fec_ini}' and transacciones.fec_tra <= '${req.params.fec_fin}' GROUP BY fec_tra;`, (err, result) => {
        res.send(result)
    })
})

app.post('/registrarTransaccion', (req, res, next) => {    
    con.query(`INSERT INTO transacciones VALUES(DEFAULT,'${req.body.num_cue}','2019-11-19','${req.body.valor}',1)`,
        (err, result) => {
            if (result) {
                response.estado = 200
                response.mensaje = `Transaccion Insertada Exitosamente!`
                res.send(response)
            }
            else {
                response.estado = 500
                response.mensaje = `Error!, ${err.sqlMessage}`
                res.send(response)
            }
        })
})

// GLOBAL
app.post('/borrar', (req, res, next) => {
    con.query(`DELETE from ${req.body.tabla} WHERE ${req.body.campo} = ${req.body.dato}`, (err, result) => {
        if (result) {
            response.estado = 200
            response.mensaje = `Registro Eliminado Exitosamente!`
            res.send(response)
        }
        else {
            response.estado = 500
            response.mensaje = `Error!, ${err.sqlMessage}`
            res.send(response)
        }
    })
})

app.listen(port, ipAddress)
console.log('Servidor : ' + ipAddress + ':' + port)