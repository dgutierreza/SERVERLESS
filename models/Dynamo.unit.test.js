const Dynamo = require('./Dynamo');

test('Dynamo es un Objeto', () => {
    expect(typeof Dynamo).toBe('object');
});

test('dynamo tiene una funcion get y write', () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.write).toBe('function');
});

const TableName = 'peoples';
const data = { Id: '12345', nombre: 'DIEGO UNIT TEST- DIEGO UNIT TEST', };

test('Dynamo insertara', async () => {
    expect.assertions(1);
    try {
        const res = await Dynamo.write(data, TableName);
        console.log('la res',res);
        expect(res).toBe(data);
    } catch (error) {
        console.log('Error al ejecutar insercion', error);
    }
});

test('Dynamo traera data', async () => {
    expect.assertions(1);
    try {
        const res = await Dynamo.get(data.Id, validTableName);
        expect(res).toEqual(data);
    } catch (error) {
        console.log('Error al traer la data', error);
    }
});