# Alchemy Basic NFT Marketplace end to end

[Alchemy Road to Web 3 Week 7](https://docs.alchemy.com/docs/how-to-build-an-nft-marketplace-from-scratch)

### How to install and use

To set up the repository and run the marketplace locally, run the below
```bash

git clone https://github.com/AnastasiaMenshikova/NFT-Marketplace

cd NFT-Marketplace

yarn install

yarn start

```
Create the `.env` file and add your own api keys and private key by using `.example.env`. 

To deploy smart contract to Goerli testnet use:

 
 ```bash
 
 yarn deploy --network goerli

 ```
 
For verifying contracts on Etherscan run:
 
 ```bash
 
 yarn verify

 ```
For testing added static analyzer [Slither](https://github.com/crytic/slither) for Solidity code. Run following command:

```bash

yarn slither

```
If you want to write unit tests for your solidity code and check coverage of tests, run command:

```bash

yarn coverage

```