const Web3HttpProvider = require('web3-providers-http');
const Web3 = require('web3')

const options = {
    keepAlive: true,
    withCredentials: false,
    timeout: 20000, // ms
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: 'http://127.0.0.1:8545'
        },
    ]
};

class Provider {
    constructor() {
        this.web3 = new Web3(
            new Web3.providers.HttpProvider('http://127.0.0.1:8545', options)
        )
    }
}
module.exports = Provider