//STEP 1. get the list of all dataTokens that contains contract address,symbol,name etc from the graphQL endpoint mentioned above
//STEP 2. Map over all of the address and get the balances of each dataToken by using etherscan API getTokenBalance()
//STEP 3. Save the dataTokens for which the balance is > 0

const fetch = require('node-fetch');
const axios = require('axios');
const fs = require('fs');

const etherscanApiKey = "NEAZEEKKCS9ZFCUIHNVN8TG4YIUDRCTD8D";
const walletAddress = "0x8f06a2bcC62B192ccFE1430B2C38cE78ddFd1480";
const BASE_URL = 'https://subgraph.rinkeby.oceanprotocol.com';
const SUBGRAPHS_QUERY_ROUTE = '/subgraphs/name/oceanprotocol/ocean-subgraph';
var dataTokens = [];
var dataTokenBank = [];

const url = BASE_URL + SUBGRAPHS_QUERY_ROUTE;


async function getTokenBalance(tokenAddress, walletAddress, etherscanApiKey) {
    // make an API call to the ABIs endpoint 
    const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddress}&address=${walletAddress}&tag=latest&apikey=${etherscanApiKey}`)
    const data = await response.json();
    // console.log(data.result/10**18,"");
    return data.result / 10 ** 18;
}

// // Support for dataToken as NFT, This function will get the balance of a dataToken as an NFT by using the dataToken address and returns the dataToken using EtherScan API
// async function getERC721TokenBalance(tokenAddress, walletAddress, etherscanApiKey) {
//     // make an API call to the ABIs endpoint 
//     const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttxe&contractaddress=${tokenAddress}&address=${walletAddress}&tag=latest&apikey=${etherscanApiKey}`)
//     const data = await response.json();
//     // console.log(data.result/10**18,"");
//     return data.result;
// }

//This function will get all dataTokens by incrementing offset by $limit(max is 999) and returns an exhaustive list of all dataTokens minted on rinkeby
async function getAllPoolDatatokenAddresses(url) {
    const limit = 999;
    let responseSize = 999;
    let i = 0;
    for (let offset = 0; responseSize === 999; offset += limit) {
        const requestBody = {
            query: `{ datatokens(first : ${limit},skip:${offset},orderDirection: desc) { address symbol name cap supply publisher holderCount } }`
        };
        const response = await axios.post(url, requestBody).catch((error) => {
            const {
                status,
                statusText,
                data
            } = error.response;
            // console.error('Error getting data from subgraph: ', status, statusText, data);
            throw new Error(status, statusText, data);
        });
        responseSize = response["data"]["data"]["datatokens"].length;
        dataTokenBank = [...dataTokenBank, ...response.data.data.datatokens];
        i++;
        console.log(i, ":", responseSize);
    }
    // console.log(response["data"]["data"]["datatokens"]);
    return dataTokenBank;
}

//STEP 1 : There are exactly 162,433 dataTokens on Ocean Marketplace of Rinkebt Testnet at the time of executing this script i.e(31st Jan 2020)
// getAllPoolDatatokenAddresses(url).then(result => {
//     dataTokens = result;
//     // fs.writeFileSync('dataTokenList.txt', JSON.stringify(dataTokens));
// });

//Data Token info of Highest Liquidity on the Ocean Marketplace(Rinkeby Testnet)
const testBalances = [{
        address: "0x7fbedff92f39ae900393b17370e192d508458fdb",
        symbol: "MINMAC-6"
    },
    {
        address: "0xD2AebA41993A308cb1D4d1521bFdE22D1792Ef69",
        symbol: "PETCRA-71"
    },
    {
        address: "0xCC29bF27ABCAb531Ef634D61E887aB83e5B90c24",
        symbol: "VERIFY"
    },
    {
        address: "0xD0d7b9eb435CE2350BFAFa63d3D99860409B699d",
        symbol: "DAZEEL-64"
    },
    {
        address: "0x1d0C4F1DC8058a5395b097DE76D3cD8804ef6bb4",
        symbol: "SAGKRI-94"
    },
    {
        address: "0x5B7bb7AF87e952D6D13963968078dE7B1bdA1A4e",
        symbol: "BELPEN-95"
    },
    {
        address: "0x5A67ADd7741326368dDE150BC02821E178F6830B",
        symbol: "INCCOR-95"
    },
    {
        address: "0x5CD4756B5980A1877f0191c2f4A4ef6FfB686596",
        symbol: "ENTNAR-79"
    },
    {
        address: "0xB82342b6b6272988dE9129Abc2Bf76C9B351e169",
        symbol: "GUISEA-90"
    }
];

// fs.readFile('dataTokenList.txt', function(err, data) {
//     if(err) throw err;
//     dataTokens = JSON.parse(data);
//     console.log(dataTokens.length);
//     // console.log(dataTokens[162432]);
// }
// );

//STEP 2 : Map over all of the address and get the balances of each dataToken by using etherscan API getTokenBalance()
//TODO : replace testBalances with dataTokens after figuring out on how to get userDataTokens efficiently
const walletBalances = testBalances.map(async (dataToken) => {
    //STEP 2
    await getTokenBalance(dataToken.address, walletAddress, etherscanApiKey).then((amount) => {
        //STEP 3
        if (amount > 0) {
            console.log(dataToken.symbol, ":", amount);
        }
    });
});