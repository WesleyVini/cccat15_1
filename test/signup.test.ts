import { signup } from '../src/signup';
// -1 invalid CPF OK
// -2 Invalid Email OK
// -3 Invalid Name OK
// -4 Email Already exists 
// -5 Invalid Car plate

test("Should create a passenger", async () => {
    const input = {
        name: 'Wesley Passenger',
        email: 'wesPass@gmail.com',
        cpf: '700.771.180-49',
        password: '123456',
        isPassenger: true,
    }
    const responseSingup = await signup(input);
    expect(responseSingup.accountID).toBeDefined()
});

test("Should create a driver", async () => {
    const input = {
        name: 'Wesley Driver',
        email: 'wesDriver@gmail.com',
        cpf: '357.284.550-50',
        carPlate: 'ABC1234',
        password: '654321',
        isDriver: true,
    }
    const responseSingup = await signup(input);
    expect(responseSingup.accountID).toBeDefined()
});

test("should not create a passanger or driver with invalid CPF", async () => {
    const input = {
        name: 'wesley Pass2',
        email: 'wesPass2@gmail.com',
        cpf: '12345678910',
        password: '123456',
        isPassenger: true,
    }
    await expect(() => {
        return signup(input)
    }).rejects.toThrowError('Invalid CPF');
});

test("should not create a passanger with invalid email", async () => {
    const input = {
        name: 'wesley Pass3',
        email: 'wesPass3gmail.com',
        cpf: '677.519.560-54',
        password: '123456',
        isPassenger: true,
    }
    await expect(() => {
        return signup(input)
    }).rejects.toThrowError('Invalid Email');
});


test("should not create a passanger with invalid name", async () => {
    const input = {
        name: 'wesleyPass4',
        email: 'wesPass4@gmail.com',
        cpf: '007.925.460-83',
        password: '123456',
        isPassenger: true,
    }
    await expect(() => {
        return signup(input)
    }).rejects.toThrowError('Invalid Name');
});

test("should not create a passanger or drive if email already exists", async () => {
    const input = {
        name: 'Wesley PassangerRepeat',
        email: 'wesPassRepeat@gmail.com',
        cpf: '966.392.160-94',
        password: '123456',
        isPassenger: true,
    }
    await signup(input);
    await expect(() => {
        return signup(input)
    }).rejects.toThrowError('Account already exists');
});

test("should not create a drive if invalid car plate", async () => {
    const input = {
        name: 'Wesley Driver2',
        email: 'wesDriver2@gmail.com',
        cpf: '966.392.160-94',
        password: '123456',
        carPlate: 'AB12345',
        isDriver: true,
    }

    await expect(() => {
        return signup(input)
    }).rejects.toThrowError('Invalid Car Plate');
});