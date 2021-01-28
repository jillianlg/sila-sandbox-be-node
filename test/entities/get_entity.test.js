// third party packages
const { expect } = require('chai');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

// local packages
const { silaAPI } = require('../../index');

// consts
const { SILA_PATHS } = require('../../src/routes/index');

describe('tests Sila API integration', () => {
    it('should /get_entity', async () => {
        // imitates retrieving the user handle from your database
        const userInfo = await readFile('./userInfo.json', 'utf8')
        const parsedData = JSON.parse(userInfo);
        const { USER_HANDLE } = parsedData;

        // prepare the request body
        const body = {
            apiPath: SILA_PATHS.GET_ENTITY,
            data: {
                userHandle: USER_HANDLE
            }
        }

        const jsonBody = JSON.stringify(body);
        const response = await silaAPI({ body: jsonBody });

        const parsedResponse = JSON.parse(response.body);

        expect(parsedResponse.success).to.equal(true);
    });
});