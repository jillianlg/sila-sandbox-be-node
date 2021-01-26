// create a .env.js file in the home directory (sibling to index.js)
// and include these variables within
// ** DO NOT COMMIT NOR SHARE YOUR APP PRIVATE KEY **

const APP_HANDLE = 'YOUR_APP_HANDLE_HERE';
const APP_PRIVATE_KEY = 'YOUR_APP_PRIVATE_KEY_HERE';
const ENCRYPTION_KEY = 'YOUR_ENCRYPTION_KEY_HERE'; // must be 32 characters
const ENCRYPTION_IV_STRING = 'YOUR_ENCRYPTION_IV_STRING_HERE'; // must be 16 characters

module.exports = {
    APP_HANDLE,
    APP_PRIVATE_KEY,
    ENCRYPTION_KEY,
    ENCRYPTION_IV_STRING
}