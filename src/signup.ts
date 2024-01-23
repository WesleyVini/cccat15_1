import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";

export async function signup(input: any): Promise<any> {


	const connection = pgp()("postgres://postgres:0610@localhost:5432/cc&ca");
	try {
		const [acc] = await connection.query("select * from cccat15.account where email = $1", [input.email]);
		if (acc) return -4;
		if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) return -3;
		if (!input.email.match(/^(.+)@(.+)$/)) return -2;
		if (!validateCpf(input.cpf)) return -1;
		const id = crypto.randomUUID();
		if (input.isDriver) {
			if (!input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
				return -5
			} else {
				await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
				const obj = {
					accountId: id
				};
				return obj;
			}
		} else {
			await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
			const obj = {
				accountId: id
			};
			return obj;
		}
	} finally {
		await connection.$pool.end();
	}
}