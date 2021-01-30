// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');

describe.skip('tests Sila API integration', () => {
    it('should /get_entities w/o type', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_ENTITIES,
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });

    it('should /get_entities w/ type "individual"', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_ENTITIES,
            data: {
                entityType: "individual",
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });

    it('should /get_entities w/ type "business"', async () => {
        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_ENTITIES,
            data: {
                entityType: "business",
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
});