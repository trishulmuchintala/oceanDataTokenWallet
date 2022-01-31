
# Etherscan API Challenge

As part of this Challenge , i implemented a feature that allows users on Ocean Marketplace to see the DataTokens they own and other metadata(if required). This feature can be integrated into the marketplace as Wallet/User/Profile Information section.



## Features

- Users can see how many dataTokens(ERC-20) they own and their balances

- Support has been addded for dataTokens as ERC-721 as well for when the marketplace is updated


## Private Variables

To run this project, you will need to assign the following variables in main.js to your key and walletAddress

`etherscanApiKey`

`walletAddress`


## Run Locally

Clone the project

```bash
git clone https://github.com/trishulmuchintala/oceanDataTokenWallet.git
```

Go to the project directory

```bash
cd oceanDataTokenWallet
```

Run the file(make sure you assign etherScanApi key and your walletAddress before running the below command)

```bash
node main.js
```




## Code Walk-Through

    1. Retrieve all dataTokens on rinkeby testnet using the ocean-subgraph graphql endpoint(getAllPoolDatatokenAddresses())
    {
        datatokens() {
            address
            symbol
            name
            cap
            supply
            publisher
            holderCount
         }
    }

    2. Now for every dataToken , send a API request to etherScanAPI getTokenBalance() which takes dataTokenAddress , walletAddress and etherScanApiKey.

    3. Output of Step 2 is the balance of a particular dataToken in the provided wallet, but we are only interested in balances > 0. Final list of dataToken balances can be seen in the terminal.

    4. Surprisingly, there were 162,433 dataTokens as of 31st Jan 2022. So to execute Step 2 i'd have to send 162,433 requests to get the final output.

    5. So, in the code where i execute Step 2 i replaced global list of rinkeby $dataTokens with $testBalances(includes the dataToken information of highest liquidity
       datasets in Ocean Marketplace on Rinkeby Testnet)

    6. For demo purpose, i bought MINMAC-6 tokens to access Data Whale Test dataset (https://market.oceanprotocol.com/asset/did:op:7FBEDfF92F39ae900393B17370E192D508458FDB) and it is one of the highest liquidity datasets right now so it'll be listed in testBalances.When i execute the script i get the following output
       MINMAC : 1

    7. So i'd suggest you to buy a token from highest liquidity and assign your Rinkeby Testnet Address to walletAddress in the file.

    8. I saved all 162,433 dataTokens to a file and will soon compress it and upload here.
## Roadmap

- Alternate way to detect the ocean dataTokens in the user wallet using services like moralis.io integrations.

- Complete support for dataTokens as NFT's(ERC-721).

- Integrate the service into Ocean Marketplaces so that users have better sight of token ownership.


## Acknowledgements

 - [Ocean-Subgraph github repo](https://github.com/oceanprotocol/ocean-subgraph/)
 - [Ocean-Subgraph Docs](https://docs.oceanprotocol.com/references/read-the-docs/ocean-subgraph/)
 - [Rinkeby-Etherscan API endpoints](https://docs.etherscan.io/v/rinkeby-etherscan/api-endpoints/accounts)


## License

MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
