// * create a .env.js file in the home directory (sibling to package.json) and include these variables within
// * app information can be populated immediately using the Sila console
// * all other variables will need to be manually populated as tests are run

// app information
const APP_HANDLE = 'YOUR_APP_HANDLE_HERE';
const APP_PRIVATE_KEY = 'YOUR_APP_PRIVATE_KEY_HERE'; // ** DO NOT COMMIT NOR SHARE YOUR APP PRIVATE KEY **
const ENCRYPTION_KEY = 'YOUR_ENCRYPTION_KEY_HERE'; // must be 32 characters
const ENCRYPTION_IV_STRING = 'YOUR_ENCRYPTION_IV_STRING_HERE'; // must be 16 characters


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


// certifiation tokens
const CERTIFICATION_TOKEN_INDIVIDUAL_ONE = 'CERTIFICATION_TOKEN';


// blockchain address
const BLOCKCHAIN_ADDRESS = 'BLOCKCHAIN_ADDRESS';

module.exports = {
    APP_HANDLE,
    APP_PRIVATE_KEY,
    ENCRYPTION_KEY,
    ENCRYPTION_IV_STRING,
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
}