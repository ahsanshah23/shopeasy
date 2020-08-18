const mysql = require('mysql2');

const pool = mysql.createPool ({
    host: '208.91.198.96',
    user: 'bbsservc_aa',
    database: 'bbsservc_shopeasy',
    password: 'a0214990621',
});

module.exports = pool.promise();