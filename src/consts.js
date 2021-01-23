// sila
const SILA_BASE_SANDBOX_URL = 'https://sandbox.silamoney.com/0.2';
const SILA_URLS = {
    REGISTER_USER: `${SILA_BASE_SANDBOX_URL}/register`,
    REQUEST_KYC: `${SILA_BASE_SANDBOX_URL}/request_kyc`,
    CHECK_KYC: `${SILA_BASE_SANDBOX_URL}/check_kyc`,
    GET_ENTITY: `${SILA_BASE_SANDBOX_URL}/get_entity`,
    UPDATE: `${SILA_BASE_SANDBOX_URL}/update/`,
    ADD: `${SILA_BASE_SANDBOX_URL}/add/`
}

module.exports = {
    SILA_URLS
}