// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');

const SILA_DELETE_TYPES = {
    EMAIL: 'email',
    PHONE: 'phone',
    IDENTITY: 'identity',
    ADDRESS: 'address',
}
const {
    USER_HANDLE_INDIVIDUAL_ONE,
    UUID_INDIVIDUAL_EMAIL,
    UUID_INDIVIDUAL_ADDRESS,
    UUID_INDIVIDUAL_PHONE,
    UUID_INDIVIDUAL_IDENTITY,
} = require('../../.env');

describe('tests Sila API integration', () => {
    it('/delete/email', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.DELETE,
            data: {
                type: SILA_DELETE_TYPES.EMAIL,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_EMAIL,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it('/delete/phone', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.DELETE,
            data: {
                type: SILA_DELETE_TYPES.PHONE,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_PHONE,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it('/delete/identity', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.DELETE,
            data: {
                type: SILA_DELETE_TYPES.IDENTITY,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_IDENTITY,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });

    it('/delete/address', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.DELETE,
            data: {
                type: SILA_DELETE_TYPES.ADDRESS,
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                uuid: UUID_INDIVIDUAL_ADDRESS,
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});