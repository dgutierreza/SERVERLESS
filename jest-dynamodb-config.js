module.exports = {
    tables: [
        {
            TableName: 'peoples',
            KeySchema: [
                {
                    AttributeName: 'Id',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'Id',
                    AttributeType: 'S',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    ],
};