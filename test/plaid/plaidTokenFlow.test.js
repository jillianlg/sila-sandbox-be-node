// third party packages
const axios = require('axios');
const { expect } = require('chai');

const { PLAID_CLIENT_ID, PLAID_SECRET } = require('../../.env');

// Use this series of three tests to test the plaid processor token flow

describe('tests Plaid token flow', () => {

    // you will first need to retrieve a public token using Sila's public key
    it.skip('retrieves a public token', async () => {
        const plaidRequestBody = {
            public_key: 'fa9dd19eb40982275785b09760ab79',
            initial_products: ['transactions'],
            institution_id: 'ins_109508',
            credentials: {
                username: 'user_good',
                password: 'pass_good',
            }
        }

        const response = await axios({
            method: 'post',
            url: 'https://sandbox.plaid.com/link/item/create',
            data: plaidRequestBody,
            validateStatus: () => { return true }
        });

        // record this public token for the next test
        console.log('public_token: ', response.data.public_token);
        
        // record the desired account id for the final test
        console.log('account: ', response.data.accounts);

        expect(response.data.public_token).to.exist;

    });

    it.skip('retrieves an access token', async () => {

        // use the public token from the previous test in this test
        // use your own plaid clientID and secret
        const plaidRequestBody = {
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            public_token: 'PUBLIC_TOKEN',
        }

        const response = await axios({
            method: 'post',
            url: 'https://sandbox.plaid.com/item/public_token/exchange',
            data: plaidRequestBody,
            validateStatus: () => { return true }
        });

        // record the access_token for the next test
        console.log('access_token: ', response.data.access_token);

        expect(response.data.access_token).to.exist;
    });

    it.skip('retrieves a processor token', async () => {

        // use the access_token from the previous test
        // use the account_id from the first test
        // use your own plaid clientID and secret
        const plaidRequestBody = {
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            processor: 'sila_money',
            access_token: 'ACCESS_TOKEN',
            account_id: 'ACCOUNT_ID',
        }

        const response = await axios({
            method: 'post',
            url: 'https://sandbox.plaid.com/processor/token/create',
            data: plaidRequestBody,
            validateStatus: () => { return true }
        });

        // record the processor token for use with Sila's /link_account endpoint
        console.log('process_token: ', response.data.processor_token);

        expect(response.data.processor_token).to.exist;
    });
});