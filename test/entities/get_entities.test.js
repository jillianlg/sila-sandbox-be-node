// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');

describe('tests Sila API integration', () => {
    it('/get_entities', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_ENTITIES,
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
});