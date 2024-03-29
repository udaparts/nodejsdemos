//loading SocketPro adapter (nja.js + njadapter.node) for nodejs
var SPA = require('nja.js');
var cs = SPA.CS; //CS == Client side

var master = SPA.GetSpPool('masterdb');
var cache = master.Cache;

console.log('');
console.log('Cached DB Tables');
console.log(cache.DbTable);

console.log('');
console.log('Keys');
console.log(cache.FindKeys('sakila', 'actor'));

console.log('');
console.log('Table Meta');
console.log(cache.GetMeta('sakila', 'actor'));

console.log('');
console.log('Rows: ' + cache.GetRowCount('sakila', 'actor'));

console.log('');
console.log('Colums: ' + cache.GetFields('sakila', 'actor'));

console.log('');
console.log('sakila.actor last_name Ordinal: ' + cache.FindOrdinal('sakila', 'actor', 'last_name'));

console.log('');
console.log('SELECT * FROM sakila.actor WHERE actor_id BETWEEN 5 and 35');
var tbl = cache.Between('sakila', 'actor', 0, 5, 35);
console.log(tbl.Data);

console.log('');
console.log('SELECT * FROM sakila.actor WHERE actor_id BETWEEN 5 and 35 ORDER BY actor_id DESC');
var ok = tbl.Sort(0, true);
console.log(tbl.Data);

console.log('');
console.log('SELECT * FROM sakila.actor WHERE actor_id IN(9,10) ORDER BY actor_id DESC');
var sub = tbl.In(0, [9, 10]);
console.log(sub.Data);

console.log('');
console.log('SELECT * FROM sakila.actor WHERE actor_id NOT IN(24,9,10) ORDER BY actor_id DESC');
sub = tbl.NotIn(0, [24, 9, 10]);
console.log(sub.Data);

var db = SPA.GetSpHandler('slavedb0');
console.log('');
console.log('SELECT curtime();SELECT * FROM mysqldb.company');
if (!db.Execute('SELECT curtime();SELECT * FROM mysqldb.company', (res, err, affected, fails, oks, id) => {
        console.log({
            ec: res,
            em: err,
            aff: affected,
            oks: oks,
            fails: fails,
            lastId: id
        });
    }, data => {
        console.log(data);
    }, meta => {
        console.log(meta);
    })) {
    console.log(db.Socket.Error);
    return;
}
