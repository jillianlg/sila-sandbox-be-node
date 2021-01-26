// third party packages
const { expect } = require('chai');

// local packages
const { silaAPI } = require('../index');

// consts
const { SILA_PATHS } = require('../src/routes/index');
const {
    FIRST_NAME,
    LAST_NAME
} = require('../consts');

describe('tests Sila API integration', () => {
    it('should /register', async () => {
    const body = {
            apiPath: SILA_PATHS.REGISTER,
            data: {
                firstName: FIRST_NAME,
                lastName: LAST_NAME
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });
        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
});