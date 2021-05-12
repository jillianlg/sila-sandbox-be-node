// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');
const { USER_HANDLE_INDIVIDUAL_ONE, DOCUMENT_ID } = require('../../.env');

describe.skip('tests Sila API integration', () => {
    it('/get_document', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_DOCUMENT,
            data: {
                userHandle: USER_HANDLE_INDIVIDUAL_ONE,
                documentID: DOCUMENT_ID
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        console.log('parsedResponse: ', parsedResponse);

        expect(parsedResponse.success).to.equal(true);
    });
});