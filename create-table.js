import {sql} from './db.js'

// sql`DROP TABLE IF EXISTS videos;`.then(()=>{
//     console.log('Tabela apagada!')
// })

sql`
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    descricao TEXT,
    duracao INTEGER
);
`.then(()=>{
    console.log('Tabela criada!')
})
