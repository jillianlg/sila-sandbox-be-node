// third party packages
const axios = require('axios');
const { expect } = require('chai');

const { PLAID_CLIENT_ID, PLAID_SECRET } = require('../../.env');

describe('LINK: tests Plaid link token flow', () => {
    // retrieves a public token using Sila's link token
    it.skip('retrieves a public token', async () => {
        const plaidRequestBody = {
            credentials: {
                username: 'user_good',
                password: 'pass_good',
            },
            initial_products: ['auth', 'transactions', 'identity'],
            institution_id: 'ins_3',
            // retrieve from our /plaid_link_token endpoint
            link_token: 'LINK_TOKEN'
        }

        const response = await axios({
            method: 'post',
            url: 'https://sandbox.plaid.com/link/item/create',
            data: plaidRequestBody,
            validateStatus: () => { return true }
        });

        // pass this public_token into /link_account
        console.log('public_token: ', response.data.public_token);
        
        // OPTIONAL pass an accountID into /link_account
        console.log('account: ', response.data.accounts);

        expect(response.data.public_token).to.exist;

    });
});

describe('PROCESSOR: tests Plaid processor token flow', () => {    
    // retrieves a link token from our API
    // this link token is used to launch the Plaid front end modal
    it.skip('retrieves a link token', async () => {
        const plaidRequestBody = {
            // use your own plaid clientID and secret
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            user: {
                client_user_id: PLAID_CLIENT_ID
            },
            client_name: 'CLIENT_NAME',
            products: ['auth', 'transactions'],
            language: 'en',
            country_codes: ['US'],
        }

        const response = await axios({
            method: 'post',
            url: 'https://sandbox.plaid.com/link/token/create',
            data: plaidRequestBody,
            validateStatus: () => { return true }
        });

        // record link_token for the next test
        console.log('link_token: ', response.data.link_token);

        expect(response.data.link_token).to.exist;
    });

    // retrieves a public_token using link_token
    // this step imitates the end user entering their bank account information
    // the link account is used to launch the Plaid front end modal
    it.skip('retrieves a public token', async () => {
        const plaidRequestBody = {
            credentials: {
                username: 'user_good',
                password: 'pass_good',
            },
            initial_products: ['auth', 'transactions', 'identity'],
            institution_id: 'ins_3',
            // retrieve from your own /link/token/create request
            link_token: 'LINK_TOKEN'
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

    // this takes the public token retrieved from the front end
    // it uses the public token on the back end and exchanges it for an access token from Plaid
    it.skip('retrieves an access token', async () => {

        // use your own plaid clientID and secret
        const plaidRequestBody = {
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            // use the public token from the previous test
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

    // uses the access token provided from Plaid
    // the access token proves to Plaid that we are authorized to link an account to our system
    // this processor token can then be used with our /link_account endpoint to finalize the link
    it.skip('retrieves a processor token', async () => {

        const plaidRequestBody = {
            // use your own plaid clientID and secret
            client_id: PLAID_CLIENT_ID,
            secret: PLAID_SECRET,
            processor: 'sila_money',
            // use the access_token from the previous test
            access_token: 'ACCESS_TOKEN',
            // use the account_id from the first test
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

describe('LEGACY: tests Plaid legacy token flow', () => {
    // retrieves a public token from Plaid using Sila's public key
    it.skip('retrieves a public token from Plaid', async () => {
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

        // record the public token for use in the /link_account endpoint
        console.log('public_token: ', response.data.public_token);
        
        // OPTIONAL: record an account ID if you wish to submit one to /link_account
        console.log('account: ', response.data.accounts);

        expect(response.data.public_token).to.exist;

    });
});