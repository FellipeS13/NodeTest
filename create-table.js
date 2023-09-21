import { title } from "process";
import { db } from "./sql.js";

// db`DROP TABLE IF EXISTS videos;`.then(()=>{
//     console.log('Tabela apagada');
// })

db`
CREATE TABLE videos (
    id      TEXT PRIMARY KEY,
    title   TEXT,
    decription TEXT,
    duration   INTEGER
);
`.then(() =>{
    console.log('tabela criada');
})