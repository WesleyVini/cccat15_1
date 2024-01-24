import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import { connection } from "./dbConnection";

export interface output {
	accountID: string;
}

function ValidateName(name: any) {
	const regex = /[a-zA-Z] [a-zA-Z]+/;
	return regex.test(name);
};

function ValidateEmail(email: any) {
	const regex = /^(.+)@(.+)$/;
	return regex.test(email);
};

function ValidateCarPlate(carPlate: any) {
	const regex = /[A-Z]{3}[0-9]{4}/;
	return regex.test(carPlate);
};

function validateData(input: any) {
	if (!ValidateName(input.name)) throw new Error('Invalid Name');
	if (!ValidateEmail(input.email)) throw new Error('Invalid Email');
	if (!validateCpf(input.cpf)) throw new Error('Invalid CPF');
	if ((input.isDriver) && (!ValidateCarPlate(input.carPlate))) throw new Error('Invalid Car Plate');
}

export async function signup(input: any): Promise<any> {

	const [account] = await connection.query("select * from cccat15.account where email = $1", [input.email]);
	if (account) throw new Error('Account already exists');
	validateData(input);
	const accountID = crypto.randomUUID();
	await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [accountID, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
	return { accountID };
};

