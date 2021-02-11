// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const { SILA_UPDATE_TYPES } = require('../../src/routes/entities/update');
const {
    UUID_INDIVIDUAL_EMAIL,
    UUID_INDIVIDUAL_ADDRESS,
    UUID_INDIVIDUAL_PHONE,
    UUID_INDIVIDUAL_IDENTITY,
} = require('../../.env');
const { USER_HANDLE_INDIVIDUAL_ONE } = require('../../.env');

describe.skip('tests Sila API integration', () => {
    it('/update/entity', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_UPDATE_TYPES.ENTITY,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                updateBody: {
                    first_name: 'NewFirst',
                    last_name: 'NewLast',
                    birthdate: '1990-01-01',
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it('/update/email', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_UPDATE_TYPES.EMAIL,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_EMAIL,
                updateBody: {
                    email: 'newemail@newemail.com'
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it('/update/address', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_UPDATE_TYPES.ADDRESS,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_ADDRESS,
                updateBody: {
                    address_alias: 'new address alias',
                    street_address_1: 'New Place',
                    street_address_2: 'PO Box New',
                    city: 'New City',
                    state: 'AL',
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it('/update/phone', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_UPDATE_TYPES.PHONE,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_PHONE,
                updateBody: {
                    phone: '0987654321'
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it('/update/identity', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.UPDATE,
            data: {
                type: SILA_UPDATE_TYPES.IDENTITY,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_IDENTITY,
                updateBody: {
                    identity_alias: 'SSN',
                    identity_value: '333221111'
                }
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

});