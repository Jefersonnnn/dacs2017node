var express = require('express');
var dbutil = require('../util/db.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var conn = dbutil();
    conn.query('select * from user',
        function (err, rows, fields) {
            res.render('users', {data: rows, title: 'Controll Users', countusers: rows.length});
        }
    );
});

router.get('/edit/:id', function (req, res, next) {
    var conn = dbutil();
    conn.query('select * from user where iduser = ' + req.params.id,
        function (err, rows, fields) {
            res.render('edit', {user: rows});
        }
    );
});

router.get('/new/', function (req, res, next) {

    res.render('new');

});

router.get('/delete/:id', function (req, res, next) {
    var conn = dbutil();
    console.log(req.params.id);

    if (req.params.id === '') {
        res.redirect('/users');
    } else {
        conn.query('DELETE FROM user WHERE iduser = ' + req.params.id, function (err, rows, fields) {
            res.redirect('/users');
        });
    }
});

router.post('/save', function (req, res, next) {
    var conn = dbutil();
    if (req.body.iduser === '') {
        conn.query('INSERT INTO user (login,password,email,name,phone) VALUES (?,?,?,?,?)',
            [req.body.login, req.body.password, req.body.email, req.body.name, req.body.phone], function (err, rows, fields) {
                console.log(err);
                res.redirect('/users');

            });
    } else {
        conn.query('UPDATE user SET login = ?, password = ?, email = ?, name = ?, phone = ? WHERE idUser = ?',
            [req.body.login, req.body.password, req.body.email, req.body.name, req.body.phone, req.body.iduser], function (err, rows, fields) {

                res.redirect('/users');

            });
    }
});


module.exports = router;
