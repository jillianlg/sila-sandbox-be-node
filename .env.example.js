// * create a .env.js file in the home directory (sibling to package.json) and include these variables within
// * app information can be populated immediately using the Sila console
// * all other variables will need to be manually populated as tests are run

// app information
const APP_HANDLE = 'YOUR_APP_HANDLE_HERE';
const APP_PRIVATE_KEY = 'YOUR_APP_PRIVATE_KEY_HERE'; // ** DO NOT COMMIT NOR SHARE YOUR APP PRIVATE KEY **
const ENCRYPTION_KEY = 'YOUR_ENCRYPTION_KEY_HERE'; // must be 32 characters
const ENCRYPTION_IV_STRING = 'YOUR_ENCRYPTION_IV_STRING_HERE'; // must be 16 characters
const WEB3_URL = 'YOUR_WEB3_URL_HERE'; // url for web3 to use as a host

// * user handles will need to be pulled from test files
// * test files are written into the home directory upon testing the /register endpoint
// * test files end with .info.json
// entity user handles
const USER_HANDLE_INDIVIDUAL_ONE = 'USER_HANDLE';
const USER_HANDLE_INDIVIDUAL_TWO = 'USER_HANDLE';

// business user handles
const USER_HANDLE_BUSINESS_ONE = 'USER_HANDLE';
const USER_HANDLE_BUSINESS_TWO = 'USER_HANDLE';


// * can be retrieved from /get_entity
// * are also returned from a successful /add/[info] call
// individual information uuids
const UUID_INDIVIDUAL_EMAIL = 'UUID';
const UUID_INDIVIDUAL_ADDRESS = 'UUID';
const UUID_INDIVIDUAL_PHONE = 'UUID';
const UUID_INDIVIDUAL_IDENTITY = 'UUID';

// business information uuids
const UUID_BUSINESS_EMAIL = 'UUID';
const UUID_BUSINESS_ADDRESS = 'UUID';
const UUID_BUSINESS_PHONE = 'UUID';
const UUID_BUSINESS_IDENTITY = 'UUID';


// * can be retrieved from /get_entity from the entity to be certified
// certifiation tokens
const CERTIFICATION_TOKEN_INDIVIDUAL_ONE = 'CERTIFICATION_TOKEN';


// * can be retrieved from /get_wallet. is also returned from a successful /update_wallet or /register_wallet request
// blockchain address
const BLOCKCHAIN_ADDRESS = 'BLOCKCHAIN_ADDRESS';


// * can be retrieved using iovation. you must be approved for instant ach in order to receive this software
const DEVICE_BLACK_BOX = 'DEVICE_BLACK_BOX';


// * uuid provided for testing purposes
const BUSINESS_UUID = 'a9f38290-ce34-42db-95ab-630ebba6084a';

module.exports = {
    APP_HANDLE,
    APP_PRIVATE_KEY,
    ENCRYPTION_KEY,
    ENCRYPTION_IV_STRING,
    WEB3_URL,
    USER_HANDLE_INDIVIDUAL_ONE,
    USER_HANDLE_INDIVIDUAL_TWO,
    USER_HANDLE_BUSINESS_ONE,
    USER_HANDLE_BUSINESS_TWO,
    UUID_INDIVIDUAL_EMAIL,
    UUID_INDIVIDUAL_ADDRESS,
    UUID_INDIVIDUAL_PHONE,
    UUID_INDIVIDUAL_IDENTITY,
    UUID_BUSINESS_EMAIL,
    UUID_BUSINESS_ADDRESS,
    UUID_BUSINESS_PHONE,
    UUID_BUSINESS_IDENTITY,
    CERTIFICATION_TOKEN_INDIVIDUAL_ONE,
    BLOCKCHAIN_ADDRESS,
    DEVICE_BLACK_BOX,
    BUSINESS_UUID
}