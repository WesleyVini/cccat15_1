import pgp from "pg-promise";

const connection = pgp()("postgres://postgres:0610@localhost:5432/cc&ca");

export { connection };