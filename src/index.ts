import pgp from "pg-promise";

const conectou = pgp()("postgres://postgres:0610@localhost:5432/cc&ca");
var saida;
if (conectou !== null || conectou !== undefined) {
    saida = 's'
} else {
    saida = 'm'
};
//console.log(conectou);

async function pegadadi() {
    return await conectou.query("select 1");
}

var retorno = conectou.query("select 1");

retorno.then(valor => {
    console.log(valor);
})

