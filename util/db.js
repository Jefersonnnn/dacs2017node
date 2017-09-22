var mysql = require('mysql');
function dbcomm(){
    var connection = mysql.createConnection({
        host     : 'us-cdbr-sl-dfw-01.cleardb.net',
        user     : 'bb7bc56af400d0',
        password : '1d8c08c7',
        database : 'ibmx_05e550d1e8bc791'
    });

    connection.connect(function(err){
        if(err) {
            console.log("Error connecting database ... nn");
        }
    });
    return connection;
}

module.exports = dbcomm;
